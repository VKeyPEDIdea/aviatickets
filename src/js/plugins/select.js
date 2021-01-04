// There is will be scripts for custom select elements
const selects = document.querySelectorAll('.select-custom');

selects.forEach(select => {
	const selectValue = select.getElementsByClassName('select-custom__value')[0];
	const selectList = select.getElementsByClassName('select-custom__list')[0];
	const optionList = selectList.children;

	select.addEventListener('click', () => onSelectClickHandler(selectList));
	initOptions(selectValue, optionList);
});

function initOptions(selectValue, list) {
	let option;

	for (let i = 0; i < list.length; i++) {
		option = list[i];
		option.setAttribute('data-id', `${option.textContent}`);
		option.addEventListener('click', onOptionClickHandler(selectValue, option));
	}
}

function onSelectClickHandler(list) {
	list.classList.toggle('d-none');
}

function onOptionClickHandler(selectValue, option) {
	return function () {
		selectValue.innerText = option.textContent;
	};
}