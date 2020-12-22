(function($) { // LOGIN BUTTON CLICK

    var input = $('.validate-input .input100');
    $('.validate-form').on('submit', function() {

        var check = true;
        var response;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) { // inputları kontrol et
                showValidate(input[i]);
                check = false;
             }
        }
        if(check==true) {
            //const axios = require('axios').default;
            var kullaniciAdi = $(input[0]).val(); // kullanici adi
            var sifre = $(input[1]).val(); // sifre

            const endPoint = "http://localhost:8081/projeyonetim/kullaniciLogin?kullaniciAdi="+kullaniciAdi+"&sifre="+sifre;
            axios({
                method: 'post',
                url: endPoint
            }).then(function (response) {
                kullaniciYonlendir(response.data.kullanici);
            });
        }
        return check;
    });


    $('.validate-form .input100').each(function() {
        $(this).focus(function() {
            hideValidate(this);
        });
    });
    
    // SAYFAYI YONLENDIR
    function kullaniciYonlendir(input) {
        var rolId = input.rol.id;
        var kullaniciId = input.id;
        var adSoyad = input.adSoyad;
        if(rolId == 2){
            window.location.href = 'proje_tablo/user_page_ogrenci.html?kullaniciId='+kullaniciId;
        }
        if(rolId == 1){
            window.location.href = 'proje_tablo/user_page_ogretmen.html?kullaniciId='+kullaniciId;
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
