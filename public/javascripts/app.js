
window.addEventListener("DOMContentLoaded", function() {
	// Grab elements, create settings, etc.
	var canvas = document.getElementById("canvas"),
			button = document.getElementById('button');
			context = canvas.getContext("2d"),
			video = document.getElementById("video"),
			videoObj = { "video": true },
			videoSrc = [],
			count = 0;
		errBack = function(error) {
			console.log("Video capture error: ", error.code);
		};

	// Put video listeners into place


		navigator.webkitGetUserMedia(videoObj, function(stream){
			video.src = window.URL.createObjectURL(stream);
			video.play();
		}, errBack);


	document.getElementById("snap").addEventListener("click", function() {
		var val = text.value;
		context.drawImage(video, 0, 0, canvas.width, canvas.height);
		context.font = "20px serif";
		context.fillText(val, 20, 200);
		videoSrc.push(canvas.toDataURL('image/pgn'));

		///saves image to array
  });
	var text = document.getElementById("text1")

	button.addEventListener('click', function(){
		//prints image from array
		photo.setAttribute('src', videoSrc[count]);
		console.log(photo.src);
		count++
		if (count === videoSrc.length) {
			count = 0;
		}
	})
}, false);
