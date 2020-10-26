class FormUI {
  constructor() {
    this._form = document.forms.departureArrivalData;
    this.departureCityInput = document.getElementById('departure-city');
    this.arrivalCityInput = document.getElementById('arrival-city');
    this.departureTimeInput = document.getElementById('departure-time');
    this.arrivalTimeInput = document.getElementById('arrival-time');
  }

  get form() {
		return this._form;
  }
  
  get departureCity() {
		return this.departureCityInput.value;
	}

	get arrivalCity() {
		return this.arrivalCityInput.value;
	}

	get departureTime() {
    let fullDate = this.departureTimeInput.value;
		let value = fullDate.slice(0, 7);
		return value;
	}

	get arrivalTime() {
		let fullDate = this.arrivalTimeInput.value;
		let value = fullDate.slice(0, 7);
		return value;
	}
}

const formUI = new FormUI();

export default formUI;