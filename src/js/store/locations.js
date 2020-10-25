import api from '../services/apiService';

class Locations {
  constructor(api) {
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.shortCitiesList = null;
  }

  async init() {
    const response = await Promise.all([
      this.api.getCountries(),
      this.api.getCities(),
    ]);

    const [countries, cities] = response;
    this.countries = this.serializeCountries(countries);
    this.cities = this.serializeCities(cities);
    this.shortCitiesList = this.createShortCitiesList(this.cities);
    
    return response;
  }

  createShortCitiesList(cities) {
    return Object.entries(cities).reduce((acc, [key]) => {
      acc[key] = null;
      return acc;
    }, {});
  }

  getCitiesByCountryCode(code) {
    return this.cities.filter(city => city.country_code === code);
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

  serializeCities(cities) {
    // { 'City name, country name' : {...}}
    return cities.reduce((acc, city) => {
      const country_name = this.getCountryNameByCode(city.country_code);
      const city_name = city.name || city.name_translations.en;
      const key = `${city_name}, ${country_name}`;
      acc[key] = city;
      return acc;
    }, {});
  }
}

const locations = new Locations(api);

export default locations;