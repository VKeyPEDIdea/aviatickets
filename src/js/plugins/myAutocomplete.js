class Autocomplete {
	constructor() {}

	initAutocomplete(cityList) {
		const autocompleteInputList = document.getElementsByClassName('my-autocomplete');

		for (let input of autocompleteInputList) {
			let datalist = input.querySelector('datalist');
			let optionList = this.createOptionList(cityList);

			datalist.appendChild(optionList);
		}
	}

	createOptionList(cityList) {
		let optionListFragment = document.createDocumentFragment();

		for (let city in cityList) {
			let option = this.createOptionElement(city);
			optionListFragment.appendChild(option);
		}

		return optionListFragment;
	}

	createOptionElement(city) {
		let option = document.createElement('option');
		option.value = city;

		return option;
	}
}

const myAutocomplete = new Autocomplete();

export default myAutocomplete;