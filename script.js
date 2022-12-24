var bbiTL = new TimelineMax(),
		
// logo
		frame = document.getElementById("frame"),
		happy = document.getElementById("happy"),
		merry = document.getElementById("merry"),
		christmas = document.getElementById("christmas"),
		trees = document.getElementById("trees"),
		middle_tree = document.getElementById("middle_tree"),
		left_tree = document.getElementById("left_tree"),
		right_tree = document.getElementById("right_tree");

// animations
		// logo
		bbiTL
			.fromTo(merry, 1, { scale: 0, xPercent: 50, yPercent: 100 }, { scale: 1, ease: Back.easeOut.config(1.8), xPercent: 0, yPercent: 0}, 1.5)
			.fromTo(christmas, 1.5, { scale: 0, xPercent: 50, yPercent: 100 }, { scale: 1, ease: Bounce.easeOut, xPercent: 0, yPercent: 0}, 2)
			.fromTo(frame, 1, { opacity: 0, scale: 0, xPercent: 50, yPercent: 100 }, { scale: 1, ease: Back.easeOut.config(1.8), xPercent: 0, yPercent: 0, opacity: 1}, 3)
			.fromTo(middle_tree, 0.6, { opacity: 0, scale: 0, xPercent: 50, yPercent: 100 }, { scale: 1, ease: Back.easeOut.config(2), xPercent: 0, yPercent: 0, opacity: 1}, 6.9)
			.fromTo(left_tree, 0.6, { opacity: 0, scale: 0, xPercent: 50, yPercent: 100 }, { scale: 1, ease: Back.easeOut.config(2), xPercent: 0, yPercent: 0, opacity: 1}, 6)
			.fromTo(right_tree, 0.6, { opacity: 0, scale: 0, xPercent: 50, yPercent: 100 }, { scale: 1, ease: Back.easeOut.config(2), xPercent: 0, yPercent: 0, opacity: 1}, 6.3)
			.fromTo(bbi, 1.5, { scale: 0, xPercent: 50, yPercent: 100 }, { scale: 1, ease: Bounce.easeOut, xPercent: 0, yPercent: 0}, 7.5)

			happyNewYear();
		
		// item drop
		var totalItems = 18;
		for (var i=1; i <= totalItems; ++i) {
			var lenght = Math.random() * (4.5 - 3) + 3;
			var start = Math.random();
			
			// hanging
			hanging(totalItems,i,lenght,start);
			
			bbiTL.fromTo("#item"+i, lenght, {y: -(($("#item"+i).height())/3) }, { ease: Bounce.easeOut, y: 0 }, start)
		
		};

		// item hanging

		function hanging(totalItems,i,lenght,start) {
			var hangOffset = 0.3;
			var hangStart = start+lenght-0.2;
			var delay = (Math.random() * 3) + 1;
			var rotation = -(( 1 / lenght ) * 3);
			bbiTL.to("#item"+i, hangOffset, {rotation: rotation, transformOrigin: "0% 0%", repeatDelay:0, ease: Back.easeOut.config(2), repeat:-1 }, hangStart/3);
    	bbiTL.to("#item"+i, 10, {rotation: 0, transformOrigin: "0% 0%", ease: Elastic.easeOut.config(2.5, 0.1), repeatDelay:hangOffset, repeat:-1 }, (hangStart+hangOffset)/3);
			console.log(rotation);
		}


		function happyNewYear() {
			for (var h=1; h <= 16; ++h) {
				var leters = h*0.1;
				bbiTL.fromTo(".happy_"+h, 0.2, { scale: -1, opacity: 0 }, { scale: 1, ease: Back.easeOut.config(1.4), opacity: 1 }, leters+4);
			}
		}


		// onhover
// 		$(".item").hover(itemhover(i));
		
// 		function itemhover(i) {
// 			bbiTL.to("#item"+i, 0.3, {rotation: -0.8, transformOrigin: "0% 0%", }, 0);
//     	bbiTL.to("#item"+i, 4, {rotation: 0, transformOrigin: "0% 0%", ease: Elastic.easeOut.config(2.5, 0.1) }, 0.3);
// 		}

		// snow
		var canvas = document.getElementById('snow'),
				ctx = canvas.getContext('2d'),
				width = ctx.canvas.width = canvas.offsetWidth,
				height = ctx.canvas.height = canvas.offsetHeight,
				animFrame = window.requestAnimationFrame ||
										window.mozRequestAnimationFrame ||
										window.webkitRequestAnimationFrame ||
										window.msRequestAnimationFrame,
				snowflakes = [];

		window.onresize = function() {
			width = ctx.canvas.width = canvas.offsetWidth;
			height = ctx.canvas.height = canvas.offsetHeight;

			for (var i = 0; i < snowflakes.length; i++) {
				snowflakes[i].resized();
			}
		}

		function update() {
			for (var i = 0; i < snowflakes.length; i++) {
				snowflakes[i].update();
			}
		}

		function Snow() {
			this.x = random(0, width);
			this.y = random(-height, 0);
			this.radius = random(0.5, 3.0);
			this.speed = random(0.5, 2.0);
			this.wind = random(-0.1, 1.0);
			this.isResized = false;

			this.updateData = function () {
				this.x = random(0, width);
				this.y = random(-height, 0);
			}

			this.resized = function () {
				this.isResized = true;
			}
		}

		Snow.prototype.draw = function() {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
			ctx.fillStyle = '#fff';
			ctx.fill();
			ctx.closePath();
		}

		Snow.prototype.update = function() {
			this.y += this.speed;
			this.x += this.wind;

			if (this.y > ctx.canvas.height) {
				if (this.isResized) {
					this.updateData();
					this.isResized = false;
				} else {
					this.y = 0;
					this.x = random(0, width); 
				}
			}
		}

		function createSnow(count) {
			for (var i = 0; i < count; i++) {
				snowflakes[i] = new Snow();
			}
		}

		function draw() {
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			for (var i = 0; i < snowflakes.length; i++) {
				snowflakes[i].draw();
			}
		}

		function loop() {
			draw();
			update();
			animFrame(loop);
		}

		function random(min, max) {
			var rand = (min + Math.random() * (max - min)).toFixed(1);
			rand = Math.round(rand);
			return rand;
		}

		createSnow(200);
		loop();