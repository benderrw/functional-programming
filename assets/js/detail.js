const employeeDataElement = document.getElementById('employee-detail');
const employeeData = JSON.parse(localStorage.getItem('McFadyen')).employeeData;

function initMap() {
	const {latitude, longitude} = employeeData;
	const mapElement = document.getElementById('map');
	const myLatLng = {
		lat: latitude,
		lng: longitude
	};

	var map = new google.maps.Map(mapElement, {
		zoom: 4,
		center: myLatLng
	});

	var marker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		title: ''
	});
}

const EmployeeDetail = ({name, picture, gender, phone, company, address, about, registered} = employee) => {
	const dateValue = Date(registered);
	const dateTimestamp = Date.parse(dateValue);
	const dateInstance = new Date(dateTimestamp);
	const dateString = `
		${dateInstance.getMonth() + 1}/${dateInstance.getDate()}/${dateInstance.getFullYear()}
	`;
	return `
		<h1 class="text-center">${name}</h1>

		<div class="panel panel-default">
			<div class="panel-body" role="contentinfo">
				<div class="media mb-20">
					<div class="media-left">
						<img class="media-object" src="${picture}" alt="Employee ${name} picture" width="32" height="32">
					</div>
					<div class="media-body media-middle">
						<div>
							<strong>Full name:</strong> ${name}<br>
							<strong>Gender:</strong> ${gender}<br>
							<strong>Phone number:</strong> ${phone}<br>
							<strong>Company:</strong> ${company}<br>
							<strong>Address:</strong> ${address}
						</div>
					</div>
				</div>

				<div class="mb-20">
					<strong>About employee:</strong> ${about}
				</div>

				<div class="mb-20">
					<strong>Employee was registered in the system:</strong> ${dateString}
				</div>

				<div id="map"></div>
			</div>
		</div>
	`;
};

const render = (employee) => {
	employeeDataElement.innerHTML = EmployeeDetail(employee);
};

render(employeeData);