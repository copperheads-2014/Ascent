var appendResult = function(entry){
  var divForComment = "<div class = 'comment_body'>"
  var commentBody = entry.body
  var br = "</br>"
  var commentAuthor = entry.author
  var endOfDiv = "</div>"
  var fullComment = divForComment + commentBody + br + commentAuthor + endOfDiv
  $("#comment_roll").prepend(fullComment)
}


var ready = function() {

  // $("#toggle_comment").on("click", function(e){
  //   e.preventDefault();
  //   if ($("#comment").is(":hidden")) {
  //     $("#comment").slideDown("slow")
  //     $(this).css("color", "#ffffff")
  //   } else {
  //     $("#comment").slideUp("slow")
  //     $(this).css("color", "black")
  //   }
  // })

  // $('#show_comment').click(function(){
  //   var container_height = $('.container').height();
  //   $('body').animate({ scrollTop: container_height }, 200);
  // });


  // $("#post_comment").on("submit", function(e) {
  //   e.preventDefault()
  //   var request = $.ajax({
  //     url: "/comments/flights.json",
  //     type: "post",
  //     data: $("#post_comment").serialize(),
  //     dataType: "json"
  //   })
  //   request.done(appendResult)
  //   $("#comment").slideUp("slow")
  //   $("#toggle_comment").css("color", "black")
  //   $("#comment input[type='text']").val("")
  //   if ($("#comment_roll").is(":hidden")){
  //     $("#show_comments").trigger("click")
  //   }
  // })
}

$(document).ready(ready);
$(document).on('page:load', ready);
