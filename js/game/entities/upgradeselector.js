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