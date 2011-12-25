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
});