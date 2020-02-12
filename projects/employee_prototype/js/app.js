$(document).ready(function() {
	const RandomUserUrl = 'https://randomuser.me/api/?results=12&nat=us&format=PrettyJSON';
	let dataStored = [];

	function displayUsers(data) {
		let usersHTML = '';
		$.each(data.results, function(i, user) {
		dataStored = data.results;
		usersHTML += `<li tabindex="${i+1}"> 
						<img src="${user.picture.large}">
						<div>
							<h2><span>${user.name.first}</span> <span>${user.name.last}</span></h2>
							<p>${user.login.username}</p>
							<p class="location">${user.location.city}</p>
						</div>
						</li>`;
		});
		$('#users').html(usersHTML);
	}

	$.getJSON(RandomUserUrl, displayUsers).fail(function() {
		const feedback = `<p>Network problems. Check if you can access <a href="https://randomuser.me/">https://randomuser.me/</a></p>`
		$('#users').html(feedback);
	});

	function createAllPersons(data) {
		let modalHTML = `<div class="modal-wrap">
							<a href="#" class="link prev">&#8249;</a>
							<a href="#" class="link next">&#8250;</a>
							<span class="close">&times;</span>`;
		$.each(data, function(i, user) {
			modalHTML += `<div class="modal-object slide-${i}">
							<img src="${user.picture.large}">
							<div class="main-info">
								<h2>
									<span>${user.name.first}</span> <span>${user.name.last}</span>
								</h2>
								<p>${user.login.username}</p>
								<p>${user.email}</p>
							</div>
							<div class="extra-info">
								<p>${user.phone}</p>
								<p>${user.location.street} ${user.location.city}, ${user.location.state} ${user.location.postcode}, ${user.nat}</p>
								<p>Birthday: <time>${user.dob}</time></p>
							</div>
						</div>`;

		});
		modalHTML += `</div>`;
		return modalHTML;
	}

	function createModal() {
		const addAll = createAllPersons(dataStored);
		$(addAll).appendTo('.main-wrap');

		$('time').text(function(i, limitText) {
			return limitText.substr(0, 10);
		});
	}


	$('#users').on('click', 'li', function() {
		createModal();

		const selectedIndex = $(this).attr('tabindex');
		parseInt(selectedIndex, 10);
		let currentItemIndex = selectedIndex - 1;

		function showCurrentElement(number) {
			const $allElements = $('.modal-object');
			if (number > 11) {currentItemIndex = 0}
			if (number < 0) {currentItemIndex = 11}

			$($allElements).each(function(i, element) {
				$(element).removeClass('active');
			});
			$($allElements[currentItemIndex]).addClass('active');
		}

		showCurrentElement(currentItemIndex);	

		function changeIndex(number) {
			showCurrentElement(currentItemIndex += number);
		}
		
		$('.link').click(function() {
			if($(this).hasClass('prev')) {
				changeIndex(-1);
			} else if($(this).hasClass('next')) {
				changeIndex(1);
			}
		});

		$('.close').click(function() {
			$('.modal-wrap').remove();
		});
	});

	const buttonFilter = `<button id="filter">Filter by Username</button>`;
	$('.sort').append(buttonFilter);

	$('#filter').on('click', function() {
		const dataArranged = dataStored.sort(function(a, b) {
			return (a.login.username > b.login.username ? 1 : (a.login.username==b.login.username ? 0 : -1));
		});

		let usersHTML = '';
		$.each(dataArranged, function(i, user) {
			usersHTML += `<li tabindex="${i+1}"> 
							<img src="${user.picture.large}">
							<div>
								<h2><span>${user.name.first}</span> <span>${user.name.last}</span></h2>
								<p>${user.login.username}</p>
								<p class="location">${user.location.city}</p>
							</div>
						  </li>`;
		});

		$('#users').html(usersHTML);
	});
});