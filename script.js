$(document).ready(() => {
	// document.location.href='#';
	const portfolioTop = $('.card-columns').offset().top;
	let countUp = 0;
	$('.card-columns').hide().css('paddingTop', '4rem');
	$('#arrow').hide();
	//add feature when user scrolls the window
	$(window).scroll(() => {

		//get current position from the top of the window
		let pageY = $(window).scrollTop() || $(document.documentElement).scrollTop();
		//get browser height
		let viewHeight = $(window).height();

		//add and remove button for quick scroll to the top after 
		if (pageY > viewHeight/3) {
			$('#arrow').show();
		} else if (pageY < viewHeight/3) {
			$('#arrow').hide();
		}

		//animate the appearance of portfolio cards 
		if (pageY + viewHeight > portfolioTop && countUp === 0) {
			$('.card-columns').fadeIn(500).animate({
				paddingTop: 0,
			}, 600);
			countUp = 1;
		}
	});

	//animate slow scroll to the top when button clicked
	$('#arrow').click(() => {
		$('html,body').animate({
			scrollTop: 0
		}, 300);
	});

	//animate skills progress ring on hover
	$('.progress').hover(
		(e) => {
			$(e.currentTarget).animate({
				width: '13rem',
				height: '13rem',
				lineHeight: '13rem',
				marginTop: 0,
				marginBottom: 0
			}, 300);
			$(e.currentTarget).find('.progress-right').find('.progress-bar').animate({
				borderTopLeftRadius: '6.5rem',
				borderBottomLeftRadius: '6.5rem'
			}, 300);
			$(e.currentTarget).find('.progress-left').find('.progress-bar').animate({
				borderTopRightRadius: '6.5rem',
				borderBottomRightRadius: '6.5rem'
			}, 300);
		}, (e) => {
			$(e.currentTarget).animate({
				width: '11rem',
				height: '11rem',
				lineHeight: '11rem',
				marginTop: '1.5rem',
				marginBottom: '1.5rem'
			}, 300);
			$(e.currentTarget).find('.progress-right').find('.progress-bar').animate({
				borderTopLeftRadius: '5.5rem',
				borderBottomLeftRadius: '5.5rem'
			}, 300);
			$(e.currentTarget).find('.progress-left').find('.progress-bar').animate({
				borderTopRightRadius: '5.5rem',
				borderBottomRightRadius: '5.5rem'
			}, 300);
		});
});