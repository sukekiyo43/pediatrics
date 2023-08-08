
jQuery(function ($) {

  // ページトップボタン
  var topBtn = $('.js-pagetop');
  topBtn.hide();

  // ページトップボタンの表示設定
  $(window).scroll(function () {
    if ($(this).scrollTop() > 70) {
      // 指定px以上のスクロールでボタンを表示
      topBtn.fadeIn();
    } else {
      // 画面が指定pxより上ならボタンを非表示
      topBtn.fadeOut();
    }
  });

  // ページトップボタンをクリックしたらスクロールして上に戻る
  topBtn.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 300, 'swing');
    return false;
  });

  // スムーススクロール (絶対パスのリンク先が現在のページであった場合でも作動。ヘッダーの高さ考慮。)
  $(document).on('click', 'a[href*="#"]', function () {
    let time = 400;
    let header = $('header').innerHeight();
    let target = $(this.hash);
    if (!target.length) return;
    let targetY = target.offset().top - header;
    $('html,body').animate({ scrollTop: targetY }, time, 'swing');
    return false;
  });


  //スクロール時、ヘッダーに影を付けるクラスの操作
  function handleScroll() {
    if ($(window).scrollTop() > 0) {
      $('.js-header').addClass('active');
    } else {
      $('.js-header').removeClass('active');
    }
  }

  $(window).on('scroll', handleScroll);
  $(document).ready(handleScroll);



  // スクロール時、要素をフェードで表示
  $(function () {
    $(".js-fadeUp").on("inview", function () {
      $(this).addClass("is-inview");
    });
  });



  // ハンバーガーメニュー開閉
  $('.js-hamburger').on('click', function () {
    $('.js-menu').fadeToggle();
    $(this).toggleClass('open');
    $('.js-body').toggleClass('open');
  });

  let resizeTimer;

  function checkWidth() {
    if ($(window).outerWidth(true) >= 768) {
      $('.js-hamburger').removeClass('open');
      $('.js-menu').removeAttr('style');
      $('.js-body').removeClass('open');
    }
  }

  $(window).on('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(checkWidth, 100);
  });

  $(window).on('load', checkWidth);


  // フォーム送信後、googleフォーム送信後の画面への遷移を防ぎ、サンキューおよびエラーメッセージ表示
  $(document).ready(function () {

    $('#mG61Hd').submit(function (event) {
      var formData = $('#mG61Hd').serialize();
      $.ajax({
        url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeuo1OoAp_MITd8yJp-fL1cek_akxbj2gnx-o5TmZYRLlT1LA/formResponse",
        data: formData,
        type: "POST",
        dataType: "xml",
        statusCode: {
          0: function () {
            $(".js-form-btn").fadeOut();
            $(".js-end-message").addClass('sent').slideDown();
          },
          200: function () {
            $(".js-false-message").addClass('sent').slideDown();
          }
        }
      });
      event.preventDefault();
    });
  });


  // お問い合わせフォームバリテーション必須項目を埋めるとボタンが送信可能になる
  const form = $("#mG61Hd");
  const button = $(".js-form-btn");
  button.eq(0).prop("disabled", true);

  form.on("input change", update);

  function update() {
    const isRequired = form[0].checkValidity();

    if (isRequired) {
      button.eq(0).prop("disabled", false);
    } else {
      button.eq(0).prop("disabled", true);
    }
  }









});