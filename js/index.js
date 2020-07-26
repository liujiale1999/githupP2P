$(function () {

    loadpage();

    //hash改变事件
    window.onhashchange = loadpage;

    function loadpage() {
        var hash = location.hash

        switch (hash) {
            case '#home':
                $('#main').load('./pages/home.html')
                break;

            case '#invest':
                $('#main').load('./pages/invest.html')
                break;

            case '#borrow':
                $('#main').load('./pages/borrow.html')
                break;

            case '#personal':
                $('#main').load('./pages/personal.html')
                break;

            default:
                //如果匹配不到，默认加载首页
                $("#main").load("./pages/home.html");
                hash = '#home'
        }
        bgactive(hash)
    }


    function bgactive(hash){
        $('#nav .nav-item a').removeClass('active')
        $(`#nav .nav-item a[href="${hash}"]`).addClass('active')
    }














})