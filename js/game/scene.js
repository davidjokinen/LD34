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