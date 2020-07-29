$(function(){

    $('#btn').click(function(){
        //获取用户名 和 密码
        var user = $('#username').val()
        var Pwd = $('#pwd').val()

        $.ajax({
            url:'http://139.9.177.51:3331/login.php',
            type:'post',
            data:{
                username:user,
                pwd:Pwd
            },
            success:function(data){
                if(data != 'fail'){
                    sessionStorage.setItem('username',user)
                    sessionStorage.setItem('userid',data)
                    alert('登录成功')
                    location.href = '/index.html'
                }else{
                    alert('登录失败')
                }
            }
        })


    })  

    


















})