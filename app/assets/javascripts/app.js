var $display;
var index_of_digit;
var flight_id;
var flight_data;
var seriesIndex = 0;
var pause;
var playSpeed;

var resizeContainer = function(){
  var window_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var window_height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  $('.container').css('height', (window_height - 50))
}

var advanceIndex = function(resolution) {
  if(seriesIndex < flight_data.length - 1) {
    seriesIndex = seriesIndex + resolution;
  }
  else {
    seriesIndex = seriesIndex[flight_data.length -1]
    togglePlayPause();
  }
}

var togglePlayPause = function() {
  $("#button-play").toggle();
  $("#button-pause").toggle();
  if (seriesIndex >= flight_data.length - 1){
    seriesIndex = 0
  }
}

var ready = function() {
  resizeContainer();

  full_path = window.location.pathname
  flight_id = window.location.pathname.split('/')[2];

  if(full_path === "/"){
    $('#signup').css('visibility', 'initial')
  }
  else {
    $('#signup').css('visibility', 'hidden')
  };


  if(flight_id != 'undefined'){
    var request = $.ajax({
      url: "/charts/" + flight_id + ".json",
      method: "get"
    })
    request.done(function(response){
      flight_data = response;
      loadChart(flight_data);
      loadAltimeter(flight_data[0].y);
      loadThermometer2(flight_data[0].temp);
      loadBarometer(flight_data[0].pressure);
      // loadMap();
    });
  };


  var play = function(interval) {
    console.log(interval);

    if (playSpeed === 'superfast'){
      resolution = 10;
    }
    else if (playSpeed === 'fast') {
      resolution = 5
    }
    else {
      resolution = 1
    }

    duration = (flight_data.length * interval) / resolution;

    loadChart(flight_data, duration);
    setInterval(function() {
      advanceIndex(resolution);
      playAltimeter();
      playThermometer2();
      playBarometer();
      playMap();
    }, interval);
  }

  pause = function() {
    clearInterval(indexInterval);
  }

  $(window).on('resize', function(){
    resizeContainer();
  })

  $("#button-play").click(function(){
    togglePlayPause();
    play(200);
  });

  $("#map_button").click(function(){
    $("#chart").hide();
    $("#map").show();
    loadMap();
  });

  $("#chart_button").click(function(){
    $("#map").hide();
    $("#chart").show();
  });

  $("#button-pause").click(function() {
    pause();
    togglePlayPause();
  });

  $('#dropdown1').click(function(){
    $('.menu').toggleClass("active");
  });
  $(".menu").hover(function(){}, function() {
    $('.menu').removeClass("active");
  });

  $('.login').click(function(){
    $('.menu-login').toggleClass("active");
  });
  $(".menu-login").hover(function(){}, function() {
    $('.menu-login').removeClass("active");
  });

  $('.signup').click(function(){
    var container_height = $('.container').height();
    if (full_path == '/'){
      console.log('full path is index')
      $('body').animate({ scrollTop: container_height }, 200);
    }
    else {
      console.log('something other than root')
      window.location.href = '/';
    };
  });

  $('#dropdown2').click(function() {
    $('#notification').toggleClass("active");
  });
  $("#notification").hover(function(){}, function() {
    $('#notification').removeClass("active");
  });

  $("#like").one("submit", function(e){
    e.preventDefault()
    var request = $.ajax({
      url: "/likes",
      method: "post",
      data: $("form").serialize()
    })
    request.fail(function(response){
      var string = $("#like_num").html()
      var number = Number(string)
      var numPlusOne = number += 1
      $("#like_num").html(numPlusOne)
    })
    $(this).css("color", "purple")
    $(this).find('input[type="submit"]').attr('disabled','disabled');
  })

}

$(document).ready(ready);
$(document).on('page:load', ready);
