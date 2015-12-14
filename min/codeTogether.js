 /* Simple JavaScript Inheritance with NFE's
 * MIT Licensed.
 */
// Inspired by base2 and Prototype and John Resig's class system
(function(){
	var initializing = false;

	// The base Class implementation (does nothing)
	this.Class = function(){};

	// Create a new Class that inherits from this class
	Class.extend = function extend(prop) {
		var _super = this.prototype;

		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		var prototype = new this();
		initializing = false;

		// Copy the properties over onto the new prototype
		for (var name in prop) {
			// if we're overwriting an existing function
			// set the base property
			var value = prop[name];
			if (typeof prop[name] == "function" && typeof _super[name] == "function"){
				value.base = _super[name];
			}
			prototype[name] = value;
		}

		// The dummy class constructor
		function Class() {
			// All construction is actually done in the init method
			if ( !initializing && this.init )
				this.init.apply(this, arguments);
		}

		// Populate our constructed prototype object
		Class.prototype = prototype;

		// Enforce the constructor to be what we expect
		Class.prototype.constructor = Class;

		// And make this class extendable
		Class.extend = arguments.callee;

		return Class;
	};
})();

/*
//Example from the article:
var Human = Class.extend({
	init: function (height, weight){
		this.height = height;
		this.weight = weight;
	}
});
var Mutant = Human.extend({
	init: function init(height, weight, abilities){
		init.base.call(this, height, weight);
		this.abilities = abilities;
	}
});

var theWolverine = new Mutant('5ft 3in', 300, [
	'adamantium skeleton',
	'heals quickly',
	'claws'
]);    
*/
var Camera = Class.extend({
	init: function (session){
		this.session = session;
		this.entity = [][0];
		this.x = 0
		this.y = 0

	}, 
	build: function (){

	},
	destroy: function (){

	},
	update: function (){
		
		if(this.entity != [][0]){
			//console.log(this.entity)
			this.x += .66*((this.entity.position.x-window.innerWidth/2)-this.x)
			this.y += .66*((this.entity.position.y-window.innerHeight/2)-this.y)
		}
		
	},
	render: function (){

	}
});
var Entity = Class.extend({
	init: function (session){
		this.scene = [][0];
		this.session = session;
		this.position = {x:0,y:0}
		this.radius = 20

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
var HitChecker = Class.extend({
	init: function (session){
		this.session = session;
		
		this.list = []
	}, 
	add: function(a){

		this.list.push(a)
	},
	remove: function(a){

		this.list.splice(this.list.indexOf(a),1)
	},
	removeAll: function(){
		this.list = []
	},
	check: function (x1,y1,r1, owner){
		if(x1<0)return owner
		if(x1>5100)return owner
		if(y1<0)return owner
		if(y1>5100)return owner
		for(var i =0;i<this.list.length;i++){
			var e = this.list[i]
			if(e == owner)continue;
		
			var x2 = e.position.x
			var y2 = e.position.y
			var r2 = e.radius
			if(Math.pow(x2-x1,2) + Math.pow(y1-y2,2) <= Math.pow(r1+r2,2))
				return e;
		}
		return [][0];
	},
	build: function (){

	},
	destroy: function (){

	},
	update: function (){
		
		if(this.entity != [][0]){
			//console.log(this.entity)
			this.x += .66*((this.entity.position.x-window.innerWidth/2)-this.x)
			this.y += .66*((this.entity.position.y-window.innerHeight/2)-this.y)
		}
		
	},
	render: function (){

	}
});
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
var Scene = Class.extend({
	init: function (session){
		this.session = session;
		this.list = []
	}, 
	add: function(a){
		a.scene = this;
		a.build();
		this.list.push(a)
	},
	remove: function(a){
		a.destroy();
		this.list.splice(this.list.indexOf(a),1)
	},
	build: function (){

	},
	destroy: function (){
		for(var i =0;i<this.list.length;i++){
			this.list[i].destroy()
		}
	},
	update: function (){
		for(var i =0;i<this.list.length;i++){
			this.list[i].update()
		}
	},
	render: function (){
		for(var i =0;i<this.list.length;i++){
			this.list[i].render()
		}
	}
});
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
var FightScene = Scene.extend({
	init: function init(session){
		init.base.call(this);
		this.session = session;
		this.color = [0,0,0]
		this.baddyCount = 0
		this.level = 1
		this.player;
	},
	build: function (){
		var play = new Player(this.session)
		this.player = play;
		this.add(play)
		for(var i =0;i<40;i++)
			this.add(new Rock(this.session))
		this.add(new UpgradeSelector(this.session,play))
		//for(var i =0;i<10;i++)
			//for(var q =0;q<100-this.level;q++)
			//	this.add(new Baddy(this.session))
		
	},
	destroy: function destroy(){
		destroy.base.call(this);
		this.session.camera.entity = [][0]
		this.session.camera.x = 0
		this.session.camera.y = 0
	},
	update: function update(){
		update.base.call(this);
		if(this.session.input.key[32]){
			//this.session.changeScene(new FightScene(this.session))
		}
		if(this.player.health <= 0){
			this.session.changeScene(new LoseScene(this.session))
			return;
		}
		if(this.level >= 100){
			this.session.changeScene(new WinScene(this.session))
			return;
		}
		if(this.baddyCount< 5 || this.baddyCount< 100-this.level*1.5){
			this.add(new Baddy(this.session))
			this.baddyCount++
		}
	},
	render: function render(){
		render.base.call(this);
		if(this.session.hurt >0){
			this.color[0] = 1+.23*Math.sin(t/(160-this.level)+20)
		this.color[1] = 1+.23*Math.sin(t/(160-this.level)+2)
		this.color[2] = 1+.23*Math.sin(t/(160-this.level)+48)
		}else{

			this.color[0] = .66+.23*Math.sin(t/(160-this.level)+20)
		this.color[1] = .66+.23*Math.sin(t/(160-this.level)+2)
		this.color[2] = .66+.23*Math.sin(t/(160-this.level)+48)
		}
		
		this.session.changeBackground(this.color[0],this.color[1],this.color[2])
	}
}); 
var LoseScene = Scene.extend({
	init: function init(session){
		init.base.call(this);
		this.session = session;
		this.count = 300;
	},
	build: function (){
		this.richText = new PIXI.Text('YOU DIED! YOU DIED!', { fill : '#FFFFFF', font: '60px bpdotsregular' });
		this.richText2 = new PIXI.Text('DEAD', { fill : '#FFFFFF', font: '400px bpdotsregular' });
		this.richText3 = new PIXI.Text('YOU DIED! YOU DIED!', { fill : '#FFFFFF', font: '60px bpdotsregular' });
		
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
var StartFightScene = Scene.extend({
	init: function init(session){
		init.base.call(this);
		this.session = session;
		this.count = 300;
	},
	build: function (){
		this.richText = new PIXI.Text('GET READY TO FIGHT!', { fill : '#FFFFFF', font: '60px bpdotsregular' });
		this.richText2 = new PIXI.Text('5', { fill : '#FFFFFF', font: '400px bpdotsregular' });
		this.richText3 = new PIXI.Text('GET READY TO FIGHT!', { fill : '#FFFFFF', font: '60px bpdotsregular' });
		
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
		//if(this.session.input.key[32]){
			this.count--;
			this.richText2.text = ~~(this.count/60+1)
			this.richText2.updateTransform() 
			if(this.count == 0)
				this.session.changeScene(new FightScene(this.session))
		//}

	},
	render: function render(){
		render.base.call(this);
		var t = this.session.getTime()
		this.session.changeBackground(.99+.33*Math.sin(t/30+20),.66+.33*Math.sin(t/30+0),.66+.33*Math.sin(t/30+40))
	}
});
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
var Fire = Entity.extend({
	init: function init(session, pos){
		init.base.call(this);
		this.session = session;
		this.position = pos;
		this.list = []
		this.time = 30
	}, 
	build: function (){
		this.sprites = new PIXI.ParticleContainer(100, {
		    scale: false,
		    position: true,
		    rotation: true,
		    uvs: false,
		    alpha: true
		});

		var color = PIXI.utils.hex2string(~~(PIXI.utils.rgb2hex([Math.random(),Math.random(),Math.random()])))
		for(var i =0;i<100;i++){

			this.sprite = new PIXI.Sprite( PIXI.Texture.fromImage(this.session.buildImage2(10,color)));

			// move the sprite to the center of the screen
			this.sprite.position.x = this.position.x+~~(Math.random()*100);
			this.sprite.position.y = this.position.y+~~(Math.random()*100);
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
		for(var i =0;i<100;i++)
			this.list[i].destroy()
	},
	update: function (){
		if(this.time < 0){
			this.scene.remove(this)
			return;
		}
		this.time--
		for(var i =0;i<5;i++){
			var ran = ~~(Math.random()*100)
			this.list[ran].scale.y = 1+~~(Math.random()*4);
			this.list[ran].scale.x = this.list[ran].scale.y
			this.list[ran].position.x = this.position.x+~~(Math.random()*100);
			this.list[ran].position.y = this.position.y+~~(Math.random()*100);
			this.list[ran].direction = Math.random() * Math.PI/2 +Math.PI*.66;
			this.list[ran].speed = (2 + Math.random() * 2) * 0.2;
			this.list[ran].alpha = 1
		}
		for(var i =0;i<100;i++){
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
var UpgradeSelector = Entity.extend({
	init: function init(session, player){
		init.base.call(this);
		this.session = session;

		
		this.player = player
		
		this.upgradeList = []
		this.upgradeList.push("Shoot more bullets on a shot! (+scatter)");
		this.upgradeList.push("Decrease time between shots!");
		this.upgradeList.push("Move faster!")
		this.upgradeList.push("Bullets go farther!")
		this.upgradeList.push("Bullets go faster!")
		this.upgradeList.push("Bullets are bigger!")
		this.upgradeList.push("Shoot more bullets on a shot! (-range)");
		this.upgradeList.push("Reduce Scatter!");
		this.upgradeList.push("More random! lol ;)");
		this.upgradeList.push("More damage!");
		this.upgradeList.push("Less Bullets? ):");
		this.upgradeList.push("Health on shoot! ");
		//this.upgradeList.push("Increase Max health! ");

		this.selected = ~~(Math.random()*this.upgradeList.length)
		this.got = false;

		this.life = 180;
		this.bought = 0;
		this.color = [0,0,0]
	}, 
	build: function (){
		this.richText = new PIXI.Text('Space to buy upgrade. Next upgrade in '+~~(this.life/60+1), { fill : '#FFFFFF', font: '20px bpdotsregular' });
		this.richText2 = new PIXI.Text(this.upgradeList[this.selected], { fill : '#FFFFFF', font: '40px bpdotsregular' });
		this.richText3 = new PIXI.Text("GOT UPGRADE!", { fill : '#FFFFFF', font: '60px bpdotsregular' });

		this.richText.x = window.innerWidth-this.richText.width-20;
		this.richText.y = (50);

		this.richText2.x = window.innerWidth-this.richText2.width-20;
		this.richText2.y = (10);

		this.richText3.x = window.innerWidth-this.richText2.width-20;
		this.richText3.y = (-1000);
		this.richText3.anchor.x = 0.5;
		this.richText3.anchor.y = 0.5;
	
		this.session.GUIstage.addChild(this.richText)
		this.session.GUIstage.addChild(this.richText2)
		this.session.GUIstage.addChild(this.richText3)

		this.richText.updateTransform() 
		this.richText2.updateTransform() 
		this.richText3.updateTransform() 
	},
	destroy: function (){
		this.session.GUIstage.removeChild(this.richText)
		this.session.GUIstage.removeChild(this.richText2)
	},
	update: function (){
		this.life--;
		if(this.life == 0){
			this.selected = ~~(Math.random()*this.upgradeList.length)
			this.richText2.text = this.upgradeList[this.selected]
			this.richText2.x = window.innerWidth/2-this.richText2.width/2;
			this.richText2.x = window.innerWidth-this.richText2.width-20;
			this.richText2.updateTransform() 
			this.life = 180;
		}
		if(this.bought > 0){
			this.bought--;
			if(this.bought == 0){
				this.richText3.x = window.innerWidth-this.richText2.width-20;
				this.richText3.y = (-1000);
				this.richText3.updateTransform() 
			}
		} else {
			
		}
		var movingx = false;
		var movingy = false;
		if(this.session.input.key[32] && !this.got && this.player.pt >0){
			this.player.pt--;
			this.player.upgrades[this.selected] = this.player.upgrades[this.selected] + 1
			this.got = true
			this.richText3.x = window.innerWidth/2//-this.richText3.width/2;
				this.richText3.y = (window.innerHeight/2);
				this.richText3.updateTransform() 
				this.richText3.rotation = Math.random()*4-2
				this.bought = 30;

		} else if(!this.session.input.key[32]){
			this.got = false
		}
		this.richText.text = 'Space to buy upgrade. Next upgrade in '+~~(this.life/60+1)

	},
	render: function (){
		

	}
});
WebFontConfig = {
    custom: {
        families: ['bpdotsregular'], // name of your fonts, same as the ones in the CSS
        urls: ['fonts/stylesheet.css'], // link to your CSS file(s)
    },

    /* active is the callback function called when all your fonts are ready */
    active: init
};
WebFont.load(WebFontConfig);


function init(){
	
	build()
    animate()
}

var session = {}
var activeScene = [][0];
var renderer = [][0]
var that = this;
var t = 0;

function build() {
	renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight,{backgroundColor : 0x1099bb});
	renderer.plugins.interaction.destroy()
	PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
	document.body.appendChild(renderer.view);
	var pstage = new PIXI.Container();
	var stage = new PIXI.Container();
	var GUIstage = new PIXI.Container();
	pstage.addChild(stage)
	pstage.addChild(GUIstage)
	var input = new Inputs(session);
	session.changeScene =  function(scene){
		that.session.hitchecker.removeAll()
		that.activeScene.destroy()
		that.activeScene = scene
		that.activeScene.build()
	}
	session.changeBackground = function(r,g,b){
		that.renderer.backgroundColor = PIXI.utils.rgb2hex([r,g,b])
	}
	session.buildImage = function(x,y,color){
		var canvas = document.createElement("canvas"),  
		ctx = canvas.getContext('2d');
		canvas.width	= x;
		canvas.height 	= y;
	
		ctx.fillStyle = color;  
		ctx.fillRect(0, 0, canvas.width, canvas.height); 

		return canvas.toDataURL("image/png") ; 
	}
	session.buildImage2 = function(r,color){
		var canvas = document.createElement("canvas"),  
		ctx = canvas.getContext('2d');
		canvas.width	= 2*r;
		canvas.height 	= 2*r;
	
		ctx.fillStyle = color;  
		ctx.beginPath();
		ctx.arc(r,r,r,0,2*Math.PI);
		ctx.fill();

		return canvas.toDataURL("image/png") ; 
	}
	session.getTime = function(){
		return that.t;
	}
	session.hurtAction = function(){
		that.session.hurt = 10;
		that.session.stage.filters = [that.session.invertFilter];
	}
	session.invertFilter = new PIXI.filters.InvertFilter();
	session.hitchecker = new HitChecker(session)
	session.renderer = renderer
	
	session.stage = stage
	session.GUIstage = GUIstage
	session.pstage  = pstage
	session.camera = new Camera(session)

	that.activeScene = new StartScene(session)
	that.activeScene.build()
	
}
 
function animate() {
	
			
   
    that.activeScene.update();
    that.activeScene.render();

    session.camera.update()
    session.stage.position.y = -that.session.camera.y;
	session.stage.position.x = -that.session.camera.x;
	//console.log(that.session.camera.y)
	session.stage.updateTransform() 
	if(that.session.hurt > 0){
		that.session.hurt--;
		if(that.session.hurt == 0)
			that.session.stage.filters = [][0];
	}
    renderer.render(session.pstage);
    t++;
   

    requestAnimationFrame(animate);
}