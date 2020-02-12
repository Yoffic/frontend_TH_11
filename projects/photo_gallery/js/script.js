$('.chocolat-parent').Chocolat({
	imageSelector: '.image-link',
	loop: true,
	fullScreen: false
});

$('#search').change(function() {
	var input = $(this).val().toUpperCase();

	$('.image-link').each(function() {
		var titleValue = $(this).attr('title').toUpperCase();
		if (titleValue.indexOf(input) >= 0) {
			$(this).show();
		} else {
			$(this).hide();
		}
	});
}).keyup(function() {
	$(this).change();
});