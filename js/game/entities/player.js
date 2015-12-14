var Player = BasePlayer.extend({
	init: function init(session){
		init.base.call(this);
		this.session = session;
		this.speed  =.4;
		this.position = {x:2500,y:2500}
		this.vx = 0;
		this.vy = 0;
		this.health = 100
		this.maxHealth = 100
		this.shoot = 0;
		this.pt = 5
		this.upgrades = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		this.upgradesMAX = [10,10,10,10,10,10,10,0,0,0,0,0,0,0,0,0,0]
		this.sprite;
		this.color = [0,0,0]
	}, 
	build: function (){
		this.sprite = new PIXI.Sprite( PIXI.Texture.fromImage(this.session.buildImage(25,25,"#FFFFFF")));

		this.richText = new PIXI.Text('LVL: '+this.scene.level+'\nHP: '+this.health+'/'+this.maxHealth+'\nPT: 5', { fill : '#FFFFFF', font: '30px bpdotsregular' });

		this.richText.x = 5;
		this.richText.y = (5);

		this.session.GUIstage.addChild(this.richText)

		this.richText.updateTransform() 
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
	destroy: function (){
		this.session.GUIstage.removeChild(this.richText)
		this.session.stage.removeChild(this.sprite);
		this.sprite.destroy()

	},
	update: function update(){
		var movingx = false;
		var movingy = false;
		if(this.session.input.key[87]){
			this.vy -= this.speed+this.upgrades[2]*.1;
			movingy = true;
		}
		if(this.session.input.key[83]){
			this.vy += this.speed+this.upgrades[2]*.1;
			movingy = true;
		}
		if(this.session.input.key[65]){
			this.vx -= this.speed+this.upgrades[2]*.1;
			movingx = true;
		}
		if(this.session.input.key[68]){
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
		var i = this.session.input;
		this.sprite.rotation = Math.atan2((-window.innerHeight/2+i.y),(i.x-window.innerWidth/2));
		
		if(this.session.input.mouse[0] )
			this.shooting = true
		update.base.call(this);
		this.shooting = false
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

		this.sprite.rotation = Math.atan2((-window.innerHeight/2+i.y),(i.x-window.innerWidth/2));

		if(this.session.input.mouse[0] && this.shoot ==0){
			this.shoot = 30-~~(this.upgrades[1]*5)
			if(this.shoot < 0)this.shoot = 0
			var bullets = 1+this.upgrades[0]-this.upgrades[10]
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
				this.health += this.upgrades[11]
				this.scene.add(new Bullet(this.session,newPos,angle,life,speed,size, this))
			}
			
			
		} else if(this.shoot >0){
			this.shoot--;
		}

		this.sprite.updateTransform() 

	},
	render: function (){
		this.richText.text = 'LVL: '+this.scene.level+'\nHP: '+this.health+'/'+this.maxHealth+'\nPT: '+this.pt;
		this.richText.updateTransform() 
		this.color[0] = 1-this.scene.color[0]
		this.color[1] = 1-this.scene.color[1]
		this.color[2] = 1-this.scene.color[2]
		this.sprite.tint = PIXI.utils.rgb2hex(this.color)//Math.random() * 0xFFFFFF;

	}
});