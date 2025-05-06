import http from 'k6/http';
import { check } from 'k6';
import { readConfig } from '../config/configReader.ts';

const config = readConfig();

export const options = {
  vus: 10,
  duration: '15s',
  thresholds: {
    http_req_duration: [`p(95)<${config.films_sla_ms || 200}`],
    http_req_failed: ["rate<0.01"]
  } 
};

export default function film_get_scenario() {
  // Arrange / Act
  const res = http.get(`${config.emulsive_api_url}/api/films`);

  // Assert
  check(res, { "films response is 200": (res) => res.status === 200 });
};
