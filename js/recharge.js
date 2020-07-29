$(function () {
    //选项卡
    $('.content .tab li').click(function () {

        $(this).addClass('active').siblings().removeClass('active')
        $('.content .menu div').eq($(this).index()).addClass('active').siblings().removeClass('active')
    })

    $('#btn').click(function () {

        if ($("#money").val() > 0) {
            $.ajax({
                url: 'http://139.9.177.51:3331/charge.php',
                type: 'get',
                data: {
                    id: sessionStorage.getItem('userid'),
                    bancode: $('.bank>option:selected').val(),
                    chargemoney: $("#money").val()
                },
                success: function (data) {
                    console.log(data);
                    if (data == 'ok') {
                        if (confirm('充值成功是否前往个人中心')) {
                            location.href = '../index.html#personal'
                        } else {
                            $("#money").val('')
                        }
                    } else {
                        alert('充值失败')

                    }
                }
            })

        } else {
            alert('充值金额至少为1')
        }

    })
















})