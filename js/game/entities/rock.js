var Rock = Entity.extend({
	init: function init(session, pos){
		init.base.call(this);
		this.session = session;
		this.speed  =1;
		this.radius = 5*~~(20+30*Math.random())
		if(pos == [][0]){
			do{
				posx = Math.random()*5000
				posy = Math.random()*5000
			}while(this.session.hitchecker.check(posx,posy,this.radius+10));
			pos = {x:posx,y:posy}
		}
		this.position = pos;
		
		this.vx = 0;
		this.vy = 0;
		this.colorOff = [.1*Math.random(), .1*Math.random(),.1*Math.random()]
		this.sprite;
		this.color = [0,0,0]
	}, 
	build: function (){
		this.sprite = new PIXI.Sprite( PIXI.Texture.fromImage(this.session.buildImage2(this.radius,"#FFFFFF")));

		this.session.hitchecker.add(this)
		// move the sprite to the center of the screen
		this.sprite.position.x = this.position.x;
		this.sprite.position.y = this.position.y;
		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;
		this.sprite.tint = Math.random() * 0xFFFFFF;
		this.session.stage.addChild(this.sprite);
		this.sprite.updateTransform() 
		
	},
	destroy: function (){
		this.session.stage.removeChild(this.sprite);
	},
	update: function (){
		var movingx = false;
		var movingy = false;
		
		if(!movingx) 
			this.vx *= .9;
		else
			this.vx *= .99;
		if(!movingy) 
			this.vy *= .9;
		else
			this.vy *= .99;
		this.position.y += this.vy;
		this.position.x += this.vx;
		this.sprite.position.y = this.position.y
		this.sprite.position.x = this.position.x
		
		this.sprite.updateTransform() 

	},
	render: function (){
		this.color[0] = 1.1-this.scene.color[0]-this.colorOff[0]
		this.color[1] = 1.1-this.scene.color[1]-this.colorOff[1]
		this.color[2] = 1.1-this.scene.color[2]-this.colorOff[2]
		this.sprite.tint = PIXI.utils.rgb2hex(this.color)//Math.random() * 0xFFFFFF;

	}
});