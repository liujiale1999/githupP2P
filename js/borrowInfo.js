$(function(){
    var borrowId = location.search.split('=')[1]
    var flag = true
    // console.log(borrowId);

    getBorrowDetail()
    function getBorrowDetail(){
        $.ajax({
            url:'http://139.9.177.51:3331/getborrowinfo.php',
            type:'get',
            dataType:'json',
            data:{
                borrowid:borrowId
            },
            success:function(data){
                console.log(data);
                // console.log(data.repaytype);
                
                //遍历对象
                for(const key in data){
                    $(`.${key}`).html(data[key])
                }
                $('b,.borrower').html(data.userid)
                $('.repaytype').html(data.repaytype == '0' ?'按月分期还款':'按月到期还款')
                var ratio = parseFloat(data.ownmoney*100/data.borrowmoney).toFixed(2)
                $('.progressBar').css('width',ratio+"%")
            }
        })
    }

    //投资
    $('.investBtn').click(function(){
        if(flag){
            //flag为false 禁止提交
            flag = false
            $.ajax({
                url:'http://139.9.177.51:3331/invest.php',
                type:'get',
                data:{
                    id: sessionStorage.getItem('userid'),
                    borrowid: location.search.split('=')[1],
                    chargemoney:$('.investMoney').val()
                },
                success:function(data){
                    //发送请求后  标杆为true 可以再次发送请求
                    flag = true
                    if(data == 'ok'){
                        alert('投资成功')
                        getBorrowDetail()
                        $('.investMoney').val('')
                    }else{
                        alert('投资失败')
                    }
                }
            })
        }
    })











})