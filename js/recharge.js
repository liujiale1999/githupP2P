$(function(){
    //选项卡
    $('.content .tab li').click(function(){

        $(this).addClass('active').siblings().removeClass('active')
        $('.content .menu div').eq($(this).index()).addClass('active').siblings().removeClass('active')
    })
















})