import api from './services/apiService';

api.getCountries().then(res => {
  console.log(res);
});
api.getCities().then(res => {
  console.log(res);
});