var Inputs = Class.extend({
	init: function (session){
		

		if(session.input != [][0]){
			console.error("NOOOOooooooo")
			return
		}
		session.input = this;
		var _inputs = this;
		this.key = []
		this.x = 0;
		this.y = 0;
		this.mouse = []
		for(var i =0;i<8;i++){
			this.mouse.push(false)
		}
		for(var i =0;i<256;i++){
			this.key.push(false)
		}

		window.addEventListener('mousedown', this.mousedownCanvas.bind(_inputs), false);
		window.addEventListener('mouseup', this.mouseupCanvas.bind(_inputs), false);
		window.addEventListener('mousemove', this.mousemoveCanvas.bind(_inputs), false);

		window.addEventListener('keydown', this.keydown.bind(_inputs), false);
		window.addEventListener('keyup', this.keyup.bind(_inputs), false);

	}, 
	keydown: function (e){
		var code = e.keyCode;
		if(code < 0)return;
		if(code > 255)return;
		console.log(code)
		this.key[code] = true;

	},
	keyup: function(e) {
		var code = e.keyCode;
		if(code < 0)return;
		if(code > 255)return;

		this.key[code] = false;

	},
	mousedownCanvas: function(e) {
		this.mouse[e.button] = true;
	},
	mouseupCanvas: function(e) {
		this.mouse[e.button] = false;
	},
	mousemoveCanvas: function(e) {
		this.x = e.pageX;
		this.y = e.pageY;
	},
	build: function (){

	},
	destroy: function (){

	},
	update: function (){

	},
	render: function (){

	}
});