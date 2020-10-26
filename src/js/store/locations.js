import api from '../services/apiService';

class Locations {
  constructor(api) {
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.shortCitiesList = null;
    this.airlines = null;
  }

  async init() {
    const response = await Promise.all([
      this.api.getCountries(),
      this.api.getCities(),
      this.api.getAirlines(),
    ]);

    const [countries, cities, airlines] = response;
    this.countries = this.serializeCountries(countries);
    this.cities = this.serializeCities(cities);
    this.shortCitiesList = this.createShortCitiesList(this.cities);
    this.airlines = this.serializeAirlines(airlines);
    
    return response;
  }

  createShortCitiesList(cities) {
    return Object.entries(cities).reduce((acc, [, city]) => {
      acc[city.full_name] = null;
      return acc;
    }, {});
  }

  getCityNameByCode(code) {
    return this.cities[code].name;
  }

  getCitiesByCountryCode(code) {
    return this.cities.filter(city => city.country_code === code);
  }

  getCityCodeByKey(key) {
    const city = Object.values(this.cities).find((item) => item.full_name === key);
    return city.code;
  }

  serializeCountries(countries) {
    // { 'Country code': { ... } }
    return countries.reduce((acc, country) => {
      acc[country.code] = country;
      return acc;
    }, {});
  }

  getCountryNameByCode(code) {
    return this.countries[code].name;
  }

  getAirlineNameByCode(code) {
    return this.airlines[code] ? this.airlines[code].name : '';
  }

  getAirlineLogoByCode(code) {
    return this.airlines[code] ? this.airlines[code].logo : '';
  }

  serializeCities(cities) {
    // { 'City name, country name' : {...}}
    return cities.reduce((acc, city) => {
      const country_name = this.getCountryNameByCode(city.country_code);
      city.name = city.name || city.name_translations.en;
      const city_name = city.name || city.name_translations.en;
      const full_name = `${city_name}, ${country_name}`;
      acc[city.code] = {
        ...city,
        country_name,
        full_name,
      };
      return acc;
    }, {});
  }

  serializeAirlines(airlines) {
    return airlines.reduce((acc, line) => {
      line.logo = `http://pics.avs.io/200/200/${line.code}.png`;
      line.name = line.name || line.name_translations.en;
      acc[line.code] = line;
      return acc;
    }, {});
  }

  async fetchTickets(params) {
    const response = await this.api.getPrices(params);
    this.lastSearch = this.serializeTickets(response.data);
    console.log(this.lastSearch);
  }

  serializeTickets(tickets) {
    return Object.values(tickets).map(ticket => {
      return {
        ...ticket,
        departure_name: this.getCityNameByCode(ticket.origin),
        arrival_name: this.getCityNameByCode(ticket.destination),
        airline_logo: this.getAirlineLogoByCode(ticket.airline),
        airline_name: this.getAirlineNameByCode(ticket.airline),
      };
    });
  }
}

const locations = new Locations(api);

export default locations;