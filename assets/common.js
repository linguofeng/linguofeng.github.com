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
	
	$('h3[id]').each(function(){
		//console.log($(this));
		var id = $(this).attr('id');
		var utext = $(this).children('span[class=title]').text();
		// 判断子元素是否有ul节点
		if(!$('#charpter').has('h3').children('ul').is('ul')){
			$('#charpter').has('h3').not('ul').append('<ul></ul>');
		}
		$('#charpter').has('h3').has('ul').children('ul').append('<li id="a'+id+'"><a href="#'+id+'">'+ utext +'</a></li>');
		$('li[class="'+id+'"]').each(function(){
			//console.log($(this));
			var lid = $(this).attr('id');
			var ltext = $(this).children('span[class=title]').text();
			// 判断子元素是否有ul节点
			if(!$('#charpter ul li[id=a'+id+']').children('ul').is('ul')){
				$('#charpter ul li[id=a'+id+']').append('<ul></ul>');
			}
			$('#charpter ul li[id=a'+id+']').children('ul').append('<li><a href="#'+lid+'">'+ltext+'</a></li>');
		});
	});
	
	/* 给符合条件的加上<span class="toggle">[展开]</span> */
	$('#charpter').has('h3').has('ul').children('h3').append(' <span id="open">[展开]</span>');
	$('#charpter').has('h3').has('ul').children('h3').append('<span id="close">[关闭]</span>');
	$('#charpter').has('h3').has('ul').children('h3').children('span').addClass('cursor');
	$('#charpter').has('h3').has('ul').children('h3').children('<span[id="open"]').hide();
	$('#charpter').has('h3').has('ul').children('h3').children('span').click(function(){
		$(this).parent().next().slideToggle('fast', function(){
			$(this).prev().children('span[id="open"]').toggle();
			$(this).prev().children('span[id="close"]').toggle();
		});
	});
	
	// console.log('LOG日志输出');
	
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