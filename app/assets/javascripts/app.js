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

var displayDataSubmit = function() {
  $("#data_submit").delay(500).show('slide', {direction:'left'}, 1000)
}

var displayDataComment = function(data_point) {
  if ($("#data_comment").is(":hidden")) {
      $("#data_comment").slideDown("slow")
      $("#data_point").val(data_point)
      displayDataSubmit()
    } else {
      $("#data_comment").slideUp("slow")
    }
}

var togglePlayPause = function() {
  $("#button-play").toggle();
  $("#button-pause").toggle();
  if (seriesIndex >= flight_data.length - 1){
    seriesIndex = 0
  }
}

var toggleMapChart = function() {
  $("#chart_button").toggle();
  $("#map_button").toggle();
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

  $("#post_comment").on("submit", function(e) {
    e.preventDefault()
    var request = $.ajax({
      url: "/comments/flights",
      method: "post",
      data: $("#post_comment").serialize()
    })
    $("#comment").slideUp("slow")
    $("#toggle_comment").css("color", "black")
    $("#comment input[type='text']").val("")
  })

  $("#datapoint_comment").on("submit", function(e) {
    e.preventDefault()
    var request = $.ajax({
      url: "/comments/data",
      method: "post",
      data: $("#datapoint_comment").serialize()
    })
    $("#data_comment").slideUp("slow")
    $("#data_comment input[type='text']").val("")
  })

  $("#like").one("submit", function(e){
    e.preventDefault()
    var request = $.ajax({
      url: "/likes",
      method: "post",
      data: $("#like").serialize()
    })
    request.fail(function(response){
      var string = $("#like_num").val()
      var splitText = string.split(" ")
      splitText[1] = (Number(splitText[1]) + 1)
      var numWithLike = splitText.join(" ")
      $("#like_num").val(numWithLike)
    })
    console.log(this)
    $('#like_num').css("color", "purple")
    $(this).find('input[type="submit"]').attr('disabled','disabled');
  })

  // $("#toggle_comment").on("click", function(){
  //   $("#comment").toggle("display")
  // })

  $("#toggle_comment").on("click", function(e){
    e.preventDefault();
    if ($("#comment").is(":hidden")) {
      $("#comment").slideDown("slow")
      $(this).css("color", "purple")
    } else {
      $("#comment").slideUp("slow")
      $(this).css("color", "black")
    }
  })

  $("body").on(".info_box", "click", function(){
    console.log("sup")
  })
  // $("#post_comment").on("submit", function(e){
  //   e.preventDefault()
  //   $.ajax({
  //     url: "/comments",
  //     method: "post",
  //     data: $(form)
  //   })
  // })
}

$(document).ready(ready);
$(document).on('page:load', ready);
