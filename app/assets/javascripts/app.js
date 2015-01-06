var $display;
var index_of_digit;
var flight_id;
var flight_data;
var seriesIndex = 0;
var currentInterval;
var playSpeed = 0;
var currentView = 'chart';
var reverseIndex;

var resizeContainer = function(){
  var window_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var window_height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  $('.container').css('height', (window_height - 50))
}

var resetPlayButton = function(){
  $('#button-play').html("<i class='fa fa-play'></i>");
  playSpeed = 0;
}

var advanceIndex = function(resolution) {
  if(seriesIndex < flight_data.length - 1) {
    seriesIndex = seriesIndex + resolution;
  }
  else {
    seriesIndex = seriesIndex[flight_data.length -1];
    clearInterval(currentInterval);
    resetPlayButton();
    }
}

var decrementIndex = function(resolution){
  if(reverseIndex > 1){
    reverseIndex = reverseIndex - resolution;
  }
  else {
    reverseIndex = reverseIndex[0];
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

var togglePlay = function(){
  if (playSpeed === 0 || playSpeed === 5){
    $('#button-play').html('Faster');
    playSpeed = 1;
  }
  // (playSpeed === 1)
  else {
    $('#button-play').html('Slower');
    playSpeed = 5;
  };
};

var ready = function() {
  resizeContainer();

     $(".flight-save").on('click', function() {
      NProgress.inc(0.25);
      NProgress.start();
    })

  full_path = window.location.pathname
  current_dir = window.location.pathname.split('/')[1]
  flight_id = window.location.pathname.split('/')[2];

  if(full_path === "/"){
    $('#signup').css('visibility', 'initial')
  }
  else {
    $('#signup').css('visibility', 'hidden')
  };


  if(current_dir === 'flights' && flight_id != 'undefined'){
    var request = $.ajax({
      url: "/charts/" + flight_id + ".json",
      method: "get"
    })

    request.done(function(response){
      flight_data = response;
      reverseIndex = flight_data.length -1
      point = flight_data[seriesIndex]
      reversePoint = flight_data[reverseIndex]
      loadChart(flight_data);
      loadAltimeter(point.y);
      loadThermometer2(point.temp);
      loadBarometer(point.pressure);
      loadClock(reversePoint.x, reversePoint.x);
      loadMap();
    });

    // Check this out -matt
    /* http://api.jquery.com/deferred.then/
     * request
     * .then(loadChart)
     * .then(loadAltimeter)
     * .then(loadThermometer2)
     * ......
     */
  };

  // var appendResult = function(entry){
  //   console.log(entry)
  //   var divForComment = "<div class = 'comment_body'>"
  //   var commentBody = entry.body
  //   var br = "</br>"
  //   var commentAuthor = entry.author
  //   var endOfDiv = "</div>"
  //   var fullComment = divForComment + commentBody + br + commentAuthor + endOfDiv
  //   $("#comment_roll").prepend(fullComment)
  // }

  var toggleMapChart = function (){
    if (currentView === 'map'){
      $('#chart_map_button').html('MAP');
      currentView = 'chart';
      $('#map').css('z-index', '-1');
      $('#chart').css('z-index', '1');
    }
    else {
      $('#chart_map_button').html('CHART')
      currentView = 'map'
      $('#chart').css('z-index', '-1');
      $('#map').css('z-index', '1');
      $('#map').css('border', '2px solid #4d1eb3');
    }
  };

  $('#chart_map_button').click(toggleMapChart);

  var play = function(interval) {
    if(currentInterval != 'undefined'){
      clearInterval(currentInterval);
      seriesIndex = 0;
    }

    duration = (flight_data.length * interval) / playSpeed;

    loadChart(flight_data.slice(0, seriesIndex));
    currentInterval = setInterval(function() {
      advanceIndex(playSpeed);
      decrementIndex(playSpeed);
      point = flight_data[seriesIndex];
      reversePoint = flight_data[reverseIndex];

      playChart(point);
      playAltimeter(point);
      playThermometer2(point);
      playBarometer(point);
      playMap();
      playClock(reversePoint);
    }, interval);
  }



  $(window).on('resize', function(){
    resizeContainer();
  })

  $("#button-play").click(function(){
    togglePlay();
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

  $('#dropdown1').click(function(){
    $('.menu').toggleClass("active");
  });
  $(".menu").hover(function(){}, function() {
    $('.menu').removeClass("active");
  });
  $("nav").hover(function(){}, function() {
    $('.menu').removeClass("active");
    $('.menu-login').removeClass("active");
    $('#notification').removeClass("active");
  });
  $('#dropdown1, #dropdown2, .login').bind('mousewheel DOMMouseScroll', function(){ $('.menu').removeClass("active");
    $('.menu-login').removeClass("active");
    $('#notification').removeClass("active");
  });

  $('.login').click(function(){
    $('.menu-login').toggleClass("active");
  });
  $(".menu-login").hover(function(){}, function() {
    $('.menu-login').removeClass("active");
  });

  $('#dropdown2').click(function() {
    $('#notification').toggleClass("active");
  });
  $("#notification").hover(function(){}, function() {
    $('#notification').removeClass("active");
  });
  $("#notification, .menu-login, .menu").hover(function(){
    $('body').css("overflow", "hidden");
  }, function() {
    $('body').css("overflow", "auto");
  });

  $(".flights-row-body").smoothDivScroll({
    manualContinuousScrolling: true
  });

  $("#picture-carousel").smoothDivScroll({
    manualContinuousScrolling: true,
    visibleHotSpotBackgrounds: "always"
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

  $("#like").one("submit", function(e){
    e.preventDefault()
    var request = $.ajax({
      url: "/likes",
      method: "post",
      data: $("#like").serialize()
    })
    request.done(function(response){
      var string = $("#like_num").val()
      var splitText = string.split(" ")
      splitText[1] = (Number(splitText[1]) + 1)
      var numWithLike = splitText.join(" ")
      $("#like_num").val(numWithLike)
    })
    console.log(this)
    $('#like_num').css("color", "#4d1eb3")
    $(this).find('input[type="submit"]').attr('disabled','disabled');
  })
}

$(document).ready(ready);
$(document).on('page:load', ready);
