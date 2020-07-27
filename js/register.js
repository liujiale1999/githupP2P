$(function () {

    //用户名
    $('#username').change(userValidate)

    function userValidate() {
        var val = $('#username').val()
        var reg = /^[a-zA-Z0-9_-]{4,16}$/;
        var flag = false
        if (reg.test(val)) {

            //发送ajax请求
            $.ajax({
                url: 'http://139.9.177.51:3331/accrepeat.php',
                type: 'get',
                data: {
                    username: val
                },
                async: false,
                success: function (data) {
                    if (data == 'ok') {
                        flag = true
                        $('#username').css('borderColor', 'green')
                        $('.usernameMsg').removeClass('active')
                    } else {
                        flag = false
                        $('.usernameMsg').html('用户名已被注册').addClass('active')
                        $('#username').css('borderColor', 'red')
                    }
                }
            })

        } else {
            flag = false
            $('.usernameMsg').addClass('active')
            $('#username').css('borderColor', 'red')

        }
        //返回flag的值
        return flag
    }

    //密码
    $('#pwd').change(pwdValidate)

    function pwdValidate() {
        var val = $('#pwd').val()
        var reg = /^[a-zA-Z0-9_-]{4,16}$/;
        var flag = false
        if (reg.test(val)) {
            flag = true
            $('#pwd').css('borderColor', 'green')
            $('.pwdMsg').removeClass('active')
        } else {
            flag = false
            $('.pwdMsg').addClass('active')
            $('#pwd').css('borderColor', 'red')
        }
        //返回flag的值
        return flag
    }

    //确认密码
    $("#confirmPwd").change(confirmPwdValidata)

    function confirmPwdValidata() {
        var val = $('#confirmPwd').val()
        var flag = false
        if ($('#pwd').val() === val) {
            flag = true
            $('#confirmPwd').css('borderColor', 'green')
            $('.confirmPwdMsg').removeClass('active')
        } else {
            flag = false
            $('.confirmPwdMsg').addClass('active')
            $('#confirmPwd').css('borderColor', 'red')
        }
        //返回flag的值
        return flag
    }

    //邮箱
    $('#email').change(emailValidata)

    function emailValidata() {
        var val = $('#email').val()
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
        var flag = false
        if (reg.test(val)) {
            flag = true
            $('#email').css('borderColor', 'green')
            $('.emailMsg').removeClass('active')
        } else {
            flag = false
            $('.emailMsg').addClass('active')
            $('#email').css('borderColor', 'red')
        }
        return flag
    }


    //昵称验证
    $('#nickname').change(nicknameValidata)

    function nicknameValidata() {
        var val = $('#nickname').val()
        var reg = /^[a-zA-Z0-9_-]{4,16}$/
        var flag = false
        if (reg.test(val)) {
            flag = true
            $('#nickname').css('borderColor', 'green')
            $('.nicknameMsg').removeClass('active')
        } else {
            flag = false
            $('.nicknameMsg').addClass('active')
            $('#nickname').css('borderColor', 'red')

        }
        return flag
    }

    //提交
    $('#btn').click(function () {
        if (userValidate() && pwdValidate() && confirmPwdValidata() && emailValidata() && nicknameValidata()) {
            $.ajax({
                url: 'http://139.9.177.51:3331/reg.php',
                type: 'post',
                data: {
                    username: $('#username').val(),
                    pwd: $('#pwd').val(),
                    email: $('#email').val(),
                    nickname: $('#nickname').val()
                },
                success: function (data) {
                    if (data == 'ok') {
                        alert('注册成功')
                        location.href = '/login.html'
                    } else {
                        alert('请重新填写注册信息')

                    }
                }
            })

        } else {
            alert('请重新填写注册信息')
        }


    })





















})