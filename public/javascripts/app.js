window.addEventListener("DOMContentLoaded", function() {
	// Grab elements, create settings, etc.
	var canvas = document.getElementById("canvas"),
			button = document.getElementById('button');
		context = canvas.getContext("2d"),
		video = document.getElementById("video"),
		videoObj = { "video": true },
		videoSrc = [],
		count = 1;
		errBack = function(error) {
			console.log("Video capture error: ", error.code);
		};

	// Put video listeners into place


  document.getElementById("snap").addEventListener("click", function() {
		navigator.webkitGetUserMedia(videoObj, function(stream){
			video.src = window.URL.createObjectURL(stream);

		}, errBack);


		context.drawImage(video, 0, 0, canvas.width, canvas.height);
		///saves image to array
		videoSrc.push(canvas.toDataURL('image/png'));






  });
	button.addEventListener('click', function(){
		count++
		//prints image from array
		photo.setAttribute('src', videoSrc[count]);
	})
}, false);
