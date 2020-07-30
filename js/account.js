$(function () {
    //点击跳转到充值页面
    $('.Recharge').click(function () {
        location.href = '/pages/recharge.html'
    })

    //渲染页面
    getAccountInfo()

    //封装函数渲染页面  账户信息
    function getAccountInfo() {
        $.ajax({
            url: 'http://139.9.177.51:3331/getuserinfo.php',
            type: 'get',
            data: {
                id: sessionStorage.getItem('userid')
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                //变量对象
                for (const key in data) {

                    $(`#${key}`).html(data[key])
                }

                //调用echarts
                draw(data)
            }
        })
    }


    //修改账户信息
    $('#modifyUserInfo').click(function () {
        $.ajax({
            url: 'http://139.9.177.51:3331/updateuser.php',
            type: 'get',
            data: {
                id: sessionStorage.getItem('userid'),
                nickname: $('#newNickname').val(),
                email: $('#newEmail').val()
            },
            success: function (data) {
                if (data == 'ok') {
                    //修改成功渲染页面
                    getAccountInfo()
                    //弹出提示信息
                    alert('修改成功')
                    //隐藏模态框
                    $('#exampleModal').modal("hide")
                } else {
                    alert('修改失败')
                }

            }
        })
    })



    function draw(data) {
        // 基于准备好的dom，初始化   echarts实例
        var myChart = echarts.init(document.getElementById('echartsMain'));

        // 指定图表的配置项和数据  写配置
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 10,
                data: ['总金额', '可用金额', '冻结金额']
            },
            //核心数据
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: data.totalmoney, name: '总金额' },
                        { value: data.usablemoney, name: '可用金额' },
                        { value: data.blockedmoney, name: '冻结金额' }
                    ]
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }







})