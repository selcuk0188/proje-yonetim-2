(function($) { // LOGIN BUTTON CLICK

    var input = $('.validate-input .input100');
    $('.validate-form').on('submit', function(e) {

        var check = true;
        var response;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) { // inputları kontrol et
                showValidate(input[i]);
                return false;
             }
        }
            //const axios = require('axios').default;
            var tckn = $(input[0]).val(); // tckn
            var sifre = $(input[1]).val(); // sifre

            const endPoint = "http://ec2-35-156-64-230.eu-central-1.compute.amazonaws.com:8081/projeyonetim/kullaniciLogin?tckn="+tckn+"&sifre="+sifre;
        e.preventDefault();
        $.when(
            axios({
                method: 'post',
                url: endPoint
            }).then(function (response) {
                kullaniciYonlendir(response.data);
            })
        )

        //return check;
    });


    $('.validate-form .input100').each(function() {
        $(this).focus(function() {
            hideValidate(this);
        });
    });
    
    // SAYFAYI YONLENDIR
    function kullaniciYonlendir(input) {
        var basariliMi = input.basariliMi;
        if(basariliMi!=true){
            alert("Kullanıcı adı veya şifre yanlış!");
        }
        else {
            var rolId = input.kullanici.rolId;
            var kullaniciId = input.kullanici.id;
            var adSoyad = input.kullanici.adSoyad;
            if (rolId == 1) {
                window.location.href = 'proje_tablo/user_page_ogrenci.html?kullaniciId=' + kullaniciId;
            } else if (rolId == 2) {
                window.location.href = 'proje_tablo/user_page_ogretmen.html?kullaniciId=' + kullaniciId;
            } else if (rolId == 3) {
                window.location.href = 'proje_tablo/user_page_admin.html?kullaniciId=' + kullaniciId;
            }
        }
    }
    
    
    // INPUTU KONTROL ET
    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        } else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    var showPass = 0;
    $('.btn-show-pass').on('click', function() {
        if (showPass == 0) {
            $(this).next('input').attr('type', 'text');
            $(this).addClass('active');
            showPass = 1;
        } else {
            $(this).next('input').attr('type', 'password');
            $(this).removeClass('active');
            showPass = 0;
        }

    });


})(jQuery);
