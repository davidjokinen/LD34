var WinScene = Scene.extend({
	init: function init(session){
		init.base.call(this);
		this.session = session;
		this.count = 300;
	},
	build: function (){
		this.richText = new PIXI.Text('YOU ARE WINNER!', { fill : '#FFFFFF', font: '60px bpdotsregular' });
		this.richText2 = new PIXI.Text('WIN', { fill : '#FFFFFF', font: '400px bpdotsregular' });
		this.richText3 = new PIXI.Text('YOU ARE WINNER!', { fill : '#FFFFFF', font: '60px bpdotsregular' });
		
		//var richText = new PIXI.Text('Title and things',style);
		this.richText.x = window.innerWidth/2-this.richText.width/2;
		this.richText.y = (50);

		this.richText2.x = window.innerWidth/2-this.richText2.width/2;
		this.richText2.y = (window.innerHeight/2-300);

	 	this.richText3.x = window.innerWidth/2-this.richText3.width/2;
		this.richText3.y = (window.innerHeight-150);

		this.session.stage.addChild(this.richText)
		this.session.stage.addChild(this.richText2)
		this.session.stage.addChild(this.richText3)

		this.richText.updateTransform() 
		this.richText2.updateTransform() 
		this.richText3.updateTransform() 

	},
	destroy: function (){
		this.session.stage.removeChild(this.richText)
		this.session.stage.removeChild(this.richText2)
		this.session.stage.removeChild(this.richText3)
	},
	update: function update(){
		update.base.call(this);
		if(this.session.input.key[32]){
			
			this.session.changeScene(new StartScene(this.session))
		}

	},
	render: function render(){
		render.base.call(this);
		var t = this.session.getTime()
		this.session.changeBackground(.99+.33*Math.sin(t/30+20),.66+.33*Math.sin(t/30+0),.66+.33*Math.sin(t/30+40))
	}
});