$(function () {

    $.ajax({
        url: 'http://139.9.177.51:3331/getborrow.php',
        type: 'get',
        dataType: 'json',
        data: {
            page: 1,
            row: 10
        },
        success: function (data) {
            console.log(data);
            //定义变量
            var str = ''

            data.list.forEach(function (value, index) {
                str += `
                <tr>
                <td>${value.userid}</td>
                <td>${value.title}</td>
                <td class="text-info">${parseFloat(value.interest).toFixed(2)}%</td>
                <td class="text-info">${value.borrowmoney}</td>
                <td>${value.repaytype=='0'?'按月分期还款':'按月到期还款'}</td>
                <td>${parseFloat(value.ownmoney*100/value.borrowmoney).toFixed(2)}%</td>
                <td><a href="#invest/borrowInfo">查看</a></td>
                </tr>
                `
            })

            $('#loan table tbody').html(str)

        }




    })













})