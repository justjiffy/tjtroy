// TUMbLR FEED GRAB
  var photoPosts = [];
  var textPosts = [];

  myJsonpCallback = function(data) {
    var posts = data.response.posts;
    var numPosts = data.response.blog.posts;
    console.log(numPosts);
    $.each(posts, function(key, value) {
      if (value.type == "photo") {
        photoPosts.push(value)
      } else if (value.type == "text") {
        textPosts.push(value);
      }
    });
  console.log("PHOTO POSTS: ");
  checkLog(photoPosts);
  console.log("TEXT POSTS: ");
  checkLog(textPosts);
  populateTextPosts(textPosts);
  };

  checkLog = function(array) {
    $.each(array, function(key, value) {
      if (value.photos) {
        console.log(value.photos[0].alt_sizes[3].url + " - " + value.caption);
      } else console.log(value.title + " - " + value.body);
    });
  };

  $.ajax({
      type: "GET",
      url : "https://api.tumblr.com/v2/blog/tjtroy.tumblr.com/posts",
      dataType: "jsonp",
      data: {
          api_key : "JMCc448RKpEearLdRVbLGb9rd0bmXfIA9abEdJghuO2ZALHtjl",
          jsonp : "myJsonpCallback"
      }
  });

  populateTextPosts = function(array) {
    $.each(array, function(key, value) {
      $('#event-container').append('<div class="event-post"><div class="container-header"><h5>'+value.title+'</h5></div><div class="container-body">'+value.body+'</div></div>');
    });
  };

//HEADER HIDE/SHOW and SPLASH SPACING
function scroll_style() {
     var window_top = $(window).scrollTop();
     var div_top = 1;

     if (window_top > div_top){
        console.log('show navigation');
        $('#splash').slideUp("slow");
        $('#loadSecond').fadeIn("slow");
        $('#navbar').slideDown("slow");
     } else {
      $('#loadSecond').slideDown();
      $('#navbar').slideUp();
      $('#splash').fadeIn();
      console.log('no show navigation'); }
  }

$(function() {
  $(window).scroll(scroll_style);
  scroll_style();

  //set video area height to window height
  var height = $(window).height();
  var width = $(window).width();
  var introContainer = $('#part1').height() + $('#part2').height() + $('#part3').height();
  var marginTop = (height - introContainer) / 2;

  console.log('width: '+ width + " height: " + height + " introContainer: " + introContainer);
  console.log('part1: '+ $('#part1').height() + " part2: " + $('#part2').height() + " part3 " + $('#part3').height());

  $('#introContainer').css("marginTop", marginTop+"px" );
  $('#bio').height(height);
  $('#splash').height(height);

  $('#events-content').width(width);
  $('#events-content').height(height);
  $('#events-content').css("transform", "translate3d(-"+width+"px, 0px, 0px)");

$('#media-content').width(width);
  $('#media-content').height(height);
  $('#media-content').css("transform", "translate3d(-"+width+"px, 0px, 0px)");

  $('#sidebar-events').click(function() {
    $('#events-content').css({
      'transform' : 'translate3d(65px, 0px, 0px)',
      'display' : 'block'
    });
    $('#media-content').css({
      'display' : 'none',
      'transform' : "translate3d(-"+width+"px, 0px, 0px)"
    });
  });

  $('#sidebar-media').click(function() {
    $('#media-content').css({
      'transform' : 'translate3d(65px, 0px, 0px)',
      'display' : 'block'
    });
    $('#events-content').css({
      'display' : 'none',
      'transform' : "translate3d(-"+width+"px, 0px, 0px)"
    });
  });

  $('#events-back').click(function() {
    $('#events-content').css({
      'transform' : "translate3d(-"+width+"px, 0px, 0px)",
    });
  });
});

//YOUTUBE STUFF
    var videoArray = ['KXzu6rE3FJw', 'EE6Oz-sfsMc', 'oxu28Vt7ors', 'zlQspmqSVMg', 'UeNiKWPsaFU'],
        x = 0,
        tag = document.createElement('script'),
        firstScriptTag = document.getElementsByTagName('script')[0],
        player,
        done = false;

    tag.src = "https://www.youtube.com/iframe_api";
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    function onYouTubeIframeAPIReady() {
      player = new YT.Player('player', {
        height: '390',
        width: '100%',
        videoId: videoArray[x],
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        },
        playerVars: {
       'controls': 0,
       'rel' : 0
        }
      });
    }

    $('#play').on('click', function () {
      player.playVideo();
      toggle('#pause', '#play');
    });
    $('#pause').on('click', function() {
      player.pauseVideo();
      toggle('#play','#pause');
    });
    $('#mute').on('click', function () {
      player.mute();
      toggle('#unmute', '#mute');
    });
    $('#unmute').on('click', function() {
      player.unMute();
      toggle('#mute','#unmute');
    });
    $('#next').on('click', function() {
      if (x==4) { x = 0 }
        else x++;
      player.loadVideoById(videoArray[x]);
      toggle('#pause', '#play');
    });
    $('#prev').on('click', function() {
      if (x === 0) { x = 4 }
        else x--;
      player.loadVideoById(videoArray[x]);
      toggle('#pause', '#play');

    });

    toggle = function(one, two) {
      $(one).css('display', 'block');
      $(two).css('display', 'none');
    }

    function onPlayerReady(event) {
      event.target.playVideo();
      player.mute();
    }

    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.PLAYING && !done) {
          // setInterval(fadeVideo, 500);
          toggle('#pause', '#play');
          done = true;
        }
    }
