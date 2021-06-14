// マウスカーソル
var cursor = $('.p-cursor'),
  follower = $('.p-cursor__follower'),
  cWidth = 6, //カーソルの大きさ
  fWidth = 40, //フォロワーの大きさ
  delay = 10, //数字を大きくするとフォロワーがより遅れて来る
  mouseX = 0, //マウスのX座標
  mouseY = 0, //マウスのY座標
  posX = 0, //フォロワーのX座標
  posY = 0; //フォロワーのX座標

//カーソルの遅延アニメーション
//ほんの少ーーーしだけ遅延させる 0.001秒
TweenMax.to({}, 0.001, {
  repeat: -1,
  onRepeat: function () {
    posX += (mouseX - posX) / delay;
    posY += (mouseY - posY) / delay;

    TweenMax.set(follower, {
      css: {
        left: posX - fWidth / 2,
        top: posY - fWidth / 2,
      },
    });

    TweenMax.set(cursor, {
      css: {
        left: mouseX - cWidth / 2,
        top: mouseY - cWidth / 2,
      },
    });
  },
});

//マウス座標を取得
$(document).on('mousemove', function (e) {
  mouseX = e.pageX;
  mouseY = e.pageY;
});

$('a').on({
  mouseenter: function () {
    cursor.addClass('is-active');
    follower.addClass('is-active');
  },
  mouseleave: function () {
    cursor.removeClass('is-active');
    follower.removeClass('is-active');
  },
});

// スムーススクロールの設定
$(function () {
  // #で始まるアンカーをクリックした場合に処理
  $('a[href^="#"]')
    .not('.class')
    .not('#js-tab-menu a')
    .click(function () {
      // スクロールの速度
      var speed = 200; // ミリ秒
      // アンカーの値取得
      var href = $(this).attr('href');
      // 移動先を取得
      var target = $(href == '#' || href == '' ? 'html' : href);
      // 移動先を数値で取得
      var position = target.offset().top - 100;
      // スムーススクロール
      $('body,html').animate({ scrollTop: position }, speed, 'swing');
      return false;
    });
});

// 360px以下のviewportの設定
!(function () {
  const viewport = document.querySelector('meta[name="viewport"]');
  function switchViewport() {
    const value =
      window.outerWidth > 360
        ? 'width=device-width,initial-scale=1'
        : 'width=360';
    if (viewport.getAttribute('content') !== value) {
      viewport.setAttribute('content', value);
    }
  }
  addEventListener('resize', switchViewport, false);
  switchViewport();
})();

// humburger menu 開閉
$(
  (function () {
    $('#js-hamburger__toggle').on('click', function () {
      $('#js-hamburger__toggle').toggleClass('is-active');
      $('.l-spMenu').toggleClass('is-active');
      $('.l-header').toggleClass('is-active');
    });
  })()
);

// spMenu 開閉
$(
  (function () {
    $('.l-spMenu__closeToggle').on('click', function () {
      $('#js-hamburger__toggle').toggleClass('is-active');
      $('.l-hamburger__toggleSpan').toggleClass('is-preparation');
      $('.l-hamburger__toggleSpan').toggleClass('is-active');
      $('.l-spMenu').toggleClass('is-active');
    });
  })()
);

// メニュー外をクリックした後にメニューを閉じる
$(document).click(function () {
  $('.l-spMenu').removeClass('is-active');
  $('#js-hamburger__toggle').removeClass('is-active');
  $('.l-header').removeClass('is-active');
});

// メニューの内部リンククリック後にメニューを閉じる
$(
  (function () {
    $('.l-spMenu__navLink').on('click', function () {
      $('.l-spMenu').removeClass('is-active');
      $('#js-hamburger__toggle').removeClass('is-active');
      $('.l-header').removeClass('is-active');
    });
  })()
);

// mvh(メインヴィジュアル)を超えるとヘッダーの背景色変更
var mvh = $('.p-home__mv').height();

$(window).scroll(function () {
  var top = $(window).scrollTop();
  if (mvh < top) {
    $('.l-header').css('box-shadow', '0 8px 15px 0 rgba(0, 0, 0, 0.16)');
  } else {
    $('.l-header').css('box-shadow', 'none');
  }

  if (window.matchMedia('(max-width: 1024px)').matches) {
    /* ウィンドウサイズが 1024px以下の場合のコードをここに */
    $('#js-header__logoWrap__fixed').css('display', 'none');
    $('.l-header').css('top', '0%');
    $('.l-header').css('width', '100%');
    $('#js-header__logoWrap__fixed').css('width', '0%');
    $('#js-header__logoWrap__fixed').css('margin-left', '0px');
  } else {
    /* ウィンドウサイズが 1024px以上の場合のコードをここに */
    if (mvh < top) {
      $('#js-header__logoWrap__fixed').css('opacity', '1');
    } else {
      $('#js-header__logoWrap__fixed').css('opacity', '0');
    }
    if (mvh < top) {
      $('#js-header__logoWrap__fixed').css('width', '100%');
    } else {
      $('#js-header__logoWrap__fixed').css('width', '0%');
    }
    if (mvh < top) {
      $('#js-header__logoWrap__fixed').css('margin-left', '23px');
    } else {
      $('#js-header__logoWrap__fixed').css('margin-left', '0px');
    }
    if (mvh < top) {
      $('.l-header').css('top', '0%');
    } else {
      $('.l-header').css('top', '40px');
    }
    if (mvh < top) {
      $('.l-header').css('width', '100%');
    } else {
      $('.l-header').css('width', '880px');
    }
  }
});

$(function () {
  $('a.disable').click(function () {
    return false;
  });
});

// ローディングアニメーション
$(window).on('load', function () {
  //=====ここからローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる
  $('#p-loading')
    .delay(1000)
    .fadeOut('slow', function () {
      //ローディングエリア（splashエリア）を1.5秒でフェードアウトする記述

      $('body').addClass('appear'); //フェードアウト後bodyにappearクラス付与
    });
  //=====ここまでローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる

  //=====ここから背景が伸びた後に動かしたいJSをまとめたい場合は
  $('.p-loading__bg').on('animationend', function () {
    //この中に動かしたいJSを記載
  });
  //=====ここまで背景が伸びた後に動かしたいJSをまとめる
});

// モーダルウィンドウ開閉
// ウィンドウを開く
$('.js-modal-open').each(function () {
  $(this).on('click', function () {
    var target = $(this).data('target');
    var modal = document.getElementById(target);
    $(modal).fadeIn(300);
    return false;
  });
});

// ウィンドウを閉じる
$('.js-modal-close').on('click', function () {
  $('.c-modal').fadeOut(300);
  return false;
});

// slick01(メインヴィジュアル)設定
$(function () {
  $('.e-slick01').slick({
    fade: true,
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnFocus: false,
    pauseOnHover: false,
    centerMode: true,
    centerPadding: '0%',
  });
});

// slick01の数字表示
$('.e-slick01').on(
  'init reInit afterChange',
  function (event, slick, currentSlide, nextSlide) {
    var i = (currentSlide ? currentSlide : 0) + 1;
    $('.p-slick__number .p-slick__number__now-count')
      .text('0' + i)
      .slice(-1);
    $('.p-slick__number .p-slick__number__all-count')
      .text('0' + slick.slideCount)
      .slice(-1);
  }
);

// slick02(サービス一覧)の設定
$(function () {
  function sliderSetting() {
    var width = $(window).width();

    // if (width <= 768) {
    //768px以上はスライダー表示
    $('.e-slick02')
      .not('.slick-initialized')
      .slick({
        variableWidth: true,
        dots: false,
        arrows: true,
        autoplay: false,
        centerMode: false,
        centerPadding: '0%',
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              centerPadding: '11.2%',
            },
          },
        ],
      });
    // } else {
    //   $('.slide.slick-initialized').slick('.unslick');
    // }
  }

  sliderSetting();

  $(window).resize(function () {
    sliderSetting();
  });
});

// slick03(CASE一覧)設定
$(function () {
  $('.e-slick03').slick({
    autoplay: true, //自動でスクロール
    autoplaySpeed: 0, //自動再生のスライド切り替えまでの時間を設定
    speed: 5000, //スライドが流れる速度を設定
    cssEase: 'linear', //スライドの流れ方を等速に設定
    slidesToShow: 8, //表示するスライドの数
    swipe: false, // 操作による切り替えはさせない
    arrows: false, //矢印非表示
    pauseOnFocus: false, //スライダーをフォーカスした時にスライドを停止させるか
    pauseOnHover: false, //スライダーにマウスホバーした時にスライドを停止させるか
    rtl: true, //スライダーを左から右に流す（逆向き）
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4, //画面幅768px以下でスライド4枚表示
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3, //画面幅640px以下でスライド3枚表示
        },
      },
    ],
  });
});

// FAQ sectionのタブ切り替え
$('#js-tab-menu li a').on('click', function () {
  $('#js-tab-box div').hide();
  $($(this).attr('href')).fadeToggle();
  return false;
});

// よくある質問のタブ切り替え
function GethashID(hashIDName) {
  if (hashIDName) {
    //タブ設定
    $('.c-listFaq__menuWrap li')
      .find('a')
      .each(function () {
        //タブ内のaタグ全てを取得
        var idName = $(this).attr('href'); //タブ内のaタグのリンク名（例）#lunchの値を取得
        if (idName == hashIDName) {
          //リンク元の指定されたURLのハッシュタグ（例）http://example.com/#lunch←この#の値とタブ内のリンク名（例）#lunchが同じかをチェック
          var parentElm = $(this).parent(); //タブ内のaタグの親要素（li）を取得
          $('.c-listFaq__menuWrap li').removeClass('is-active'); //タブ内のliについているactiveクラスを取り除き
          $(parentElm).addClass('is-active'); //リンク元の指定されたURLのハッシュタグとタブ内のリンク名が同じであれば、liにactiveクラスを追加
          //表示させるエリア設定
          $('.c-listFaq__faqBox').removeClass('is-active'); //もともとついているis-activeクラスを取り除き
          $(hashIDName).addClass('is-active'); //表示させたいエリアのタブリンク名をクリックしたら、表示エリアにis-activeクラスを追加
        }
      });
  }
}

//タブをクリックしたら
$('.c-listFaq__menuWrap a').on('click', function () {
  var idName = $(this).attr('href'); //タブ内のリンク名を取得
  GethashID(idName); //設定したタブの読み込みと
  return false; //aタグを無効にする
});

// 上記の動きをページが読み込まれたらすぐに動かす
$(window).on('load', function () {
  $('.c-listFaq__menuWrap li:first-of-type').addClass('is-active'); //最初のliにactiveクラスを追加
  $('.c-listFaq__menuWrap:first-of-type').addClass('is-active'); //最初の.areaにis-activeクラスを追加
  var hashName = location.hash; //リンク元の指定されたURLのハッシュタグを取得
  GethashID(hashName); //設定したタブの読み込み
});

// luxy.jsのレスポンシブ対応
if (window.matchMedia('(max-width: 768px)').matches) {
  /* ウィンドウサイズが 768px以下の場合のコードをここに */
  // $('.luxy').removeAttr('id', 'luxy');
} else {
  /* ウィンドウサイズが 768px以上の場合のコードをここに */
  $('.luxy').attr('id', 'luxy');
}
