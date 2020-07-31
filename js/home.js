$(function () {
    var row = 5

    //轮播间隔时间
    $('.carousel').carousel({
        interval: 4000
    });

    getborrowlist(1)

    function getborrowlist(pageIndex) {
        $.ajax({
            url: 'http://139.9.177.51:3331/getborrow.php',
            type: 'get',
            dataType: 'json',
            data: {
                page: pageIndex,
                row: row
            },
            success: function (data) {
                // console.log(data);
                //定义变量
                var str = ''

                data.list.forEach(function (value, index) {
                    // console.log(value.id);
                    str += `
                    <tr>
                    <td>${value.userid}</td>
                    <td>${value.title}</td>
                    <td class="text-info">${parseFloat(value.interest).toFixed(2)}%</td>
                    <td class="text-info">${value.borrowmoney}</td>
                    <td>${value.repaytype == '0' ? '按月分期还款' : '按月到期还款'}</td>
                    <td>${parseFloat(value.ownmoney * 100 / value.borrowmoney).toFixed(2)}%</td>
                    <td><a href="?borrowId=${value.id}#invest/borrowInfo">查看</a></td>
                    </tr>
                    `
                })

                $('#loan table tbody').html(str)

                //总页数
                var totalPage = Math.ceil(data.total/row)

                $("#page").paging({
                    nowPage: pageIndex, // 当前页码,默认为1
                    pageNum: totalPage, // 总页码
                    buttonNum: 7, //要展示的页码数量，默认为7，若小于5则为5
                    canJump: 1,// 是否能跳转。0=不显示（默认），1=显示
                    showOne: 0,//只有一页时，是否显示。0=不显示,1=显示（默认）
                    callback: function (num) { //回调函数,num为当前页码
                        getborrowlist(num)
                    }
                });
            }
        })



    }







    /*  $('.reduce').click(function(){
         page--
         page = page<1? 1:page
         $('.reduce-page').html(page)
         getborrowlist(page)
     })
 
     $('.increase').click(function(){
         page++
         page = page>totalpage? totalpage:page
         $('.reduce-page').html(page)
         getborrowlist(page)
     })
  */










})