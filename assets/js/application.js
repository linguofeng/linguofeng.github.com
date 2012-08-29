!function($) {
	$(function() {
		var $window = $(window)

		// 左侧导航栏
		$('.sidenav').affix({
			offset : {
				top : function() {
					return $window.width() <= 980 ? 290 : 210
				},
				bottom : 270
			}
		})

		// 代码高亮
		window.prettyPrint && prettyPrint()

		// 工具提示
		$("a[rel=tooltip]").tooltip()
	})
}(window.jQuery)