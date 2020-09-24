function checkWidth() {
  windowSize = $(window).width();
}

$(document).ready(function(){

  checkWidth();
  $(window).resize(checkWidth);


  if (windowSize > 950) {
    $('.about p').mouseenter(function() {
       $( this ).stop().animate({letterSpacing: '5px' }, 2000);
    });
    $('.about p').mouseleave(function() {
       $( this ).stop().animate({letterSpacing: '0px' }, 200);
    });
  }

  $('#infoButton').click(function(){
    $('html, body').animate({scrollTop: ($('.about').offset().top)},1000);
  })

  $('#laClose, #three-wrapper').click(function(){
    $('#Arrows').fadeOut(200);
    $('#infoButton').fadeIn(200);
  })


});
