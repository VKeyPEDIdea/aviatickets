import '../sass/main.sass';  
import './plugins';
import myAutocomplete from './plugins/myAutocomplete';
import locations from './store/locations';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currencyUI from './views/currency';

document.addEventListener('DOMContentLoaded', () => {
  initApp();
  const form = formUI.form;

  // Events
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    onFormSubmit();
  });

  // Handlers
  async function initApp() {
    await locations.init();
    myAutocomplete.initAutocomplete(locations.shortCitiesList);
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.departureCity);
    const destination = locations.getCityCodeByKey(formUI.arrivalCity);
    const depart_date = formUI.departureTime;
    const return_date = formUI.arrivalTime;
    const currency = currencyUI.currencyValue;

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    ticketsUI.renderTickets(locations.lastSearch);
  }
}); 