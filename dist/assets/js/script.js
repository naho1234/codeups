"use strict";

window.addEventListener("load", function () {
  // ローディングアニメーションを表示
  $(".loader").fadeIn(600, function () {
    $(".text, .subText").fadeIn(300);
  });

  // ローディングアニメーションが終わったら
  setTimeout(function () {
    $(".loader").fadeOut(400, function () {
      $(this).remove();
      // 1枚目の右側の画像を元の位置に移動
      $(".mv-splide__slide:first .mv-img--right").animate({
        top: "0px",
        right: "0px"
      }, 800), $(".mv-splide__slide:first .mv-img--left").animate({
        top: "0px",
        left: "0px"
      }, 800);

      // Splideの初期化
      var mvSplide = new Splide(".mv-splide", {
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

      // Splideがマウントされたとき（初期化が完了したとき）にテキストをフェードイン
      mvSplide.on("mounted", function () {
        $(".mv-splide__slide.is-active .text, .mv-splide__slide.is-active .subText").delay(1000).fadeIn(400);
      });

      // Splideのイベントリスナー
      mvSplide.on("active", function (slide) {
        $(slide.slide).find(".text, .subText").hide().delay(1000).fadeIn(400);
      });
      var campaignSplide = new Splide(".campaign-splide", {
        type: "slide",
        arrows: true,
        pagination: false,
        autoplay: true,
        rewind: true,
        start: 0,
        drag: true
      });
      mvSplide.mount();
      campaignSplide.mount();
    });
  }, 5000);
});
jQuery(function ($) {
  //ナビバートグル
  $(".js-hamburger").on("click", function () {
    if ($(".js-hamburger").hasClass("is-open")) {
      $("body").removeClass("no-scroll");
      $(".js-drawer-menu").removeClass("is-open");
      $(this).removeClass("is-open");
    } else {
      $("body").addClass("no-scroll");
      $(".js-drawer-menu").addClass("is-open");
      $(this).addClass("is-open");
    }
  });
});