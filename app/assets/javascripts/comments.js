var appendResult = function(entry){
  console.log(entry)
  var divForComment = "<div class = 'comment_body'>"
  var commentBody = entry.body
  var br = "</br>"
  var commentAuthor = entry.author
  var endOfDiv = "</div>"
  var fullComment = divForComment + commentBody + br + commentAuthor + endOfDiv
  $("#comment_roll").prepend(fullComment)
}


var ready = function() {

  $("#toggle_comment").on("click", function(e){
    e.preventDefault();
    if ($("#comment").is(":hidden")) {
      $("#comment").slideDown("slow")
      $(this).css("color", "#4d1eb3")
    } else {
      $("#comment").slideUp("slow")
      $(this).css("color", "black")
    }
  })

  $("#show_comments").on("click", function(){
    if ($("#comment_roll").is(":hidden")) {
      $("#show_comments").val("hide comments")
      $("#comment_roll").show('slide', {direction:'up'}, 1000)
    } else {
      $("#show_comments").val("show comments")
      $("#comment_roll").hide("slide", {direction: 'up'}, 1000);
    }
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

  $("#post_comment").on("submit", function(e) {
    e.preventDefault()
    var request = $.ajax({
      url: "/comments/flights.json",
      type: "post",
      data: $("#post_comment").serialize(),
      dataType: "json"
    })
    request.done(appendResult)
    $("#comment").slideUp("slow")
    $("#toggle_comment").css("color", "black")
    $("#comment input[type='text']").val("")
    if ($("#comment_roll").is(":hidden")){
      $("#show_comments").trigger("click")
    }
  })
}

$(document).ready(ready);
$(document).on('page:load', ready);
