$(function () {

    loadpage();

    //hash改变事件
    window.onhashchange = loadpage;

    function loadpage() {
        var hash = location.hash

        switch (hash) {
            case '#home':
                $('#main').load('/pages/home.html')
                break;

            case '#invest':
                $('#main').load('/pages/invest.html')
                break;

            case '#borrow':
                $('#main').load('/pages/borrow.html')
                break;

            case '#personal':
                // 个人中心默认页面
                loadPersonalpage('#personal/account')
                break;

            case '#personal/account':
                loadPersonalpage('#personal/account')
                break;

            case '#personal/realname':
                loadPersonalpage('#personal/realname')
                break;

            default:
                //如果匹配不到，默认加载首页
                $("#main").load("/pages/home.html");
                hash = '#home'
        }
        bgactive(hash)
    }

    // 一级导航激活
    function bgactive(hash) {
        //将锚点分割成数组  得到一级路由的锚点
        hash = hash.split('/')[0]
        $('#nav .nav-item a').removeClass('active')
        $(`#nav .nav-item a[href="${hash}"]`).addClass('active')
    }


    // 加载页面
    function loadPersonalpage(hash) {
        var arr = hash.split('/')
        //得到二级路由的锚点
        var page = arr[arr.length - 1]

        //判断是否在个人中心页  
        var isPersonal = !!$('.personalPage').length
        if (isPersonal) {
            $('.personalPage .panel').load(`/pages/personal/${page}.html`)
            //必须要页面加载完  执行
            secondBgactive(hash)
        } else {
            $('#main').load('/pages/personal.html', function () {

                $('.personalPage .panel').load(`/pages/personal/${page}.html`)
                
                //必须要页面加载完  执行
                secondBgactive(hash)

            })
        }
    }

    // 二级路由激活样式
    function secondBgactive(hash) {
        $('.personalPage .myAccount li.active').removeClass('active')
        $(`.personalPage .myAccount li a[href="${hash}"]`).parent().addClass('active')
    }















})