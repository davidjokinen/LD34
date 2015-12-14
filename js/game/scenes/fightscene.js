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