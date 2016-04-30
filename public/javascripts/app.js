

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

console.log('dope');
	// Put video listeners into place
	function vidToCanvas (dis, id, tex) {
		val = tex ? tex : text.value;
		var pic = dis ? dis : video;
		context.drawImage(pic, 0, 0, canvas.width, canvas.height);
		context.font = "50px serif";
		context.fillStyle = "red";
		context.fillText(val, 40, 50);
		if ( id === undefined ) {
			videoSrc.push(canvas.toDataURL('image/webp'));
		}else{
			videoSrc[+id] = canvas.toDataURL('image/webp');
		}
	}

	if(navigator.getUserMedia) { // Standard
		navigator.getUserMedia(videoObj, function(stream) {
			video.src = stream;
			video.play();
		}, errBack);
	} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
		navigator.webkitGetUserMedia(videoObj, function(stream){
			video.src = window.URL.createObjectURL(stream);
			video.play();
		}, errBack);
	}
	else if(navigator.mozGetUserMedia) { // Firefox-prefixed
		navigator.mozGetUserMedia(videoObj, function(stream){
			video.src = window.URL.createObjectURL(stream);
			video.play();
		}, errBack)
	}


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
	$('#gifDisplay').empty();
	for (var i = 0; i < videoSrc.length; i++) {
		$('#gifDisplay').append("<img class='order' value=" + (+videoSrc.length - i) + " src=" + videoSrc[i] + ">")
										.append("<input type='text' id='txt" + (+videoSrc.length - i) + "'>")
										.append("<input type='text' class='input' value=" + (+videoSrc.length - i) + ">")

	}

 });

 $(document).on('click', '#but', function() {
	 var arr = []
	 for (var i = 0; i < document.getElementsByClassName('order').length; i++) {
		document.getElementsByClassName('order')[i].value =  +document.getElementsByClassName('input')[i].value;
		arr.push(document.getElementsByClassName('order')[i]);
	 }
	 arr.sort(function(a, b) {
		  return a.value - b.value;
		});
		$('#gifDisplay').empty();
		for (var i = 0; i < arr.length; i++) {
			videoSrc[i] = arr[i].src
			$('#gifDisplay').append("<img class='order' value=" + (arr.length - i) + " src=" + videoSrc[i] + ">")
											.append("<input type='text' id='txt" + (arr.length - i) + "'>")
											.append("<input type='text' class='input' value=" + (arr.length - i) + ">")

		}
 })
 //adds text edit
 $(document).on('click', '.order', function() {
	 var txt = document.getElementById( 'txt' + ($(this).eq(0).attr('value') ) ).value ;
	 vidToCanvas( $(this)[0], (videoSrc.length - $(this).eq(0).attr('value')) , txt )
 })
