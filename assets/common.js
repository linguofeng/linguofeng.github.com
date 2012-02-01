$(document).ready(function() {
	$.waypoints.settings.scrollThrottle = 30;
	$('#container').waypoint(function(event, direction) {
	}, {
		offset: '-50%'
	}).find('#sidebar').waypoint(function(event, direction) {
		$(this).parent().toggleClass('sticky', direction === "down");
		event.stopPropagation();
	});

	$('#content').waypoint(function(event, direction) {}, {
		offset: '-50%'
	}).find('#charpter').waypoint(function(event, direction) {
		$(this).parent().toggleClass('sticky', direction === "down");
		event.stopPropagation();
	});

	$().UItoTop({ easingType: 'easeOutQuart' });
	
	/* 给符合条件的加上<span class="toggle">[展开]</span> */
	$('#charpter').has('h3').children('h3').append(' <span id="open">[展开]</span>');
	$('#charpter').has('h3').children('h3').append('<span id="close">[关闭]</span>');
	$('#charpter').has('h3').children('h3').children('span').addClass('cursor');
	$('#charpter').has('h3').children('h3').children('<span[id="open"]').hide();
	$('#charpter').has('h3').children('h3').children('span').click(function(){
		$(this).parent().next().slideToggle('fast', function(){
			$(this).prev().children('span[id="open"]').toggle();
			$(this).prev().children('span[id="close"]').toggle();
		});
	});
	
	$('#charpter ul li').has('ul').children('ul').before('<span id="open">[展开]</span>');
	$('#charpter ul li').has('ul').children('ul').before('<span id="close">[关闭]</span>');
	$('#charpter ul li').has('ul').children('ul').hide();
	$('#charpter ul li').has('ul').children('span[id="close"]').hide();
	$('#charpter ul li').has('ul').children('span').addClass('cursor');
	$('#charpter ul li').has('ul').children('span').click(function(){
		$(this).parent().children('ul').slideToggle('fast', function(){
			$(this).parent().children('span[id="open"]').toggle();
			$(this).parent().children('span[id="close"]').toggle();
		});
	});
	
});