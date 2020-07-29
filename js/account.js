$(function () {
    $('.Recharge').click(function () {
        location.href = '/pages/recharge.html'
    })

    getAccountInfo()

    //封装函数渲染页面
    function getAccountInfo() {
        $.ajax({
            url: 'http://139.9.177.51:3331/getuserinfo.php',
            type: 'get',
            data: {
                id: sessionStorage.getItem('userid')
            },
            dataType: 'json',
            success: function (data) {
                //变量对象
                for (const key in data) {

                    $(`#${key}`).html(data[key])
                }
            }
        })
    }


    $('#modifyUserInfo').click(function(){
        $.ajax({
            url:'http://139.9.177.51:3331/updateuser.php',
            type:'get',
            data:{
                id:sessionStorage.getItem('userid'),
                nickname:$('#newNickname').val(),
                email:$('#newEmail').val()
            },
            success:function(data){
                if(data == 'ok'){
                    //修改成功渲染页面
                    getAccountInfo()
                    //弹出提示信息
                    alert('修改成功')
                    //隐藏模态框
                    $('#exampleModal').modal("hide")
                }else{
                    alert('修改失败')
                }
                
            }
        })
    })








})