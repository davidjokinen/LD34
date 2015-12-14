var Baddy = BasePlayer.extend({
	init: function init(session, pos){
		init.base.call(this);
		this.session = session;
		if(pos == [][0]){
			do{
				posx = Math.random()*4000
				posy = Math.random()*4000
			}while(this.session.hitchecker.check(posx,posy,20));
			pos = {x:posx,y:posy}
		}
		this.position = pos;
		this.color2 = PIXI.utils.hex2string(~~(PIXI.utils.rgb2hex([Math.random(),Math.random(),Math.random()])))
		
		this.level = 1
		
		
		this.sprite;
		this.color = [0,0,0]
	}, 
	build: function (){
		this.sprite = new PIXI.Sprite( PIXI.Texture.fromImage(this.session.buildImage(25,25,this.color2)));
		this.session.hitchecker.add(this)
		// move the sprite to the center of the screen
		this.level = this.scene.level;
		for(var i =0;i<this.level;i++)
			this.upgrades[~~(Math.random()*12)]++

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
		this.sprite.destroy()
	},
	update: function update(){
		var movingx = false;
		var movingy = false;
		if(this.health <= 0){
			var newPos2 = {x:this.position.x-62,y:this.position.y-62}
			this.scene.add(new Fire(this.session,newPos2))
			this.session.hitchecker.remove(this)
			this.scene.baddyCount--
			this.scene.remove(this)
			return;
		}
		if(this.level < this.scene.level){
			this.upgrades[~~(Math.random()*6)]++
			this.level++
		}
		if(Math.random()<.3){
			this.vy -= this.speed+this.upgrades[2]*.1;
			movingy = true;
		}
		if(Math.random()<.3){
			this.vy += this.speed+this.upgrades[2]*.1;
			movingy = true;
		}
		if(Math.random()<.3){
			this.vx -= this.speed+this.upgrades[2]*.1;
			movingx = true;
		}
		if(Math.random()<.3){
			this.vx += this.speed+this.upgrades[2]*.1;
			movingx = true;
		}



		if(!movingx) 
			this.vx *= .9;
		else
			this.vx *= .99;
		if(!movingy) 
			this.vy *= .9;
		else
			this.vy *= .99;
		if(Math.random()<.03 )
			this.shooting = true
		update.base.call(this);
		this.shooting = false
		this.sprite.rotation += -.1+.2*Math.random()
		return;
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

		this.sprite.rotation += -.1+.2*Math.random()

		if(Math.random()<.1 && this.shoot ==0){
			this.shoot = 30-~~(this.upgrades[1]*12)
			if(this.shoot < 0)this.shoot = 0
			var bullets = 1+this.upgrades[0]*2
			var scatter = .4+.2*this.upgrades[0]
			var scale = scatter/bullets
			for(var i =0;i<bullets;i++){
				var newPos = {x:this.position.x,y:this.position.y}
				var rand = -.1+.2*Math.random()
				var angle = this.sprite.rotation-scatter/2+scale*(i)+scale*Math.random()
				var life = 130+5*this.upgrades[3]-15*this.upgrades[4]
				if(life> 200)life = 200
				if(life<20)life = 20;
				var speed = 3+this.upgrades[4]
				var size = 5+this.upgrades[5]
				this.scene.add(new Bullet(this.session,newPos,angle,life,speed,size, this))
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