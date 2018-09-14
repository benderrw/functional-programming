const searchFieldElement = document.getElementById('search-field');
const searchBodyElement = document.getElementById('search-body');
const searchAlertElement = document.getElementById('search-alert');
const showMoreButton = document.getElementById('show-more-button');

const Table = (employees) => {
	const tableItems = employees.map(employee => TableItem(employee)).join('');

	return `
		<table class="table" role="table">
			<thead>
				<tr role="rowheader>
					<th role="rowheader">Picture</th>
					<th role="rowheader">Name</th>
					<th role="rowheader">Age</th>
					<th role="rowheader">Active</th>
					<th role="rowheader">Email</th>
					<th role="rowheader">Phone</th>
					<th role="rowheader">Company</th>
					<th role="rowheader">Balance</th>
				</tr>
			</thead>
			<tbody>
				${tableItems}
			</tbody>
		</table>
	`;
};
const TableItem = (employee) => {
	return `
		<tr data-id="${employee._id}" role="row">
			<td role="cell"><img src="${employee.picture}" alt="Employee picture" width="32" height="32"></td>
			<td role="cell">${employee.name}</td>
			<td role="cell">${employee.age}</td>
			<td role="cell">${employee.isActive}</td>
			<td role="cell">${employee.email}</td>
			<td role="cell">${employee.phone}</td>
			<td role="cell">${employee.company}</td>
			<td role="cell">${employee.balance}</td>
		</tr>
	`;
};
const SearchAlert = (searchQuery) => {
	return `
		<div id="search-alert-info-message" class="alert alert-info" role="alert">
			Your search - <strong>${searchQuery}</strong> - did not match any employee.
		</div>	
	`;
};
const render = ({employees, searchQuery, offset, limit} = store) => {
	if (searchQuery.length >= 3) {
		searchFieldElement.setAttribute('aria-invalid', false);
		employees = employees.filter((employee) => {
			const regex = new RegExp(searchQuery, 'ig');
			
			if (!!employee.name.match(regex)) {
				return employee;
			}
		});
	} else {
		searchFieldElement.setAttribute('aria-invalid', true);
	}

	const employeesLength = employees.length;
	employees = employees.slice(offset, limit);

	if (employeesLength > limit) {
		showMoreButton.disabled = false;
		showMoreButton.setAttribute('aria-disabled', false);
	} else {
		showMoreButton.disabled = true;
		showMoreButton.setAttribute('aria-disabled', true);
	}

	const searchBodyContent = employees.length ? Table(employees) : SearchAlert(searchQuery);
	
	searchBodyElement.innerHTML = searchBodyContent;
};
const onSearchChange = searchQuery => {
	if (searchQuery.length > 0 && searchQuery.length < 3) {
		searchAlertElement.classList.remove('hidden');
	} else {
		searchAlertElement.classList.add('hidden');
	}

	store.searchQuery = searchQuery;

	render();
};
const onDocumentClick = event => {
	const trElement = event.target.closest('tr');

	try {
		const employeeId = trElement.getAttribute('data-id');
		const employeeData = store.employees.filter(employee => employee._id === employeeId).pop();
		localStorage.setItem('McFadyen', JSON.stringify({employeeData}));
		window.location.href = 'detail.html';
	} catch (err) {}
};
const onShowMoreClick = () => {
	store.limit += 10;
	render();
};
const withHandlers = () => {
	document.addEventListener('click', event => onDocumentClick(event));
	searchFieldElement.addEventListener('input', (event) => onSearchChange(event.target.value));
	showMoreButton.addEventListener('click', (event) => onShowMoreClick(event.target.value));
};

let store = {
	searchQuery: '',
	employees: [],
	limit: 10,
	offset: 0
};

fetch('./assets/dataset/people-collection.json')
	.then(response => response.json())
	.then(json => store.employees = json)
	.then(() => {
		render();
		withHandlers();
	});
