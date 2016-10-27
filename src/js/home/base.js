const home = function() {
  $.getJSON("http://www.reddit.com/r/pics.json?jsonp=?", function(data){
    $.each(
      data.data.children.slice(0, 5),
      function (i, post) {
        console.log(post);
      }
    )}
  )
  .success(function() { alert("second success"); })
  .error(function() { alert("error"); })
  .complete(function() { alert("complete"); });

}

home()
