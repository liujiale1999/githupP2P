$(function () {
    var type = location.search.split('=')[1] 

    var btnClass = null
    var btnText = null

    switch (type) {
        case '1':
            btnClass = 'btn-success'
            btnText = '信用标'
            break;
        case '2':
            btnClass = 'btn-warning'
            btnText = '车易标'
            break;
        case '3':
            btnClass = 'btn-primary'
            btnText = '房易标'
            break;
    }

    $('.borrowType').html(btnText).addClass(btnClass)

    $('#btn').click(function(){
        $.ajax({
            url:'http://139.9.177.51:3331/borrow.php',
            type:'get',
            data:{  
                acc:sessionStorage.getItem('username'),
                borrowmoney:$('#borrowmoney').val(),
                interest:$('#interest').val(),
                borrowtime:$('#borrowtime>option:selected').val(),
                repaytype:$('#repaytype:checked').val(),
                minbid:$('#minbid').val(),
                bouns:$('#bouns').val(),
                days:$('#days>option:selected').val(),
                title:$('#title').val(),
                info:$('#info').val(),

            },
            success:function(data){
                if(data == 'ok'){
                    alert('申请成功')
                    location.href = '/index.html'
                }else{
                    alert('申请失败')

                }
            }



        })
    })













})