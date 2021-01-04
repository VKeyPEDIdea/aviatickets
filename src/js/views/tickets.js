import currencyUI from './currency';

class TicketsUI {
	constructor(currency) {
		this.container = document.querySelector('.tickets-container');
		this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
	}

	renderTickets(tickets) {
		this.clearContainer();

		if (!tickets.length) {
			this.showEmptyMessage();
			return;
		}

		let fragment = '';

		const currency = this.getCurrencySymbol();

		tickets.forEach((ticket) => {
			const template = TicketsUI.ticketTemplate(ticket, currency);
			fragment += template;
		});

		this.container.insertAdjacentHTML('afterbegin', fragment);
	}

	clearContainer() {
		this.container.innerHTML = '';
	}

	showEmptyMessage() {
		const template = TicketsUI.emptyMsgTemplate();
		this.container.insertAdjacentElement('afterbegin', template);
	}

	static emptyMsgTemplate() {
		const fragment = document.createDocumentFragment();

		const div = document.createElement('div');
		div.classList.add('tickets-not-found-msg');
		div.textContent = 'Билеты не найдены по вашему запросу';

		fragment.appendChild(div);
		return div;
	}

	static ticketTemplate(ticket, currencySymbol) {
		return `
    <div class="card ticket">
      <div class="ticket-destination">
        <div class="ticket-destination-departure">
          <p class="subtitle">Отправка</p>
          <p class="ticket-city">${ticket.departure_name}</p>
          <p class="ticket-destination-departure-time">${ticket.departure_at}</p>
        </div>
        <div class="ticket-destination-arrival">
          <p class="subtitle">Прибытие</p>
          <p class="ticket-city">${ticket.arrival_name}</p>
        </div>
        <div class="ticket-airline">
          <img src="${ticket.airline_logo}" class="ticket-airline__img" />
          <span class="ticket-airline__name">${ticket.airline_name}</span>
        </div>
      </div>
      <div class="ticket-additional-info">
        <div class="ticket-transfers">
          <div class="subtitle-value">${ticket.transfers}</div>
          <div class="subtitle">Пересадок</div>
        </div>
        <div class="ticket-flight-number">
          <div class="subtitle-value">${ticket.flight_number}</div>
          <div class="subtitle">Номер рейса</div>
        </div>
        <div class="ticket-price">
          <div class="subtitle-value">${currencySymbol}${ticket.price}</div>
          <div class="subtitle">Стоимость</div>
        </div>
      </div>
    </div>
    `;
	}
}

const ticketsUI = new TicketsUI(currencyUI);

export default ticketsUI;