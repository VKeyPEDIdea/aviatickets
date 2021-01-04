class Autocomplete {
	initAutocomplete(cityList) {
		const autocompleteInputList = document.getElementsByClassName('my-autocomplete');

		Object.keys(autocompleteInputList).forEach(input => {
			const datalist = autocompleteInputList[input].querySelector('datalist');
			const optionList = this.createOptionList(cityList);

			datalist.appendChild(optionList);
		});
	}

	createOptionList(cityList) {
		const optionListFragment = document.createDocumentFragment();

		Object.keys(cityList).forEach(city => {
			const option = this.createOptionElement(city);
			optionListFragment.appendChild(option);
		});

		return optionListFragment;
	}

	createOptionElement(city) {
		const option = document.createElement('option');
		option.value = city;

		return option;
	}
}

const myAutocomplete = new Autocomplete();

export default myAutocomplete;