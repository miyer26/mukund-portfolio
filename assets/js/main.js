// Replace the entire contents of main.js with this code
(function ($) {

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		$main_articles = $main.children('article');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: ['361px', '480px'],
		xxsmall: [null, '360px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Nav.
	var $nav = $header.children('nav'),
		$nav_li = $nav.find('li');

	// Add "middle" alignment classes if we're dealing with an even number of items.
	if ($nav_li.length % 2 == 0) {
		$nav.addClass('use-middle');
		$nav_li.eq(($nav_li.length / 2)).addClass('is-middle');
	}

	// Main.
	var delay = 325,
		locked = false;

	// Methods.
	$main._show = function (id) {
		var $article = $main_articles.filter('#' + id);

		// No such article? Bail.
		if ($article.length == 0)
			return;

		// Handle lock.
		if (locked) return;
		locked = true;

		// Article already visible? Just switch articles.
		if ($article.hasClass('active')) {
			// Hide article
			$article.removeClass('active');
			setTimeout(function () {
				$article.hide();
				locked = false;
			}, delay);
		} else {
			// Hide any active article
			var $currentArticle = $main_articles.filter('.active');
			$currentArticle.removeClass('active');
			$currentArticle.hide();

			// Show new article
			$main.show();
			$article.show();
			$article.addClass('active');

			setTimeout(function () {
				locked = false;
			}, delay);
		}
	};

	// Articles - Remove close button functionality
	$main_articles.each(function () {
		var $this = $(this);

		// Prevent clicks from inside article from bubbling.
		$this.on('click', function (event) {
			event.stopPropagation();
		});
	});

	// Events.
	$nav.find('a').on('click', function (event) {
		event.preventDefault();
		event.stopPropagation();

		var href = $(this).attr('href');
		var id = href.substring(1);

		$main._show(id);
	});

	// Initialize.
	$main_articles.hide();

})(jQuery);