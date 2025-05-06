import authentication_scenario from "../individual/authentication.ts";
import film_get_scenario from "../individual/films.ts";
import film_get_with_parameters_scenario from "../individual/filmsWithFiltering.ts";

export const options = {
  scenarios: {
    // Ramping
    get_film: { 
      executor: "ramping-vus", 
      exec: "film_get_scenario", 
      startVUs: 5,
      stages: [
        { duration: "5s", target: 10 },
        { duration: "10s", target: 20 },
        { duration: "5s", target: 5 },
      ]      
    },
    // less load longer
    get_film_with_params: { 
      executor: "constant-vus", 
      exec: "film_get_with_parameters_scenario", 
      vus: 5, 
      duration: "15s" 
    },
    // more load shorter
    authenticate: { 
      executor: "constant-vus", 
      exec: "authentication_scenario", 
      vus: 10, 
      duration: "10s" },
  },
};

export { film_get_with_parameters_scenario, film_get_scenario, authentication_scenario };