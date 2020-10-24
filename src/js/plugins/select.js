// There is will be scripts for custom select elements
const selectList = document.querySelectorAll('.select-custom');

selectList.forEach(select => {
	
	const selectValue = select.getElementsByClassName('select-custom__value')[0];
	const selectList = select.getElementsByClassName('select-custom__list')[0];
	const optionList = selectList.children;
	
	select.addEventListener('click', () => onSelectClickHandler(selectList));
	initOptions(selectValue, optionList);
	const options = getSelectOptions(optionList);
});

function getSelectOptions(list) {
	const options = [];

	for (let option of list) {
		options.push(option.textContent);
	}

	return options;
}

function initOptions(selectValue, list) {
	for (let option of list) {
		option.setAttribute('data-id', `${option.textContent}`);
		option.addEventListener('click', () => onOptionClickHandler(selectValue, option));
	}
}

function onSelectClickHandler(list) {
	list.classList.toggle('d-none');
}

function onOptionClickHandler(selectValue, option) {
	selectValue.innerText = option.textContent;
}