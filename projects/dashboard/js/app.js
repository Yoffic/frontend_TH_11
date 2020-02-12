"use strict";
document.addEventListener('DOMContentLoaded', () => {
	
	// ALERTS AND NOTIFICATIONS
	const alertButton = document.querySelector('.icon--bell');
	const header = document.querySelector('header');
	const closeBtn = document.querySelector('.close-btn');
	const alertMsg = document.querySelector('.alert-msg');
	const notifications = document.createElement('div');
	notifications.setAttribute('id', 'notifications');
	notifications.setAttribute('class', 'notifications-content');
	notifications.innerHTML = `<p>You have 2 new messages from Justin Standley</p>
							   <p>Your email preferences has been changed</p>`;
	const removeNotifications = () => {
		header.removeChild(notifications);
	};

	closeBtn.addEventListener('click', () => {
		alertMsg.style.opacity = '0';
		setTimeout((() => {alertMsg.style.display = 'none';}), 400);
	});

	alertButton.addEventListener('click', (e) => {
		if (header.children[3]) { 
			removeNotifications();
			return false;
		}
		header.appendChild(notifications); 
		return true;
	});

	document.addEventListener('click', (e) => {
		if(e.target === alertButton || !header.children[3]) {
			return false;
		}
		removeNotifications();
		return true;
	});

	// CHARTS

	Chart.defaults.global.defaultFontColor = '#aaa';
	Chart.defaults.global.defaultFontFamily = "'PT Sans', 'Helvetica', 'Arial', sans-serif";
	Chart.defaults.global.defaultFontSize = 12;

	const hourlyLabels = ['','1-2', '3-4', '5-6', '7-8', '9-10', '11-12', '13-14', '15-16', '17-18', '19-20', '21-22', '23-24'];
	const hourlyData = [0, 10, 5, 25, 30, 40, 10, 20, 10, 50, 30, 50, 40, 3];
	const dailyLabels = ['','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	const dailyData = [0, 75, 100, 175, 125, 225, 200, 100];
	const weeklyLabels = ['','16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'];
	const weeklyData = [0,1250, 1000, 1500, 2000, 1500, 1750, 1250, 1750, 2250, 2000, 2250, 2000];
	const monthlyLabels = ['','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const monthlyData = [0,12500, 10000, 15000, 20000, 15000, 17500, 12500, 17500, 10000, 11500, 10950, 12300, 10200];

	const currentData = {
		data: weeklyData
	};

	const trafficChart = document.querySelector('#trafficChart').getContext('2d');

	const data = {
		type: 'line',
		datasets: [{
			data: currentData.data,
			borderColor: '#7477bf',
			backgroundColor: 'rgba(116, 119, 191, .2)',
			borderWidth: 1,
			fill: true,
			pointBackgroundColor: '#fff',
			pointBorderColor: '#7477bf',
			pointBorderWidth: 2,
			pointRadius: 6.5
		}],
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}],
				xAxes: [{
					gridLines: {
						offsetGridlines: true
					}
				}]
			},
			tooltips: {
				enabled: false
			},
			elements: {
				line: {
					tension: 0,
				}
			},
			legend: {
				display: false,
			},
			responsive: true
		}
	};

	let currentChart = new Chart(trafficChart, {
		type: data.type,
		data: {
			labels: weeklyLabels,
			datasets: data.datasets
		},
		options: data.options
	});

	const buttons = document.querySelectorAll('.traffic-links');
	const chartTraffic = document.querySelector('#traffic-menu');
	let elemLabels;
	let elemData;
	chartTraffic.addEventListener('click', (e) => {
		e.preventDefault();
		currentChart.destroy();
		const currentElem = e.target.id;
		if (currentElem == 'hour') {
			elemLabels = hourlyLabels;
			elemData = hourlyData;
		} else if (currentElem == 'day') {
			elemLabels = dailyLabels;
			elemData = dailyData;
		} else if (currentElem == 'week') {
			elemLabels = weeklyLabels;
			elemData = weeklyData;
		} else if (currentElem == 'month') {
			elemLabels = monthlyLabels;
			elemData = monthlyData;
		}
		for (let i = 0; i < buttons.length; i++) {
			buttons[i].className = buttons[i].className.replace(' active', '');
			buttons[i].previousElementSibling.removeAttribute('checked');
		}
		e.target.className += ' active';
		e.target.previousElementSibling.setAttribute('checked', '');

		currentData.data = elemData;
		currentChart = new Chart(trafficChart, {
			type: data.type,
			data: {
				labels: elemLabels,
				datasets: data.datasets
			},
			options: data.options
		});
	});


	const dailyBar = document.getElementById('dailyChart').getContext('2d');
	const dailyChart = new Chart(dailyBar, {
		type: 'bar',
		data: {
			labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
			datasets: [{
				data: [75, 100, 175, 125, 225, 200, 100],
				backgroundColor:'#7477bf'
			}],
		},
		options: {
			legend: {
				display: false, //disable main label for chart
			},
			scales: {
				xAxes: [{
					gridLines: {
						display: false
					}
				}]
			}
		},
	});

	const mobusersBar = document.getElementById('mobusersChart').getContext('2d');
	const mobusersChart = new Chart(mobusersBar, {
		type: 'doughnut',
		data: {
			labels: ['Phones', 'Tablets', 'Desktop'],
			datasets: [{
				data: [15, 15, 70],
				backgroundColor: ['#81c98f', '#74b1bf', '#7477bf'],
				borderWidth: 0
			}],
		},
		options: {
			rotation: 0.5 * 8.7,
			legend: {
				position: 'right',
				labels: {
					boxWidth: 20,
				}
			}
		},
	});
	

	// FORM SUBMISSION
	const formMsg = document.querySelectorAll('.form')[0];
	const inputs = formMsg.elements;
	const usernameInput = document.querySelector('#username');
	const messageInput = document.querySelector('#textmessage');
	const submBtn = document.querySelector('#button-send');
	const msgConfirm = document.createElement('div'); // success message for submit button
	msgConfirm.className = 'message--success';

	submBtn.addEventListener('click', e => {
		for (let i = 0; i < 2; i++) {
			const value = inputs[i].value;
			const input = inputs[i];
			const listener = value.match(/^\w+/i);

			const tooltip = input.previousElementSibling;
			tooltip.style.display = 'none';
			input.className = '';
			
			const createTooltip = () => {
				tooltip.innerHTML = tooltip.getAttribute('data-tip');
				tooltip.style.display = 'inherit';
				input.className = 'err';
			};

			if (listener === null) {
				e.preventDefault();
				createTooltip();
				return false;
			}			
		}

		if (e) {
			for (let i = 0; i < inputs.length; i++) {
				inputs[i].style.display = 'none';
			}
			msgConfirm.innerHTML = `<p>Congrats!</p><p>Your message has been sent successfully.</p>`;
			formMsg.appendChild(msgConfirm);
			e.preventDefault();

			setTimeout((() => formMsg.submit()), 3000);
		}
	});

	formMsg.addEventListener('input', (e) => {
		const deleteTooltip = () => {
			for (let i = 0; i < 2; i++) {
				const tooltip = inputs[i].previousElementSibling;
				tooltip.style.display = 'none';
				inputs[i].className = '';
			}
		};
		if (usernameInput.className == 'err' || messageInput.className == 'err'){
			deleteTooltip();
		}
	});


	// AUTOCOMPLETE
	const autocompletion = (field, possibilities) => {
		let currentFocus;
		field.addEventListener('input', (e) => {
			const fieldValue = e.target.value;
			closeAllLists();
			if (!fieldValue) return false;
			currentFocus = -1;

			const itemsArr = document.createElement('div');
			itemsArr.setAttribute('id', e.target.id + 'autocomplete');
			itemsArr.setAttribute('class', 'autocomplete--list');
			e.target.parentNode.appendChild(itemsArr);
			
			for (let i = 0; i < possibilities.length; i++) {

				if (possibilities[i].substr(0, fieldValue.length).toUpperCase() == fieldValue.toUpperCase()) {
					const matchedItems = document.createElement('div');
					matchedItems.innerHTML = `<strong>${possibilities[i].substr(0, fieldValue.length)}</strong>`;
					matchedItems.innerHTML += possibilities[i].substr(fieldValue.length);
					matchedItems.innerHTML += `<input type='hidden' value='${possibilities[i]}'>`;
					
					matchedItems.addEventListener('click', (e) => {
						field.value = e.target.querySelectorAll('input')[0].value;
						closeAllLists();
					});
					itemsArr.appendChild(matchedItems);
				}
			}
		});

		field.addEventListener('keydown', (e) => {
			let itemName = document.getElementById(e.target.id + 'autocomplete');
			if (itemName) itemName = itemName.querySelectorAll('div');
			if (e.keyCode == 40) {
				currentFocus++;
				addActive(itemName);
			} else if (e.keyCode == 38) {
				currentFocus--;
				addActive(itemName);
			} else if (e.keyCode == 13) {
				e.preventDefault();
				if (currentFocus > -1) {
					if (itemName) itemName[currentFocus].click();
				}
			}
		});
		const addActive = (activeItem) => {
			if (!activeItem) return false;
			removeActive(activeItem);
			if (currentFocus >= activeItem.length) currentFocus = 0;
			if (currentFocus < 0) currentFocus = (activeItem.length - 1);
			activeItem[currentFocus].classList.add('autocomplete--active');
		};
		const removeActive = (activeItem) => {
			for (let i = 0; i < activeItem.length; i++) {
				activeItem[i].classList.remove('autocomplete--active');
			}
		};
		const closeAllLists = (element) => {
			const items = document.querySelectorAll('.autocomplete--list');
			for (let i = 0; i < items.length; i++) {
				if (element !== items[i] && element !== field) {
					items[i].parentNode.removeChild(items[i]);
				}
			}
		};
		document.addEventListener('click', (e) => {
			closeAllLists(e.target);
		});
	};
	const names = [
		'Sheree Brightman','Georgene Pifer','Justin Standley','Stephan Deibler','Wayne Jacques','Christian Partlow','Tomi Betances','Kareen Trojacek','Oleta Brisson','Genaro Goupil','Lorinda Rideout','Tamisha Fitzmaurice','Latesha Daley','Rico Hultman','Porter Rossman','Sanora Isom','Tova Rumery','Nathalie Deady','Fae Caver','Lidia Sherrell','Miguelina Hillier','Zonia Charleston','Tara Zane','Cecille Osby','Kandis Krone','Frank Pentecost','Michelle Glasgow','Trenton Heslin','Deandrea Didion','Fonda Mccloud','Toni Deno','Sal Coman','Leida Stotz','Sabrina Deaner','Lissette Deas','Bernardo Brunette','Stefania Lizarraga','Dede Ordaz','Liana Arguelles','Tiffany Reynold','Laci Dumas','Beverly Peachey','Fidela Bedard','Minerva Throop','Talitha Mcfetridge','Sol Rosenzweig','Shanita Hagedorn','Nubia Mix','Anh Larry','Gregg Alexandre','Rina Heiden','Tennille Merwin','Hazel Akridge','Jill Topham','Brice Peng','Deja Mccree','Ernesto Neeley','Belen Ory','Blanca Frasher','Karla Thurlow','Emmanuel Wakeman','Tennie Waldorf','Chery Welles','Kasandra Hass','Zula Rodd','Josephina Northington','Evan Hickerson','Deidra Golston','Titus Seppala','Jacklyn Pietz','Remona Glassford','Bianca Mccay','Li Bultman','Otilia Swinehart','Bertram Warren','Marisha Plewa','Synthia Wirt','Shemeka Ratcliff','Jena Duffel','Ramiro Harville','Gayle Lamson','Nubia Monnin','Kandi Mushrush','Imelda Calvillo','Adena Higginson','Evelin Steinmetz','Inell Minier','Darrin Cotta','Bridgett Rulison','Ira Koopman','Shakita Farrel','Cathrine Defeo','Jenna Cordes','Daniell Wise','Otelia Madero','Charley Martyn','Ardith Mitschke','Kaye Esterly','Merrill Rochelle','Alysia Isaacs'
	];

	autocompletion(document.querySelector('#username'), names);


	// SETTINGS SAVER
	const settingsForm = document.querySelector('#settings');
	const switcher = document.querySelectorAll('.onoffswitch-checkbox');
	const timezone = document.querySelector('#timezone');
	const cancelButton = document.querySelector('#cancel');


	const supportLocStorage = () => {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch(e) {
			return false;
		}
	};

	window.onload = () => {
		if (supportLocStorage()) {
			if (localStorage.getItem('settings')) {
				const items = JSON.parse(localStorage.getItem('settings')); 
				if (items !== null) {
					switcher[0].checked = items[0];
					switcher[1].checked = items[1];
					timezone.value = items[2];
				}
			}

			settingsForm.addEventListener('change', (e)=> {
				let currentValue = [];
				for (let i = 0; i < switcher.length; i++) {
					currentValue[i] = switcher[i].checked;
				}
				currentValue[2] = timezone.value;
				console.log(currentValue);
				localStorage.setItem('settings', JSON.stringify(currentValue));
			});

			cancelButton.addEventListener('click', (e)=> {
				localStorage.removeItem('settings');
			});
		}
	};
});