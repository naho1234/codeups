"use strict";

window.addEventListener("load", function () {
  // ローディングアニメーションを表示
  $(".js-loader").fadeIn(600, function () {
    $(".main-title__text, .main-title__sub-text").fadeIn(300);
  });

  // ローディングアニメーションが終わったら
  setTimeout(function () {
    $(".js-loader").fadeOut(400, function () {
      $(this).remove();
      // 1枚目の右側の画像を元の位置に移動
      $(".mv__splide-slide:first .mv__img--right").animate({
        top: "0px",
        right: "0px"
      }, 800), $(".mv__splide-slide:first .mv__img--left").animate({
        top: "0px",
        left: "0px"
      }, 800);

      // Splideの初期化
      var mvSplide = new Splide(".js-mv-splide", {
        type: "fade",
        rewind: true,
        autoplay: true,
        interval: 7000,
        pauseOnHover: false,
        pauseOnFocus: false,
        arrows: false,
        pagination: false,
        drag: false
      });
      var campaignSplide = new Splide(".js-campaign-splide", {
        type: "loop",
        arrows: true,
        pagination: false,
        perPage: 1,
        perMove: 1,
        autoplay: true,
        rewind: false,
        // ここをfalseに変更
        start: 0,
        drag: true,
        gap: 40,
        fixedWidth: "333px",
        focus: 0,
        breakpoints: {
          767: {
            gap: 24,
            fixedWidth: "280px"
          }
        }
      });
      mvSplide.mount();
      campaignSplide.mount();
    });
  }, 2000);

  //要素の取得とスピードの設定
  var box = $(".js-color"),
    speed = 700;

  //.colorboxの付いた全ての要素に対して下記の処理を行う
  box.each(function () {
    $(this).append('<div class="color"></div>');
    var color = $(this).find($(".color")),
      image = $(this).find("img");
    var counter = 0;
    image.css("opacity", "0");
    color.css("width", "0%");
    //inviewを使って背景色が画面に現れたら処理をする
    color.on("inview", function () {
      if (counter == 0) {
        $(this).delay(200).animate({
          width: "100%"
        }, speed, function () {
          image.css("opacity", "1");
          $(this).css({
            left: "0",
            right: "auto"
          });
          $(this).animate({
            width: "0%"
          }, speed);
        });
        counter = 1;
      }
    });
  });
});
jQuery(function ($) {
  // ハンバーガーメニュー
  $(".js-hamburger").click(function () {
    $(this).toggleClass("is-open");
    $(".js-drawer-menu,.js-drawer-menu a,body,.header").toggleClass("is-open");
  });
  $(".js-drawer-menu a").click(function () {
    $(".js-hamburger,.js-drawer-menu,body,.header").removeClass("is-open");
  });

  // ページ内スクロール
  // ヘッダーの高さ取得
  var headerHeight = $(".js-header").height();
  $('a[href^="#"]').click(function () {
    var speed = 600;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);
    // ヘッダーの高さ分下げる
    var position = target.offset().top - headerHeight;
    $("body,html").animate({
      scrollTop: position
    }, speed, "swing");
    return false;
  });

  //page-top
  function PageTopAnime() {
    var scroll = $(window).scrollTop();
    if (scroll >= 200) {
      $("#page-top").removeClass("DownMove");
      $("#page-top").addClass("UpMove");
    } else {
      if ($("#page-top").hasClass("UpMove")) {
        $("#page-top").removeClass("UpMove");
        $("#page-top").addClass("DownMove");
      }
    }
    var wH = window.innerHeight;
    var footerPos = $(".footer").offset().top;
    if (scroll + wH >= footerPos + 10) {
      var pos = scroll + wH - footerPos + 10;
      $("#page-top").css("bottom", pos);
    } else {
      if ($("#page-top").hasClass("UpMove")) {
        $("#page-top").css("bottom", "16px");
      }
    }
  }
  $(window).scroll(function () {
    PageTopAnime();
  });
  $(window).on("load", function () {
    PageTopAnime();
  });
  $("#page-top").click(function () {
    $("body,html").animate({
      scrollTop: 0
    }, 500);
    return false;
  });
});