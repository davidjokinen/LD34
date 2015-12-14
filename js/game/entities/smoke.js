var Smoke = Entity.extend({
	init: function init(session, pos){
		init.base.call(this);
		this.session = session;
		this.position = pos;
		this.list = []
		this.time = 15
	}, 
	build: function (){
		this.sprites = new PIXI.ParticleContainer(30, {
		    scale: false,
		    position: true,
		    rotation: true,
		    uvs: false,
		    alpha: true
		});

		var color = PIXI.utils.hex2string(~~(PIXI.utils.rgb2hex([Math.random(),Math.random(),Math.random()])))
		for(var i =0;i<30;i++){

			this.sprite = new PIXI.Sprite( PIXI.Texture.fromImage(this.session.buildImage2(5,color)));

			// move the sprite to the center of the screen
			this.sprite.position.x = this.position.x+~~(Math.random()*30);
			this.sprite.position.y = this.position.y+~~(Math.random()*30);
			this.sprite.anchor.x = 0.5;
			this.sprite.anchor.y = 0.5;
			this.sprite.direction = Math.random() * Math.PI * 2;
			this.sprite.speed = (2 + Math.random() * 2) * 0.2;
			//this.sprite.visible = false;
			this.list.push(this.sprite)
			this.sprites.addChild(this.sprite);
		}
		//this.sprites.visible = false;
		this.session.stage.addChild(this.sprites);
		this.sprite.updateTransform() 
	},
	destroy: function (){
		this.session.stage.removeChild(this.sprites);
		this.sprites.destroy()
		for(var i =0;i<30;i++)
			this.list[i].destroy()
	},
	update: function (){
		if(this.time < 0){
			this.scene.remove(this)
			return;
		}
		this.time--
		for(var i =0;i<5;i++){
			var ran = ~~(Math.random()*30)
			//this.list[ran].scale.y = 1+~~(Math.random()*4);
			//this.list[ran].scale.x = this.list[ran].scale.y
			this.list[ran].position.x = this.position.x+~~(Math.random()*30);
			this.list[ran].position.y = this.position.y+~~(Math.random()*30);
			this.list[ran].direction = Math.random() * Math.PI/2 +Math.PI*.66;
			this.list[ran].speed = (2 + Math.random() * 2) * 0.2;
			this.list[ran].alpha = 1
		}
		for(var i =0;i<30;i++){
			if(this.list[i].alpha > .2)
				this.list[i].alpha -= .05
			var dude = this.list[i];
			dude.position.x += Math.sin(dude.direction) * (dude.speed );
        	dude.position.y += Math.cos(dude.direction) * (dude.speed );
		}
		
	},
	render: function (){

	}
});