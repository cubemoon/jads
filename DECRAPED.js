DECRAPED CODE new change	testing   ccdfrgdf	ccccdvdfvfv
		// //get collision Layerdfdfdfd
		// var myCollisionLayer = me.game.currentLevel.getLayerByName("collision");
		
		
		// // Get direction of the projectil in x and y
		// var multiplierX = this.vel.x > 0 ? 1 : -1;
		// var multiplierY = this.vel.y > 0 ? 1 : -1;
		
		// // if (this.vel.x > 0) {
			// // multiplierX = 1;
		// // }else{
			// // multiplierX = -1;
		// // }
		
		// // if (this.vel.y > 0) {
			// // multiplierY = 1;
		// // }else{
			// // multiplierY = -1;
		// // } 
		

		// // Get where is the next position for projectil and see if tile is a wall if yes return true
		// var posX =  this.pos.x + ( (this.projectilData.configuracoes.spritewidth * multiplierX ) + this.vel.x);
		// var posY =  this.pos.y + ( (this.projectilData.configuracoes.spriteheight * multiplierY) + this.vel.y);
		
		// if (this.projectilData.configuracoes.image === 'snake'){
			// // console.log('multiplierY:',this.pos.y + (this.projectilData.configuracoes.spriteheight * multiplierY), 'this.vel.y:' ,this.vel.y , 'posY:',posY);
		// }
		// var myTileIsWall = myCollisionLayer.getTile( posX , posY);
		
		// // If is wall return true
		// if (myTileIsWall !== null){
			// return true;
		// }else{
			// return false;
		// }

,
	{
	"coordenadas": {"x":29,"y":43},
	"nome": "skull",
	"configuracoes" : {"image": "thrower01", "spritewidth": 32, "spriteheight": 32},
	"animacoes": {"parado": [0] , "animado": [0,1], "velocidade" : 1},
	"intervaloTempoDisparo" : [10,100],
	"nomeProjectil" : "fogo",
	"velocidade" : [0.5,2.5],
	"movimento" : "down"
	},
	{
	"coordenadas": {"x":23,"y":46},
	"nome": "beehive",
	"configuracoes" : {"image": "beehive", "spritewidth": 32, "spriteheight": 32},
	"animacoes": {"parado": [0] , "animado": [0], "velocidade" : 0},
	"intervaloTempoDisparo" : [10,100],
	"nomeProjectil" : "abelha",
	"velocidade" : [1,1],
	"movimento" : "random"
	}	

		switch (this.projectilData.movimento){
			case "down":
				this.vel.y = this.projectilData.velocity;
			break;
			
			case "up":
				this.vel.y = -this.projectilData.velocity;
			break;
			
			case "left":
				this.vel.x = -this.projectilData.velocity;
				console.log('this.vel.x:' , this.vel.x)
			break;
			
			case "right":
				this.vel.x = this.projectilData.velocity;
			break;	
			
			default:
			break;
		}

//************************************************************
//*	Trying to implement mouse movement - Pass - 09-07-2012
//************************************************************

else if (me.input.isKeyPressed('fire') || this.movemouse)
		{		
		// Save the point of mouse when clicked to go where and stop
		// the solution is add de me.game.viewport.pos with me.input.pos
		if (this.movemouse == false) {
			this.dest_point_X = me.game.viewport.pos.x + me.input.mouse.pos.x;
			this.dest_point_Y = me.game.viewport.pos.y + me.input.mouse.pos.y -43;
		}
		
		this.distancetotargetx = this.dest_point_X - this.pos.x;
        this.distancetotargety = this.dest_point_Y - this.pos.y;    
		
		// console.log("Mouse button clicked...");
		// console.log("Mouse x=" + me.input.mouse.pos.x + " y=" + me.input.mouse.pos.y);
		// console.log("Player x=" + this.pos.x + " y=" + this.pos.y);
		// console.log("Viewport x=" + me.game.viewport.pos.x + " y=" + me.game.viewport.pos.y);
		// console.log("Mouse + Viewport x=" + this.dest_point_X + " y=" + this.dest_point_Y);
		// console.log("distancetotarget x=" + this.distancetotargetx + " y=" + this.distancetotargety);

		if (Math.abs(this.distancetotargetx) > Math.abs(this.distancetotargety)){
					
			if (this.distancetotargetx > 1){
				this.vel.x = this.accel.x * me.timer.tick;
				this.xydivision = this.distancetotargety / this.distancetotargetx;
				this.vel.y = this.xydivision * this.movementspeed;
				this.setCurrentAnimation('right')
				this.direction = 'right'		
				
			}
			else{                  
				this.vel.x = -this.accel.x * me.timer.tick;
				this.xydivision = this.distancetotargety / Math.abs(this.distancetotargetx);
				this.vel.y = this.xydivision * this.movementspeed;
				this.setCurrentAnimation('left')
				this.direction = 'left'
			}
		//einde Math.abs(this.distancetotarget.x) > Math.abs(this.distancetotarget.y)
		} else{
            if (this.distancetotargety > 1){            
                this.vel.y = this.accel.x * me.timer.tick;
                this.xydivision = this.distancetotargetx / this.distancetotargety;
                this.vel.x = this.xydivision * this.movementspeed;
				this.setCurrentAnimation('down')
				this.direction = 'down'
            }
            else{
                this.vel.y = -this.accel.x * me.timer.tick;
                this.xydivision = this.distancetotargetx / Math.abs(this.distancetotargety);
                this.vel.x = this.xydivision * this.movementspeed;
				this.setCurrentAnimation('up')
				this.direction = 'up'
            }
            }
	
		
		
		if (Math.abs(this.pos.x - this.dest_point_X) < 10 && Math.abs(this.pos.y - this.dest_point_Y) < 10 )
		{
			this.movemouse = false;
			this.vel.x = 0;
			this.vel.y = 0;
		}else{
			this.movemouse = true;
		}
			
		}
		
		
//************************************************************
//*	Get jason file to memory - Pass - 09-07-2012
//************************************************************		
// $(function()
// {
	// $.getJSON(ads_json_files + "items.json",function(data)
	// {
		// // Inicializar vari�vel para ler recursos dos items
		// var count_items;
		// var ads_items_tmp=[];
		// console.log("Loaded...");
		
		// $.each(data.items, function(i,data)
		// {
			// ads_items_tmp.push({name: data.imagem.replace(".png",""),	type: "image",	src: ""+ ads_items_path + "" + data.imagem + ""});
			// count_items = i;
			// // console.log("" + data.imagem.replace(".png","") + "");
		// });
		
		// // Copy array ads_items_tmp to ads_items_final 
		// ads_items = ads_items_tmp.slice();

		// console.log("Carregados " + count_items + " Items");
		// js_ads_app.onload();
	// });
// });


//**********************************************************************
//*	ThrownEntity - Entity to test motion trajetories * Pass - 09-07-2012
//**********************************************************************
var ThrownEntity = me.CollectableEntity.extend( 
{         
    init: function (x, y, settings) 
    {               
        settings.image = "items1"; 
        settings.spritewidth = 32; 
        settings.spriteheight = 32;               
        this.parent(x, y , settings); 
        // Set the gravity - operate the velocity of free fall 
        this.gravity = 0; 
        // Set the vars for best understanding of the formula       
        launchAngle = 0; // Initial angle for launch   
        // Adjust the distance of throw - Default is right to left   
        this.addAnimation ("default",  [0]);                   
        this.setCurrentAnimation("default");
		
    }, 
    update: function() 
    {   
        // Update the object     
        // this.vel.y += this.gravity ;
		if (launchAngle == 360) launchAngle = 0;

		var x_pos = 250 + (90 * Math.sin(Number.prototype.degToRad(launchAngle)));
		var y_pos = 200 + (90 * Math.cos(Number.prototype.degToRad(launchAngle)));
		var x_pos_add = 250 + (90 * Math.sin(Number.prototype.degToRad(launchAngle + 1)));
		var y_pos_add = 200 + (90 * Math.cos(Number.prototype.degToRad(launchAngle + 1)));
		x_pos = Math.round(x_pos_add) - Math.round(x_pos);
		y_pos = Math.round(y_pos_add) - Math.round(y_pos);
		
		// **** temos que ver a dire��o e andar em x em y positivo ou negativo
 		
		// console.log("x: " + x_pos + " Y: " + y_pos); 
		this.vel.x = (this.accel.x * me.timer.tick) + x_pos;
		this.vel.y = (this.accel.y * me.timer.tick) + y_pos;
		launchAngle += 1;

		// check & update player movement
		updated = this.updateMovement();
		
		// update animation
		if (updated)
		{
			// Actualizar colis�o
			me.game.collide(this);
			// Actualizar anima��o
			this.parent(this);
		}
		return updated;
    },   
}); 



{"npc": 
[
	{
	"categoria": "amigos",
	"imagem": "f_male04.png",
	"nome": "Sr. Lei",
	"mensagem": "Ol� eu sou o senhor lei. \n Por isso tudo na ordem.",
	}
]
}



/*
-----------------------------------
Ficheiro: resources.js
Function: showMessageLayer
Comment: Display a message in the game
-----------------------------------
*/

function showMessageLayer()
{
	//Message showed
	this.messageShowing = false;
	
	this.showMessage = function(){
		$('.msgImage').attr({
		'src' : 'content/sprites/f_male04_face.png',
		'alt' : 'Testing...' 
        });
        $('.msgText,#hiddenText').html( 'Dormir!!! So podes tar bebado...<br>Vai mas e trabalhar.<br>Ainda tens que fazer as perguntas...' );

        $('#messageLayer').fadeIn( 250, function() {
            $('.msgText').scrollTop(0);
        });
		$('.msgButton').click(function() {
            alert($(this).attr("value"));
        });
		$('#target').focus();
		$('#target').keypress(function() {
			alert("Handler for .keypress() called.");
		});
	}
 
	this.hideMessage = hideMessageLayer;
}

					<input class="msgButton" type="image" src="content/images/button_a.png" value="buttonValue" />
					<input id="target" type="hidden" value="Hello there" />

/*
-----------------------------------
Ficheiro: resources.js
Function: hideMessageLayer
Comment: hide a message in the game
-----------------------------------
*/
function hideMessageLayer()
{
    $('.msgText').scrollTop(0);
    $('#messageLayer').fadeOut();
    messageShowing = false;
}

// ************************************************************



			//  --- TESTING which OBJECT ---
			// It's better to use a invisible object
			// Test if player step into position 6,10
			// console.log("Testing player position (x,y): (" + Math.round(this.pos.x/32) + "," + Math.round(this.pos.y/32) + ")");
			if (this.makeOneTime && Math.round(this.pos.x/32) == 6 && Math.round(this.pos.y/32)==9 ){
				var doorLayer = me.game.currentLevel.getLayerByName("door");
				var collisionLayer = me.game.currentLevel.getLayerByName("collision");
				// var testTile = door_layer.layerData[6][10];
				// testTile.clearTile(6,10);
				doorLayer.clearTile(6,10);
				collisionLayer.clearTile(5,10);
				collisionLayer.clearTile(6,10);
				collisionLayer.clearTile(7,10);
				// collisionLayer.clearTile(5,10);
				// collisionLayer.clearTile(7,10);	
				
				this.makeOneTime = false;
			}
			
			
					// Get answer from the mouses
		$("*", "#questionLayer").bind("click" , function(e) {
			var answerClick = this.className;
			if (answerClick[0]='r'){
				heroeAnswer = answerClick[1];
			}
			e.stopPropagation();
        });
		
				// map the touch event on the X key
		me.input.bindMouse(me.input.mouse.LEFT, me.input.KEY.T);
		
				
		//Testing mouse
		if (me.input.isKeyPressed('touch'))
		{
			if (me.input.mouse.pos.x < 100)
			{
				this.animationspeed = me.sys.fps / 20;
				this.vel.x = -this.accel.x * me.timer.tick;
				this.setCurrentAnimation('left');
				this.direction = 'left';			
			}
			else if (me.input.mouse.pos.x > 700)
			{
				this.animationspeed = me.sys.fps / 20;
				this.vel.x = this.accel.x * me.timer.tick 
				this.setCurrentAnimation('right')
				this.direction = 'right'
			}

			if (me.input.mouse.pos.y < 100)
			{
				this.animationspeed = me.sys.fps / 20;
				this.vel.y = -this.accel.y * me.timer.tick 
				this.setCurrentAnimation('up')
				this.direction = 'up'
			}
			else if (me.input.mouse.pos.y > 500)
			{
				this.animationspeed = me.sys.fps / 20;
				this.vel.y = this.accel.y * me.timer.tick 
				this.setCurrentAnimation('down')
				this.direction = 'down'
			}
		}
		
		
		
		
		
		
/*
-----------------------------------
File: resources.js
Function: showMessageLayer
Comment: Display a message in the game
-----------------------------------
*/



function showMessageLayer(msgData)
{
	$('.msgImage').attr({
		'src' : 'content/' + msgData.msgImage,
		'alt' : 'Testing...' 
	});
	$('.titleText,#hiddenText').html( msgData.msgName );
	$('.msgText,#hiddenText').html( msgData.msg );

	$('#messageLayer').fadeIn( 250, function() {
		$('.msgText').scrollTop(0);
	});
}

/*
-----------------------------------
File: main.js
Function: hideMessageLayer
Comment: hide a message in the game
-----------------------------------
*/
function hideMessageLayer()
{
	$('.msgImage').scrollTop(0);
	$('.titleText').scrollTop(0);
    $('.msgText').scrollTop(0);
    $('#messageLayer').fadeOut();
    messageShowing = false;
}		


	// var myArray = new Array(10);
	
	
	// var count = 0;
	
	// for (var i = 10; i < 10; i++) {
		// myArray[i] = new Array(10);
		// for (var j = 0; j < 10; j++) {
			// myArray[i][j] = collisionLayer[count];
			// count++;
			// console.log ('[4,3] = ' + '[' + myArray[8][8] + ']');
		// }
	// }

	// console.log ('myArray: ' + myArray);
	
	 // // var graph = new Graph([myArray]);
	// var myArray = [
        // [0,0,0,0],
        // [0,1,1,1],
        // [0,0,0,1],
		// [0,0,0,1]
    // ]
	
	// function rotateMap( mapa, tx, ty)
    // {

            // var rotated = [];

            // for(l=0;l<ty;l++){
                // c2 = 3 - l;
                // rotated[l] = [];
                // for(c=0;c<tx;c++){
                        // l2 = c;
                        // //console.debug( myArray[y] );
                        // rotated[l][c] = mapa[l2][c2];
                // }
            // }

            // return rotated;
    // }
	
	// // console.log ('myArray: ' + myArray);
	
	// var myArray = rotateMap(myLayer, 10,10);
	
    // var graph = new Graph(myArray);
	
	// //result: [0 1],[1 1],[1 2]
	// // x,y
    // var start = graph.nodes[1][1];
    // var end = graph.nodes[8][8];
    // var result = astar.search(graph.nodes, start, end);
	// var resultWithDiagonals = astar.search(graph.nodes, start, end, true);
		// console.log ('result: ' + resultWithDiagonals);
		
		var test = [[]];
		test[0][0]=1;
		console.log('Multidimensional array..', test);
		
		//Wait time in seconds standing.
		// this.wait = this.npcData.pausa.tempo * 60;
		// this.waitNode = this.npcData.pausa.passo;		

		// If there is a pause is different from -1 pause in the node
		// if(this.waitNode != -1 && this.currentPath == this.npcData.pausa.caminho){
			// if(this.waitNode == this.countPath){
				// if(--this.wait > 0 ){
					// return
				// }
			// }
		// }
		
							// this.wait = this.npcData.pausa.tempo * 60;
							
							
							{"tipo":"trigger","alvo":[6,10], "caminho": 1,"tempo":0}
