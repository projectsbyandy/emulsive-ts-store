import http from 'k6/http';
import { check } from 'k6';
import { readConfig } from '../config/configReader.ts';

const config = readConfig();

export const options = {
  vus: 10,
  duration: '15s',
  thresholds: {
    http_req_duration: [`p(95)<${config.authentication_sla_ms || 200}`],
    http_req_failed: ["rate<0.01"]
  } 
};

export default function authentication_scenario() {
  // Arrange
  const validUser = JSON.stringify({
    "email": "bobdoe@test.com",
    "password": config.auth_pw
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Act
  const res = http.post(`${config.emulsive_api_url}/api/auth/login`, validUser, params);

  // Assert
  check(res, { "authentication response is 200": (res) => res.status === 200 });
  
  if(typeof res.body === 'string') {
    const body = JSON.parse(res.body);
    check(body, {
      "jwt is generated": (b) => b.jwt?.length > 20,
      "response includes email": (b) => b.user.email === 'bobdoe@test.com'
    });
  }
};