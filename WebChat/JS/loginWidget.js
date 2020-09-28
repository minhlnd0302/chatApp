$(function () {
    $.widget("custom.loginWidget", {
        options: {},
        _create: function () {

            this.div_cont = $('<div>', { class: 'cont' }).appendTo(this.element);

            this.div_form_signIn = $('<div>', { class: 'form sign-in' }).appendTo(this.div_cont);

            this.h2_signIn = $('<h2>', { text: "Sign In" }).appendTo(this.div_form_signIn);
            this.lable1 = $('<label>').appendTo(this.div_form_signIn);

            this.span_userName = $('<span>', { text: "User Name" }).appendTo(this.lable1);
            this.span_or = $('<span>', { text: ' or ', id: 'or' }).appendTo(this.lable1)
            this.span_Email = $('<span>', { text: "Email" }).appendTo(this.lable1);
            this.in_userName = $('<input>', { type: 'text', name: 'email', id: 'signIn_userName' }).appendTo(this.lable1);

            this.lable2 = $('<label>').appendTo(this.div_form_signIn);
            this.span_passWord = $('<span>', { text: 'Password' }).appendTo(this.lable2);
            this.in_password = $('<input>', { type: 'password', name: 'password', id: 'signIn_password' }).appendTo(this.lable2);

            this.submit_signIn = $('<button>', { class: 'submit', type: 'button', id: 'submitIn', text: 'Sign In' }).appendTo(this.div_form_signIn);


            this.p_forgotPass = $('<p>', { class: 'forgot-pass', text: 'Forgot Password ?' }).appendTo(this.div_form_signIn);

            this.div_socialMedia = $('<div>', { class: 'social-media' }).appendTo(this.div_form_signIn);

            this.ul_media = $('<ul>').appendTo(this.div_socialMedia);

            this.li1 = $('<li>').appendTo(this.ul_media); 
   
            this.imgFaceBook = $('<img>', { 'src': '../images/facebook.png', 'alt': 'FaceBook' }).appendTo(this.li1);
            this.imgFaceBook.click(function () {
                self._loginFacebook()
            });


            this.li2 = $('<li>').appendTo(this.ul_media);
            this.imgGooglePlus = $('<img>', { 'src': '../images/google-plus.png', 'alt': 'Google Plus' }).appendTo(this.li2);

            this.li3 = $('<li>').appendTo(this.ul_media);
            this.imgtwiter = $('<img>', { 'src': '../images/twitter.png', 'alt': 'twitter' }).appendTo(this.li3);

            this.li4 = $('<li>').appendTo(this.ul_media);
            this.imglinkedin = $('<img>', { 'src': '../images/google-plus.png', 'alt': 'linkedin' }).appendTo(this.li4);

            this.div_sub_cont = $('<div>', { class: 'sub-cont' }).appendTo(this.div_cont);

            this.div_img = $('<div>', { class: 'img' }).appendTo(this.div_sub_cont);

            this.div_imgtext_mup = $('<div>', { class: 'img-text m-up' }).appendTo(this.div_img);
            this.h2_newHere = $('<h2>', { text: 'New here ?' }).appendTo(this.div_imgtext_mup);
            this.p_signUp = $('<p>', { text: 'Sign up and discover great amount of new opportunities !' }).appendTo(this.div_imgtext_mup);

            this.div_imgtext_min = $('<div>', { class: 'img-text m-in' }).appendTo(this.div_img);
            this.h2_oneOfUs = $('<h2>', { text: 'One of us ?' }).appendTo(this.div_imgtext_min);
            this.p_ifYou = $('<p>', { text: "If you already has an account, just sign in. We've missed you!" }).appendTo(this.div_imgtext_min);

            this.div_imgBtn = $('<div>', { class: 'img-btn' }).appendTo(this.div_img);
            this.span_mup = $('<span>', { class: 'm-up', text: 'Sign Up' }).appendTo(this.div_imgBtn);
            this.span_min = $('<span>', { class: 'm-in', text: 'Sign In' }).appendTo(this.div_imgBtn);

            this.div_form_signUp = $('<div>', { class: 'form sign-up' }).appendTo(this.div_sub_cont);

            this.h2_signUp = $('<h2>', { text: 'Sign Up' }).appendTo(this.div_form_signUp);

            this.lable3 = $('<label>').appendTo(this.div_form_signUp);
            this.span_userName_up = $('<span>', { text: 'User name' }).appendTo(this.lable3);
            this.input_userName = $('<input>', { type: 'text', id: 'signUp_userName' }).appendTo(this.lable3);

            this.lable4 = $('<label>').appendTo(this.div_form_signUp);
            this.span_passWord_up = $('<span>', { text: 'Password' }).appendTo(this.lable4);
            this.input_password = $('<input>', { type: 'password', id: 'signUp_password' }).appendTo(this.lable4);

            this.lable5 = $('<label>').appendTo(this.div_form_signUp);
            this.span_confirmPassword = $('<span>', { text: 'Confirm Password' }).appendTo(this.lable5)
            this.input_confirmPassword = $('<input>', { type: 'password', id: 'signUp_confirmPassword' }).appendTo(this.lable5);

            this.lable6 = $('<label>').appendTo(this.div_form_signUp);
            this.span_fullName = $('<span>', { text: 'Full Name' }).appendTo(this.lable6);
            this.input_fullName = $('<input>', { type: 'text', id: 'signUp_fullName' }).appendTo(this.lable6);

            this.lable9 = $('<label>').appendTo(this.div_form_signUp);
            this.span_birthday = $('<span>', { text: 'Birthday' }).appendTo(this.lable9);
            this.input_phone = $('<input>', { type: 'date', id: 'signUp_birthday' }).appendTo(this.lable9);

            this.lable7 = $('<label>').appendTo(this.div_form_signUp);
            this.span_email = $('<span>', { text: 'Email' }).appendTo(this.lable7);
            this.input_email = $('<input>', { type: 'email', id: 'signUp_email' }).appendTo(this.lable7);

            this.lable8 = $('<label>').appendTo(this.div_form_signUp);
            this.span_phone = $('<span>', { text: 'Phone' }).appendTo(this.lable8);
            this.input_phone = $('<input>', { type: 'text', id: 'signUp_phone' }).appendTo(this.lable8);

            this.submit_signUp = $('<button>', { class: 'submit', id: 'submitUp', text: 'Sign Up Now' }).appendTo(this.div_form_signUp)

            var self = this;

            // chuyen signUp and signUp
            this.div_imgBtn.click(function () {
                self.div_cont.toggleClass('s-signup');
                getUserNameList();
                self.submit_signUp.click(self._signUp)
            });
            this.submit_signIn.click(self._login);
        },
        _login: function () {

            var isRunning = false;
            if (!isRunning) {
                isRunning = true;

                var userName = $('#signIn_userName').val();
                var password = $('#signIn_password').val();

                if (userName === '' || password === '') {
                    alert("Vui lòng nhập tài khoản và mật khẩu");
                    isRunning = false
                }
                else {
                    var postUrl_login = "/Login/CheckLogin";
                    var data_login = {
                        userName: userName,
                        password: password,
                    }
                    request(postUrl_login, data_login).then(res => {
                        console.log(res.Data);
                        if (res.Data.status != 'OK') {
                            alert("Sai tên đăng nhập hoặc mật khẩu");
                        }
                        else {
                            sessionStorage.setItem('currentUserId', res.Data.userId);
                            window.location = '/Home/HomeIndex';
                        }
                    })
                }
            }
        },
        _signUp: function () {
            var userName = $('#signUp_userName').val();
            var passWord = $('#signUp_password').val();
            var confirmPassword = $('#signUp_confirmPassword').val();
            var fullName = $('#signUp_fullName').val();
            var birthday = $('#signUp_birthday').val();
            var email = $('#signUp_email').val();
            var phone = $('#signUp_phone').val();

            debugger
            if (userName === '' || passWord == '') {
                $('#signUp_userName').addClass('error');
                alert('Tên đăng nhập và mật khẩu không được để trống');
                return;
            }
            else if (passWord !== confirmPassword) {
                alert("Mật khẩu không trùng nhau")
                return;
            }
            else if (!checkEmail(email)) {
                alert("Email vừa nhập không hợp lệ !")
                return;
            }
            else if (phone !== '') {
                if (!checkPhone(phone)) {
                    alert("Số điện thoại vừa nhập không hợp lệ !")
                    return;
                }
            }
            var userinfo = new userInfo(userName, passWord, fullName, birthday, email, phone);

            urlPost_createAccount = "/SignUp/CreateAccount";

            request(urlPost_createAccount, userinfo).then(response => {
                if (response.Data.status !== 'F') {
                    alert("Tạo tài khoản thành công !")
                    //Window.location ='Login/Index'
                    location.reload();
                }
                else {
                    alert("Đã xảy ra lỗi ! Vui lòng thử lại !")
                }
                console.log(response);
            })
        },
        _loginFacebook: function () {
            console.log("ok log")
            $.post("/Login/LoginFacebook");
        }
    });
})
function getUserNameList() {
    request("/SignUp/SelectUserName").then(response => {
        sessionStorage.setItem('UserNameList', JSON.stringify(response.Data.usernameList));
    })
}
function checkPhone(phone) {
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (vnf_regex.test(phone) == false) return false
    else return true;

}

function checkEmail(email) {
    var emailformat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailformat.test(email) == false) return false
    else return true;

};

function refreshSessionStorage() {
    sessionStorage.setItem('frienId', 0);
    sessionStorage.setItem('roomId', 0);
    //sessionStorage.removeItem('idMess');
}

function userInfo(userName, passWord, fullName, birthday, email, phone) {
    this.userName = userName;
    this.passWord = passWord;
    //this.confirmPassword = confirmPassword;
    this.fullName = fullName;
    this.birthday = birthday;
    this.email = email;
    this.phone = phone;
}  