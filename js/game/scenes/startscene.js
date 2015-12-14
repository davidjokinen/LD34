var StartScene = Scene.extend({
	init: function init(session){
		init.base.call(this);
		this.session = session;
		this.active = this.session.input.key[32];
		
	},
	build: function (){
		this.richText = new PIXI.Text('SHOOT\'N GROW', { fill : '#FFFFFF', font: '100px bpdotsregular' });
		this.richText2 = new PIXI.Text('Fire more bullets', { fill : '#FFFFFF', font: '40px bpdotsregular' });
		this.richText3 = new PIXI.Text('WASD : to move\nMouse : to point\'n shoot\nSpace : spend PT to grow\nDefeat enemies to get more PT. Don\'t die.\nBuy upgrades with PT. Buy upgrade changes.\nevery 3 secounds. Get to LVL 100!\nFully healed every 10 levels!\nSpace to START!', {align:"center", fill : '#FFFFFF', font: '40px bpdotsregular' });

		//var richText = new PIXI.Text('Title and things',style);
		this.richText.x = window.innerWidth/2-this.richText.width/2;
		this.richText.y = (100);

		this.richText2.x = window.innerWidth/2-this.richText2.width/2;
		this.richText2.y = (250);

		this.richText3.x = window.innerWidth/2-this.richText3.width/2;
		this.richText3.y = (400); 

		this.session.stage.addChild(this.richText)
		this.session.stage.addChild(this.richText2)
		this.session.stage.addChild(this.richText3)
		this.richText.updateTransform() 
		this.richText2.updateTransform() 
		this.richText3.updateTransform() 
	},
	destroy: function destroy(){
		destroy.base.call(this);
		this.session.stage.removeChild(this.richText)
		this.session.stage.removeChild(this.richText2)
		this.session.stage.removeChild(this.richText3)
	},
	update: function update(){
		update.base.call(this);
		if(!this.session.input.key[32])
			this.active = false;
		if(!this.active && this.session.input.key[32]){
			this.session.changeScene(new StartFightScene(this.session))
			return;
		}
		if(Math.random()<.1){
			var bullets = 100
			var scatter = 3.14*2
			var scale = scatter/bullets
			for(var i =0;i<bullets;i++){
				var newPos = {x:window.innerWidth/2,y:350}
				var rand = -.1+.2*Math.random()
				this.add(new Bullet(this.session,newPos,-scatter/2+scale*i+rand,100))
			}
		}

	},
	render: function render(){
		render.base.call(this);
		var t = this.session.getTime()
		this.session.changeBackground(.99+.33*Math.sin(t/30+20),.66+.33*Math.sin(t/30+0),.66+.33*Math.sin(t/30+40))
	}
});