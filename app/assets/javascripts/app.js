var flight_id;
var flight_data;
var seriesIndex = 0;
var currentInterval;
var playSpeed = 0;
var currentView = 'chart';
var reverseIndex;

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
    $('#map').css('border', '2px solid white');
  }
};

var findWithAttr = function(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
}

var loadFinalPoint = function(finalPoint){
  loadChart(flight_data.slice(0, seriesIndex));
  advanceIndex(playSpeed);
  decrementIndex(playSpeed);
  var previousPoint = flight_data[finalPoint - 1];
  reversePoint = flight_data[0];
  playChart(finalPoint);
  playAltimeter(finalPoint);
  playThermometer2(finalPoint);
  playBarometer(finalPoint);
  playMap();
  playClock(reversePoint);
  playAscent(rateOfAscent(finalPoint, previousPoint));
  playBattery(finalPoint.battery);
  console.log('last point')
}

var play = function(interval) {
  loadChart(flight_data.slice(0, seriesIndex));
  currentInterval = setInterval(function() {
    advanceIndex(playSpeed);
    decrementIndex(playSpeed);
    var point = flight_data[seriesIndex];
    var previousPoint = flight_data[seriesIndex - 1];
    reversePoint = flight_data[reverseIndex];
    playChart(point);
    playAltimeter(point);
    playThermometer2(point);
    playBarometer(point);
    playMap();
    playClock(reversePoint);
    ascentFormatAndSendPoint(point, (rateOfAscent(point, previousPoint)));
    updateAscentInfo(point);
    playBattery(point.battery);
    updateBatteryInfo(point);
  }, interval);
}

var resizeContainer = function(){
  var window_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var window_height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  $('.container').css('height', (window_height - 50))
}

var resetPlayButton = function(){
  $('#button-play').html("<i class='fa fa-play'></i>");
  playSpeed = 0;
  seriesIndex = 0;
}

var advanceIndex = function(resolution) {
  if(seriesIndex < flight_data.length - resolution - 1) {
    seriesIndex = seriesIndex + resolution;
  }
  else {
    seriesIndex = flight_data.length - 1;
    resetPlayButton();
    playSpeed = 0;
    clearInterval(currentInterval);
    }
}

var decrementIndex = function(resolution){
  if(reverseIndex > 1){
    reverseIndex = reverseIndex - resolution;
  }
  else {
    reverseIndex = 0;
  }
}

var invertIndex = function(point){
  var currentIndex = findWithAttr(flight_data, 'x', point.x);
  return flight_data.length - 1 - currentIndex
}

var displayDataSubmit = function() {
  $("#data_submit").delay(500).show('slide', {direction:'left'}, 1000)
}

var displayDataComment = function(data_point) {
  $("#data_point").val(data_point.id)
  console.log(data_point.id)
};

var togglePlay = function(){
  if (playSpeed === 0 || playSpeed === 2){
    $('#button-play').html('Faster');
    playSpeed = 1;
  }
  // (playSpeed === 1)
  else {
    $('#button-play').html('Slower');
    playSpeed = 2;
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
  var onFlightShowPage = (/\d/).test(flight_id)


  if(full_path === "/"){
    $('#signup').css('visibility', 'initial')
  }
  else {
    $('#signup').css('visibility', 'hidden')
  };


  if(current_dir === 'flights' && onFlightShowPage){
    var request = $.ajax({
      url: "/charts/" + flight_id + ".json",
      method: "get"
    })

    request.done(function(response){
      flight_data = response;
      reverseIndex = flight_data.length -1
      point = flight_data[seriesIndex]
      nextPoint = flight_data[seriesIndex + 1]
      reversePoint = flight_data[reverseIndex];
      loadChart(flight_data);
      loadAltimeter(point.y);
      loadThermometer2(point.temp);
      loadBarometer(point.pressure);
      loadClock(reversePoint.x, reversePoint.x);
      loadMap();
      updateAscentInfo(point);
      loadAscent(rateOfAscent(nextPoint, point));
      setFullBattery(point.battery);
      loadBattery(point.battery);
      updateBatteryInfo(point)
    });
  };

  // var appendResult = function(entry){
  //   var divForComment = "<div class = 'comment_body'>"
  //   var commentBody = entry.body
  //   var br = "</br>"
  //   var commentAuthor = entry.author
  //   var endOfDiv = "</div>"
  //   var fullComment = divForComment + commentBody + br + commentAuthor + endOfDiv
  //   $("#comment_roll").prepend(fullComment)
  // }

  $('#chart_map_button').click(toggleMapChart);

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
  $("#notification, .menu-login, .menu, #tabs-1, #tabs-2").hover(function(){
    $('body').css("overflow", "hidden");
  }, function() {
    $('body').css("overflow", "auto");
  });

  $('#friend-toggle').click(function(){
    $('#tabs-1').addClass("active1");
    $('#tabs-2').removeClass("active1");
    $(this).addClass("active2");
    $('#flight-toggle').removeClass("active2");
  });

  $('#flight-toggle').click(function(){
    $('#tabs-2').addClass("active1");
    $('#tabs-1').removeClass("active1");
    $(this).addClass("active2");
    $('#friend-toggle').removeClass("active2");
  });

  $(".flights-row-body").smoothDivScroll({
    manualContinuousScrolling: true
  });

  $("#photo-carousel").smoothDivScroll({
    manualContinuousScrolling: true
  });

  $('.img-container').hover(function(){
    $(this).find("button").show();
  },function() {
    $(this).find("button").hide();
  });

  $('.remove-pic').click(function(){
    var flightId = window.location.pathname.split("/")[2];
    var imageContainer = $(this).parent();
    var imageId = $(this).data().id;
    var request = $.ajax({
      url: "/flights/" + flightId + "/pictures/" + imageId,
      method: "DELETE"
    });
    request.done(function(response){
      imageContainer.next(".helper").remove();
      imageContainer.remove();
    });
  });

  $('#comment-add').click(function(){
    $('#comment-input-box').slideToggle("slow", function() {
    });
  });
  $('#comment-submit').click(function(){
    $('#comment-input-box').slideToggle("slow", function() {
    });
  });
  $('#photo-add').click(function(){
    var flightId = window.location.pathname.split("/")[2];
    window.location.replace("/flights/" + flightId + "/pictures/new");
  });

  $('#photo-view').click(function(){
    var nav_height = $('nav').height();
    var container_height = $('#main-container').height();
    $('body').animate({ scrollTop: nav_height + container_height }, 200);
  });
  $('#comment-view').click(function(){
    var nav_height = $('nav').height();
    var container_height = $('#main-container').height();
    var photo_height = $('#photo-container').height();
    $('body').animate({ scrollTop: nav_height + container_height + photo_height }, 200);
  });

  $('#comment-submit').click(function(e){
    e.preventDefault();

    var info = {};
    if ($('#data_point').val() !== "") {
      info[data_point_id] = $('#data_point').val();
    }
    info["body"] = $('#comment_body').val();
    info["flight_id"] = window.location.pathname.split('/')[2];

    var request = $.ajax({
      url: "/comments",
      method: "POST",
      data: {attributes: info}
    });
    request.done(function(response){
      $('#comment_roll').prepend('<div class="comment_body"><p class="head"><a>thomas</a></p><p class="body"></p></div>');
      var commentBody = $('.comment_body').first();
      commentBody.find('a').attr("href", "/user/" + response["user_id"])
      commentBody.find('a').text(response["author"]);
      commentBody.find('.body').text(response["body"]);
    });
  });

  $('.signup').click(function(){
    var container_height = $('.container').height();
    if (full_path == '/'){
      $('body').animate({ scrollTop: container_height }, 200);
    }
    else {
      window.location.href = '/';
    };
  });

  $(".friend-list form").on('submit', function(e) {
    e.preventDefault();
    var form = $(this);
    $.ajax({
      method: form.attr('method'),
      url: form.attr('action'),
      success: function(response) {
        var $thing = $("#friend-list-" + response.id)
        $thing.css("background-color", "palegreen")
        $thing.fadeOut(1000);
      },
      fail: function(response) {
      }
    })
  });

  $(".friend-list form").on('submit', function(e) {
    e.preventDefault();
    var form = $(this);
    $.ajax({
      method: "delete",
      url: form.attr('action'),
      success: function(response) {
        var $thing = $("#friend-list-" + response.id)
        $thing.css("background-color", "#EE6A50");
        $thing.fadeOut(1000);
      },
      fail: function(response) {
      }
    })
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
    $('#like_num').css("color", "#4d1eb3")
    $(this).find('input[type="submit"]').attr('disabled','disabled');
  })
}

$(document).ready(ready);
$(document).on('page:load', ready);
