function checkWidth() {
  windowSize = $(window).width();
}

$(document).ready(function(){

  checkWidth();
  $(window).resize(checkWidth);

  $('.tracklist-button').click(function(){
    $(this).parent().prev('.box-li').find('.flip-box').toggleClass('active');
  })

  $('.mix-scaler').click(function(){
    var button = $(this).find('.mix-opener');

    if ($(this).siblings('.mix-content-wrapper').length) {
      if (!$(this).hasClass('active')) {
        $(this).siblings('.mix-content-wrapper').slideToggle(400);
        $(button).html('&uarr;');
        $(this).addClass('active');
       } else {
         $(button).html('&darr;');
         $(this).removeClass('active');
         $(this).siblings('.mix-content-wrapper').slideToggle(400);
       };
    } 
  });

  if (windowSize > 950) {
    $('.about p, .map-wrapper p').mouseenter(function() {
       $( this ).stop().animate({letterSpacing: '5px' }, 2000);
    });
    $('.about p, .map-wrapper p').mouseleave(function() {
       $( this ).stop().animate({letterSpacing: '0px' }, 200);
    });
    $('.square-wrapper').hover(function(){
      $(this).children('.artwork').fadeToggle(400);
    })
  }

  $('#enterButton').click(function(){
    $('html, body').animate({scrollTop: ($('.about').offset().top)},1000);
  })

  $('#laClose, #three-wrapper').click(function(){
    $('#lookAround').fadeOut(200);
    $('#enterButton').fadeIn(200);
  })


});
