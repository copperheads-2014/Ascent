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

  $('#show_comment').click(function(){
    var container_height = $('.container').height() + 100;
    $('body').animate({ scrollTop: container_height }, 200);
  });
}

$(document).ready(ready);
$(document).on('page:load', ready);
