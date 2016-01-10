!function($) {
    $(function() {
        var $window = $(window)

        // 工具提示
        $("a[rel=tooltip]").tooltip()
        $("a[rel=popover]").popover()
    })
}(window.jQuery)
