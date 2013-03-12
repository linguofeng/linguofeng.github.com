!function($) {
	$(function() {
		var $window = $(window)

		// 代码高亮
		window.prettyPrint && prettyPrint()

		// 工具提示
		$("a[rel=tooltip]").tooltip()
		$("a[rel=popover]").popover()
	})
}(window.jQuery)