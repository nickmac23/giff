

	// Grab elements, create settings, etc.

	var canvas = document.getElementById("canvas"),
			button = document.getElementById('button');
			loop = document.getElementById('loop');
			speed = document.getElementById('speed');
			context = canvas.getContext("2d"),
			video = document.getElementById("video"),
			videoObj = { "video": true },
			videoSrc = [],
			count = 0;
			var text = document.getElementById("text1")
			var val = '';
		errBack = function(error) {
			console.log("Video capture error: ", error.code);
		};

		// gifshot.createGIF({
		//     'images': ['http://i.imgur.com/2OO33vX.jpg', 'http://i.imgur.com/qOwVaSN.png', 'http://i.imgur.com/Vo5mFZJ.gif']
		// 	},function(obj) {
		// 	    if(!obj.error) {
		// 	        var image = obj.image,
		// 	        animatedImage = document.createElement('img');
		// 	        animatedImage.src = image;
		// 	        document.body.appendChild(animatedImage);
		// 	    }
		// });

	// Put video listeners into place
	function vidToCanvas () {
		val = text.value;
		context.drawImage(video, 0, 0, canvas.width, canvas.height);
		context.font = "50px serif";
		context.fillStyle = "red";
		context.fillText(val, 40, 50);
		videoSrc.push(canvas.toDataURL('image/webp'));
		console.log(videoSrc[0]);
	}

		navigator.webkitGetUserMedia(videoObj, function(stream){
			video.src = window.URL.createObjectURL(stream);
			video.play();
		}, errBack);


	document.getElementById("snap").addEventListener("click", function() {
		vidToCanvas();
  });

	button.addEventListener('click', function(){
		//prints image from array
		photo.setAttribute('src', videoSrc[count]);
		count++
		if (count === videoSrc.length) {
			count = 0;
		}
	})

	document.getElementById('array').addEventListener('click', function(){
			var coun = 0;
			var looper  = videoSrc.length * +loop.value;
				(function next(c, maxLoops) {
				    if (c >= maxLoops) return;
				    setTimeout(function() {
								photo.setAttribute('src', videoSrc[coun])
								c++;
								coun++;
								if (coun === videoSrc.length) {coun = 0;}
				        next(c, maxLoops);
				    }, +speed.value);
				})(0, looper);
	})

	document.getElementById('take').addEventListener('click', function(){
		var tiempo = 1000/+document.getElementById('picSec').value;
		var timeloops = Math.floor((+document.getElementById('time').value * 1000) / tiempo);
		(function next(c, maxLoops) {
				if (c >= maxLoops) return;
				setTimeout(function() {
					vidToCanvas();
						c++;
						next(c, maxLoops);
				}, tiempo);
			})(0, timeloops);
	})

document.getElementById('sub').addEventListener('click', function(){
	var data = {pic: videoSrc.join('\n')}
		$.ajax({
	           url: '/gif',
	           type: 'POST',
	           cache: false,
	           data: data,
	           success: function(data){
	              console.log('Success!')
	           }
	           , error: function(jqXHR, textStatus, err){
	               console.log(('text status '+textStatus+', err '+err))
	           }
	        })
 });
