var BasePlayer = Entity.extend({
	init: function init(session){
		init.base.call(this);
		this.session = session;
		this.speed  =.4;
		this.vx = 0;
		this.vy = 0;
		this.health = 100
		this.maxHealth = 100
		this.shoot = 0;
		this.shooting = false;
		this.pt = 5
		this.upgrades = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		this.upgradesMAX = [10,10,10,10,10,10,10,0,0,0,0,0,0,0,0,0,0]
		this.sprite;
		this.color = [0,0,0]
	}, 
	build: function build(){
		this.sprite = new PIXI.Sprite( PIXI.Texture.fromImage(this.session.buildImage(25,25,"#FFFFFF")));

		this.session.hitchecker.add(this)
		this.session.camera.entity = this;
		// move the sprite to the center of the screen
		this.sprite.position.x = this.position.x;
		this.sprite.position.y = this.position.y;
		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;
		this.sprite.tint = Math.random() * 0xFFFFFF;
		this.session.stage.addChild(this.sprite);
		this.sprite.updateTransform() 
	},
	destroy: function destroy(){
		this.session.stage.removeChild(this.sprite);
		this.sprite.destroy()

	},
	update: function update(){
		
		if(this.session.hitchecker.check(this.position.x+this.vx,this.position.y+this.vy,12,this)){
			this.vx *= -.7;
			this.vy *= -.7;
			//return;
		} else {
			this.position.y += this.vy;
			this.position.x += this.vx;
			this.sprite.position.y = this.position.y
			this.sprite.position.x = this.position.x
		}
		
		var i = this.session.input;
		//console.log(Math.atan2((-window.innerHeight/2+i.y),(i.x-window.innerWidth/2)))

		//this.shooting = false;
		if(this.shooting  && this.shoot ==0){
			this.shoot = 30-~~(this.upgrades[1]*2)
			if(this.shoot < 0)this.shoot = 0
			var bullets = 1+this.upgrades[0]+this.upgrades[6]-this.upgrades[10]
			var scatter = .4+.2*this.upgrades[0]-.2*this.upgrades[7]
			var scale = scatter/bullets
			for(var i =0;i<bullets;i++){
				var newPos = {x:this.position.x,y:this.position.y}
				var rand = -.1+.2*Math.random()
				var angle = this.sprite.rotation-scatter/2+scale*(i)+scale*Math.random()*(1+this.upgrades[8])
				var life = 130+5*this.upgrades[3]-10*this.upgrades[4]-5*this.upgrades[6]
				if(life> 200)life = 200
				if(life<20)life = 20;
				var speed = 3+this.upgrades[4]
				var size = 5+this.upgrades[5]
				var damage = 20+this.upgrades[9]*2

				this.health += this.upgrades[11]
				if(this.health > this.maxHealth)
					this.health = this.maxHealth
				this.scene.add(new Bullet(this.session,newPos,angle,life,speed,size, this, damage))
			}
			
			
		} else if(this.shoot >0){
			this.shoot--;
		}

		this.sprite.updateTransform() 

	},
	render: function (){
		this.color[0] = 1-this.scene.color[0]
		this.color[1] = 1-this.scene.color[1]
		this.color[2] = 1-this.scene.color[2]
		this.sprite.tint = PIXI.utils.rgb2hex(this.color)//Math.random() * 0xFFFFFF;

	}
});