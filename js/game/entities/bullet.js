var Bullet = Entity.extend({
	init: function init(session, pos, dir, life ,speed,  size, owner, damage){
		init.base.call(this);
		this.session = session;
		this.speed  =speed || 10//+Math.random()*10;


		this.vx = 0;
		this.vy = 0;
		this.size = size || 5 
		this.owner = owner || [][0]
		this.position = pos
		this.dir = dir
		this.sprite;
		this.damage = damage || 20

		this.life = life || 30;
		this.color = [0,0,0]
	}, 
	build: function (){
		if(this.session.camera.entity == this.owner)
		this.sprite = new PIXI.Sprite( PIXI.Texture.fromImage(this.session.buildImage2(this.size,"#FFFFFF")));
		else
			this.sprite = new PIXI.Sprite( PIXI.Texture.fromImage(this.session.buildImage2(this.size,this.owner.color2)));

		this.sprite.position.x = this.position.x;	
		this.sprite.position.y = this.position.y;
		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;
		//this.sprite.tint = Math.random() * 0xFFFFFF;
		this.session.stage.addChild(this.sprite);
		this.sprite.updateTransform() 
	},
	destroy: function (){
		this.session.stage.removeChild(this.sprite);
	},
	update: function (){
		this.life--;
		var e = this.session.hitchecker.check(this.position.x,this.position.y,this.size, this.owner)
		if(e != [][0] && e == this.owner){
			this.scene.remove(this)
			return;
		}
		if(e != [][0] && e != this.owner){

			if(e.health != [][0]){
				e.health -= this.damage
				if(e.health <= 0 && this.session.camera.entity == this.owner){
					this.scene.level++;
					if(this.scene.level %10 ==0)
						this.scene.player.health = this.scene.player.maxHealth
					this.scene.player.maxHealth += 5
					this.scene.player.pt++
				}
				if(e == this.session.camera.entity){
					this.session.hurtAction()
				}
			}
			//var newPos2 = {x:this.position.x-17,y:this.position.y-17}
			//this.scene.add(new Smoke(this.session,newPos2))
			this.scene.remove(this)
			return;
		}
		if(this.life == 0){
			this.scene.remove(this)
			return;
		}
		var movingx = false;
		var movingy = false;
		
		this.position.y += this.speed*Math.sin(this.dir);
		this.position.x += this.speed*Math.cos(this.dir);
		this.sprite.position.y = this.position.y
		this.sprite.position.x = this.position.x

		var i = this.session.input;
		
		this.sprite.rotation = this.dir;
		this.sprite.updateTransform() 

	},
	render: function (){
		

	}
});