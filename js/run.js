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