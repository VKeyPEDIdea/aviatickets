import api from '../services/apiService';

class Locations {
  constructor(api) {
    this.api = api;
    this.countries = null;
    this.cities = null;
  }

  async init() {
    const response = await Promise.all([
      this.api.getCountries(),
      this.api.getCities(),
    ]);

    const [countries, cities] = response;
    this.countries = countries;
    this.cities = cities;
    
    return response;
  }

  getCitiesByCountryCode(code) {
    return this.cities.filter(city => city.country_code === code);
  } 
}

const locations = new Locations(api);

export default locations;