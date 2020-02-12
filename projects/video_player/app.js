document.addEventListener('DOMContentLoaded', () => {
	const video = document.getElementById('player_html5');
	const caption = document.querySelectorAll('.description span');
	
	video.addEventListener('timeupdate', () => {
		const playingTime = video.getCurrentTime();

		for (let i = 0; i < caption.length; i += 1) {
			caption[i].className = '';
		}

		for (let i = 0; i < caption.length; i += 1) {
			const captionTime = caption[i].getAttribute('data-t');
			if (playingTime > 0 && playingTime < captionTime) {
				caption[i].className = 'text-highlight';
				break;
			} 
		}
	});

	for (let i = 0; i < caption.length; i += 1) {
		caption[i].addEventListener('click', () => {
			if (caption[i-1] === null) {
				video.setCurrentTime(0);
				video.play();
			} else {
				video.setCurrentTime(caption[i-1].getAttribute('data-t'));
				video.play();
			}
		});
	}
});