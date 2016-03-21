window.addEventListener("DOMContentLoaded", function() {
	// Grab elements, create settings, etc.
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		video = document.getElementById("video"),
		videoObj = { "video": true },
		errBack = function(error) {
			console.log("Video capture error: ", error.code);
		};

	// Put video listeners into place


  document.getElementById("snap").addEventListener("click", function() {
		navigator.webkitGetUserMedia(videoObj, function(stream){
			video.src = window.URL.createObjectURL(stream);
			// video.play();
		}, errBack);
    context.drawImage(video, 0, 0, canvas.width, canvas.height);




  });

}, false);
