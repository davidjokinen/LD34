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