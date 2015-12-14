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