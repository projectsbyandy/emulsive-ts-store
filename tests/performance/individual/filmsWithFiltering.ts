import http from 'k6/http';
import { check } from 'k6';
import { FilmsResponse } from '@/api/types';
import { readConfig } from '../config/configReader.ts';

const config = readConfig();

export const options = {
  vus: 10,
  duration: '15s',
  thresholds: {
    http_req_duration: [`p(95)<${config.films_with_param_sla_ms} || 200`],
    http_req_failed: ["rate<0.01"]
  } 
};

export default function film_get_with_parameters_scenario() {
  // Arrange
  const keyword = 'Kodak';

  // Act
  const res = http.get(`${config.emulsive_api_url}/api/films?keyword=${keyword}`);
  
  // Assert
  check(res, {'films with filtering response is 200': (res) => res.status === 200 })

  if(typeof res.body === 'string') {
    const payload = JSON.parse(res.body) as FilmsResponse;  
    check(payload.data, {
       'more than one film returned': (data) => data.length > 1,
       'all data returned contained the search keyword': (data) => 
          data.every(film => film.attributes.name.includes(keyword) || 
          film.attributes.manufacturer.includes(keyword))
    });
  }
};
