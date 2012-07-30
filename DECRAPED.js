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
		
		console.log("Mouse button clicked...");
		console.log("Mouse x=" + me.input.mouse.pos.x + " y=" + me.input.mouse.pos.y);
		console.log("Player x=" + this.pos.x + " y=" + this.pos.y);
		console.log("Viewport x=" + me.game.viewport.pos.x + " y=" + me.game.viewport.pos.y);
		console.log("Mouse + Viewport x=" + this.dest_point_X + " y=" + this.dest_point_Y);
		console.log("distancetotarget x=" + this.distancetotargetx + " y=" + this.distancetotargety);

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