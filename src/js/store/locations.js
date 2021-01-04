import { api as API } from '../services/apiService';
import { formatDate } from '../helpers/date';

class Locations {
	constructor(api, helpers) {
		this.api = api;
		this.countries = null;
		this.cities = null;
		this.shortCitiesList = null;
		this.airlines = null;
		this.formatDate = helpers.formatDate;
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
			acc[city.fullName] = null;
			return acc;
		}, {});
	}

	getCityNameByCode(code) {
		return this.cities[code].name;
	}

	getCitiesByCountryCode(code) {
		return this.cities.filter((city) => city.country_code === code);
	}

	getCityCodeByKey(key) {
		const city = Object.values(this.cities).find((item) => item.fullName === key);
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
			const countryName = this.getCountryNameByCode(city.country_code);
			city.name = city.name || city.name_translations.en;
			const cityName = city.name || city.name_translations.en;
			const fullName = `${cityName}, ${countryName}`;
			acc[city.code] = {
				...city,
				countryName,
				fullName,
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
	}

	serializeTickets(tickets) {
		return Object.values(tickets).map((ticket) => ({
			...ticket,
			departure_name: this.getCityNameByCode(ticket.origin),
			arrival_name: this.getCityNameByCode(ticket.destination),
			airline_logo: this.getAirlineLogoByCode(ticket.airline),
			airline_name: this.getAirlineNameByCode(ticket.airline),
			departure_at: this.formatDate(ticket.departure_at, 'dd MMM yyyy hh:mm'),
			arrival_at: this.formatDate(ticket.return_at, 'dd MMM yyyy hh:mm'),
		}));
	}
}

const locations = new Locations(API, { formatDate });

export default locations;