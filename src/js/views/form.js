class FormUI {
  constructor() {
    this._form = document.forms['departureArrivalData'];
    this.departureCityInput = document.getElementById('departure-city');
    this.arrivalCityInput = document.getElementById('arrival-city');
    this.departureTimeInput = document.getElementById('departure-time');
    this.arrivalTimeInput = document.getElementById('arrival-time');
  }

  get form() {
		return this._form;
  }
  
  get departureCityValue() {
		return this.departureCity.value;
	}

	get arrivalCityValue() {
		return this.arrivalCity.value;
	}

	get departureTimeValue() {
		let fullDate = this.departureTime.value;
		let value = fullDate.slice(0, 7);
		return value;
	}

	get arrivalTimeValue() {
		let fullDate = this.arrivalTime.value;
		let value = fullDate.slice(0, 7);
		return value;
	}
}

const formUI = new FormUI();

export default formUI;