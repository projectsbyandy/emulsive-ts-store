import { FilmsResponse, FilterParams } from "@/api/types";
import { Rule } from "../rules/rule";

export const filmFilterRules: Rule[] = [
  {
    condition: (filters: FilterParams) => Boolean(filters.featured),
    perform: (films): FilmsResponse => {
      films.data = films.data.filter(film => film.attributes.featured === true);
      return films;
    }
  },
  {
    condition: (filters: FilterParams) => Boolean(filters.price),
    perform: (films, filters): FilmsResponse => {
      films.data = films.data.filter(film => film.attributes.price <= Number(filters.price));
      return films;
    }
  },
  {
    condition: (filters: FilterParams) =>  Boolean(filters.onsale),
    perform: (films, filters): FilmsResponse => {
      films.data = films.data.filter(film => film.attributes.onSale === filters.onsale);
      return films;
    }
  },
  {
    condition: (filters: FilterParams) =>  Boolean(filters.keyword),
    perform: (films, filters): FilmsResponse => {
      const keyword = filters.keyword?.toLocaleLowerCase();
      films.data = films.data.filter(film => 
        film.attributes.name.toLocaleLowerCase().includes(keyword ?? "") || 
        film.attributes.description.toLocaleLowerCase().includes(keyword ?? "") || 
        film.attributes.manufacturer.toLocaleLowerCase().includes(keyword ?? "")
      );
      return films;
    }
  },
  {
    condition: (filters: FilterParams) => Boolean(filters.format && filters.format !== 'all'),
    perform: (films, filters): FilmsResponse => {
      films.data = films.data.filter(film => film.attributes.format === filters.format);
      return films;
    }
  },
  {
    condition: (filters: FilterParams) => Boolean(filters.manufacturer && filters.manufacturer !== 'all'),
    perform: (films, filters): FilmsResponse => {
      films.data = films.data.filter(film => film.attributes.manufacturer === filters.manufacturer);
      return films;
    }
  },
  {
    condition: (filters: FilterParams) => Boolean(filters.orderby),
    perform: (films, filters): FilmsResponse => {
      switch (filters.orderby) {
        case "a-z":
          films.data = films.data.sort((a, b) => a.attributes.name.localeCompare(b.attributes.name));
          break;
        case "z-a":
          films.data = films.data.sort((a, b) => a.attributes.name.localeCompare(b.attributes.name)).reverse();
          break;
        case "lowest-price-desc":
          films.data = films.data.sort((a, b) => a.attributes.price - b.attributes.price);
          break;
        case "highest-price-desc":
          films.data = films.data.sort((a, b) => a.attributes.price - b.attributes.price).reverse();
          break;
      }
      return films;
    }
  }
];