/*This software is released under MIT License. Texts for  license are listed below:

 * Aventura do Saber , a educational fantasy action RPG
 * Copyright (c) 2012-2013, ITSimples Games

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// *************************
// ****  Entidade Heroi *****
// **** Hero entity *********
// *************************
var HeroEntity = me.ObjectEntity.extend({
	//Construtor: test
	init:	function (x , y , settings){ 
		//Definir propriedades do objecto heroi na classe em vez de no mapa:
		settings.image="h_male01"; 
		settings.spritewidth=32;

		// Chamar o contrutor
		this.parent(x, y , settings);
		
		// console.log("TESTING BRANCH...");
		
		//Debug Position
		
		this.pos.x = this.posBeforeCollideX = startHero[0] * ads_tile_size;
		this.pos.y = this.posBeforeCollideY = startHero[1] * ads_tile_size;
		
		// This move
		this.movemouse = false;
		
		this.distancetotargetx = 0;
		this.distancetotargety = 0;
		this.xydivision = 0;
		
		// Configurar velocidade do jogador
		this.setVelocity(heroVelocity, heroVelocity);
		
		// Configurar velocidade de travagem
		// Valores maiores tempo de travagem menor
		this.setFriction(0.5, 0.5);
		
		// adjust the bounding box
		this.updateColRect(4,24,20,23);
		
		// this.updateColRect(-1,0,20,27);
		
		// disable gravity
		this.gravity = 0;
		
		//Direção inicial
		this.direction = 'down';
		
		this.collidable= true;

		//Config npc's animation	
		this.renderable.addAnimation("stand-down", [4]);
		this.renderable.addAnimation("stand-left", [8]);
		this.renderable.addAnimation("stand-up", [1]);
		this.renderable.addAnimation("stand-right", [11]);
		this.renderable.addAnimation("down", [3,4,5,4]);
		this.renderable.addAnimation("left", [6,7,8]);
		this.renderable.addAnimation("up", [0,1,2,1]);
		this.renderable.addAnimation("right", [9,10,11]);
		
		// Define point of click on mouse :
		this.dest_point_X = 0;
		this.dest_point_Y = 0;
		
		// Viewport follow hero
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		
		//TESTING.... 
		this.makeOneTime = true;
		
		//Check if is showing the inventory enable/disable
		this.isShowInv = false;

        //Check if is showing the inventory enable/disable
        this.isShowHelp = false;
        		
		// DEBUG GET KEY TO HERO 
		// adsGame.Inventory.addItem(  ads_items_data[14] );
		
		// Set hero object type
        this.type = 'HERO_OBJECT';
        
        // Set to true if hero carries a weapon
        this.heroCarryWeapon = false;
        
        // Change Inventory and question layer position
        this.layerPosition = "right";
        
        // Keep this last direction to change only when hero change is direction
        this.lastDirection = this.direction;
        
	},
	
	//Create weapon player position.
    createWeapon : function ( weapon )
    {
        // console.log("Weapon:", weapon);
        
        // Set global name of weapon
        heroWeaponName = weapon.valor;
        
        // Create Thrower with the weapon to hero
        var throwerData = throwersData["thr" + weapon.valor];
        
        this.heroWeapon = new throwersEntity( this.pos.x , this.pos.y , throwerData);
        
        
        me.game.add( this.heroWeapon , 9 );
        me.game.sort.defer();
        
       // console.log("this.heroWeapon z: ", this.heroWeapon.z);
        
        // Hero was a weapon now
        this.heroCarryWeapon = true;
        
        // Global hero don't have weapon anymore'
        heroWeaponEnable = false;
    },
    
    //Create weapon player position.
    removeWeapon : function removeWeapon( weaponName )
    {
        // Remove hero wepon
        me.game.remove(this.heroWeapon);
        
        // Remove weapon item from inventory
        adsGame.Inventory.removeItem( weaponName );
                
        // Hero wasn't a weapon now
        this.heroCarryWeapon = false;
        
        // Remove hero weapon slot
        heroWeaponSlot = -1;
        
        // Remove hero weapon name
        heroWeaponName = "";
        
        this.walkSound = false;
    },
	
	//Update player position.
	update : function ()
	{
	    // DEBUG MODE remove
        if (DEBUG_MODE && this.makeOneTime && giveItemDebug !== undefined ){
            ads_items_data[giveItemDebug].specialItem = true;
            // Add item to hero
            adsGame.Inventory.addItem(ads_items_data[giveItemDebug]);
            
            this.makeOneTime = false;
        }
        
        // console.log("Hero Position X:" , this.pos.x , "Y: " , this.pos.y);
        
    	if (me.input.isKeyPressed('left'))
		{
			this.animationspeed = me.sys.fps / (me.sys.fps / 3);

			this.vel.x = -this.accel.x * me.timer.tick;
			this.renderable.setCurrentAnimation('left');
			this.direction = 'left';
		}
		else if (me.input.isKeyPressed('right'))
		{
			this.animationspeed = me.sys.fps / (me.sys.fps / 3);
			this.vel.x = this.accel.x * me.timer.tick; 
			this.renderable.setCurrentAnimation('right');
			this.direction = 'right';
		}

		if (me.input.isKeyPressed('up'))
		{
			this.animationspeed = me.sys.fps / (me.sys.fps / 3);
			this.vel.y = -this.accel.y * me.timer.tick; 
			this.renderable.setCurrentAnimation('up');
			this.direction = 'up';
		}
		else if (me.input.isKeyPressed('down'))
		{
			this.animationspeed = me.sys.fps / (me.sys.fps / 3);
			this.vel.y = this.accel.y * me.timer.tick; 
			this.renderable.setCurrentAnimation('down');
			this.direction = 'down';
		}
		
		// Debug mode speed up player
		if (me.input.isKeyPressed('ctrl')){
			if (me.input.isKeyPressed('speedup')){			
				heroVelocity = heroVelocity + 1;
				this.setVelocity(heroVelocity, heroVelocity);
				me.game.HUD.updateItemValue('velocidade' , parseInt(1, 10));
			}else if (me.input.isKeyPressed('speeddown')){
				heroVelocity = heroVelocity - 1;
				this.setVelocity(heroVelocity, heroVelocity);
				me.game.HUD.updateItemValue('velocidade' , parseInt(-1, 10));
			}
		}
			
		// If keypressed I then open the inventory
		if (me.input.isKeyPressed('inventory'))
		{
			if (this.isShowInv){
				adsGame.Inventory.hide();
				// Disable showing
				this.isShowInv = false;
			}else{
				adsGame.Inventory.show();
				// Enable showing
				this.isShowInv = true;
			}			
		}
		
        // If keypressed H then open Help window
        if (me.input.isKeyPressed('helpWindow'))
        {  
            //If finished window is opened then don't show help
            if ( !adsGame.lvlFinishedWindow.isShowing() ) {         
                if (this.isShowHelp){
                    adsGame.helpwindow.hide();
                    // me.state.resume();
                    // Disable showing
                    this.isShowHelp = false;
                }else{
                    adsGame.helpwindow.show();
                    me.state.pause();
                    me.event.subscribe(me.event.KEYDOWN, function watch_key(action) {
                        if (action == "helpWindow") {
                            me.state.resume();
                        }
                    });
                    // Enable showing
                    this.isShowHelp = true;
                }
            }           
        }		
		
		//Change inventory and question layer position
		// if ( this.pos.x < 1300){
		    // console.log("Inventory on the right and question on the left.");
            // $('#inventoryLayer').css({
                // "top": "33px" , 
                // "right": "0px"
            // });   
//             
            // this.layerPosition = "right";
		// }else{
		    // console.log("Inventory on the left and question on the right.");
           // $('#inventoryLayer').fadeOut( 1000 , function(){
                 // $('#inventoryLayer').css({
                // "top": "33px" , 
                // "right": "620px"
                // });   
                // $('#inventoryLayer').fadeIn( 1000 );
           // } );
// 
		    // this.layerPosition = "left";
		// }
	
		// If player Stop set stand animationa
		if (this.vel.y === 0 && this.vel.x === 0)
		{
			this.renderable.setCurrentAnimation('stand-' + this.direction);
		}else{
		    // play a "herowalk" sound
		    if ( !this.walkSound ){
		        this.walkSound = true;
                me.audio.play("herowalk",false, (function(){
                    this.walkSound = false;
                }).bind(this) , 0.2);
            }

		}

		// If question box is showing then stop the player
		if (showingQuestion){
			this.renderable.setCurrentAnimation('stand-' + this.direction);
			this.vel.x = 0;
			this.vel.y = 0;
		}
		
		// If hero carry a weapon ?
		if (this.heroCarryWeapon){
		   // But this values on Json to work with any NPC that attack
           switch (this.direction){
                  case "left":
                                addToPosX = this.heroWeapon.throwerData.posicaoAtirador.left[0];
                                addToPosY = this.heroWeapon.throwerData.posicaoAtirador.left[1];
                               // Flip weapon
                               this.heroWeapon.flipX(true);
                               break;
                  case "right":
                                addToPosX = this.heroWeapon.throwerData.posicaoAtirador.right[0];
                                addToPosY = this.heroWeapon.throwerData.posicaoAtirador.right[1];
                               this.heroWeapon.flipX(false);
                               break;
                  case "up":
                                addToPosX = this.heroWeapon.throwerData.posicaoAtirador.up[0];
                                addToPosY = this.heroWeapon.throwerData.posicaoAtirador.up[1];
                               this.heroWeapon.flipX(false);
                               break;
                  case "down":
                                addToPosX = this.heroWeapon.throwerData.posicaoAtirador.down[0];
                                addToPosY = this.heroWeapon.throwerData.posicaoAtirador.down[1];
                               this.heroWeapon.flipX(false);
                               // TODO Must refresh the animation 
                               break;                                
                                        
           }
           this.heroWeapon.pos.x = (this.pos.x + addToPosX);
           this.heroWeapon.pos.y = (this.pos.y + addToPosY);
           
            // Make only when change direction to improve velocity
            if ( this.direction !== this.lastDirection ) {
                 // Change Z index when NPC UP
                 
                 if ( this.direction !== "down" && this.direction !== "left"){ 
                    this.heroWeapon.z = this.z - 1;
                }else{
                    this.heroWeapon.z = this.z + 1;
                }

                me.game.sort();
                
                // Keep this last direction to change only when hero change is direction
                this.lastDirection = this.direction;
            }
		}

		// update collision
		var res = me.game.collide(this , true);
		var self =this;
		
		// Keep hero position before collide
		if( res.length == 0 ){
                    // Save the last hero coordinates before collide with something
                    self.posBeforeCollideX = self.pos.x;
                    self.posBeforeCollideY = self.pos.y;
            }

        
        
        // If hero collide with more then one item at same time
        var countCollideItems = 0;
        
        $.each(res,(function(i,data){
            if ( data.obj.type == "ITEM_OBJECT" ){
                countCollideItems++;
            }
        }).bind(this));

		//  --- TESTING which OBJECT --- multiple collisions
        $.each(res, function(i,data)
        {
    		if (data){
    		    
    		        // If more then one item is collide then do nothing hero must collide with only one item
        			if (data.obj.type == 'ITEM_OBJECT' && countCollideItems < 2) {
        				// console.log('Hero Collide with Item...' , res.obj.items_data);
        				// this.setCurrentAnimation('stand-' + this.direction);
        				// this.pos.x = this.posBeforeCollideX;
        				// this.pos.y = this.posBeforeCollideY;
        				
        				// console.log ("****First Time:" , adsGame.Inventory.itemExists( data.obj.items_data ));
        				
        				if ( (!fullInventory && adsGame.Inventory.itemExists( data.obj.items_data ) != -2 ) || (fullInventory &&
        				     (adsGame.Inventory.itemExists( data.obj.items_data ) != -1 &&  adsGame.Inventory.itemExists( data.obj.items_data ) != -2) )
        				   || data.obj.items_data.specialItem || data.obj.items_data.categoria == 'ouro' || data.obj.items_data.categoria == 'conhecimento' ){
        					self.vel.x = 0;
        					self.vel.y = 0;
        					data.obj.getItem();
        				}else{
        					adsGame.Inventory.show();
        				}
        			}
        			
        			if (data.obj.type == 'NPC_OBJECT') {
                         // NPC collide with hero - Don't change NPC direction otherwise NPC and hero stand back to back
                         // If NPC collide with hero and have opposite directions then NPC don't change his direction
                         if ( data.obj.heroChangeDirection )
                            data.obj.changeNPCDirection = false;
        			}
    		}
		});
		
        // If hero died
        // console.log( "me.game.HUDgetItemValue(vida)" , me.game.HUD.getItemValue("vida"));
        if ( me.game.HUD.getItemValue("vida") <= 0 ){
            // console.log("Player is dead");
            // Pause the game
            me.state.pause();
            // Show window game over
            adsGame.heroDies.show()
        }

		// check & update player movement
		updated = this.updateMovement();

		// update animation
		if (updated)
		{
			// Actualizar animação
			this.parent(this);
		}
		
		return updated;

	}, // End update method
	
    onDestroyEvent : function(){
        // console.log("Hero was destroyed...");
        // When hero was destroyed
        //Reset hero global variables
        setInitialHeroVariables();
    }
});
// *****************************
// ****  Fim Entidade Heroi ****
// *****************************



// *************************
// ****  Entidade Item  ****
// *************************
var ItemEntity = me.CollectableEntity.extend({
	
	//Construtor:
	init:	function (x , y , settings , items_data){
		// Chamar o contrutor
		this.parent(x, y , settings);
		// Item data
		this.items_data = items_data;
		
		if (typeof this.items_data.specialItem !== 'undefined' && this.items_data.specialItem) {
			this.specialItem = true;
		}else{
			this.specialItem = false;
		}
		
		// console.log ("Item name:", this.items_data.nome , " - Special Item:" , this.specialItem);
		
		// La
		adsQtnDataKeys = Object.keys(adsQtnData);
		countQtn = adsQtnDataKeys.length;
		
		// Random question number between 0 and number of question less one 
		// var rndQuestion = randomInt( 0 , (countQtn - 1) );

		// this.rndQtnData = adsQtnData[adsQtnDataKeys[rndQuestion]];

                
        this.rndQtnData = adsQtnData[adsQtnDataKeys[qstDone]];
        
        qstDone++;
        
        if ( qstDone == countQtn )
            qstDone = 0;
		
		this.type = 'ITEM_OBJECT';
		
		//Change animation if is a special item or not
		if (!this.specialItem) {
			// Item sparkle animation
			this.itemAnimation = new effect(
				this.pos.x - 8 , this.pos.y - 8, // Coordinates
				me.loader.getImage("sparkle"),	// Image
				40, 40, // Size
				[0,1,2,3,4,5,6,7,8,9,10,11,12,13], //Animation sheet
				30, // Speed between 0 - Slowest and 60 - fastest
				true, // Repeat animation
				100 // Wait between animations 10 milliseconds
				);
		}else{
			// Item sparkle animation
			this.itemAnimation = new effect(
				this.pos.x - 8 , this.pos.y - 8 , // Coordinates
				me.loader.getImage("questitem"),	// Image
				45, 45, // Size
				[0,1,2,3,4,5,6,7,8], //Animation sheet
				20, // Speed between 0 - Slowest and 60 - fastest
				true,
				0
				);
		}

		me.game.add(this.itemAnimation, 6);
		me.game.sort();
	},
	
	
	getItem : function ()
	{
		//When player collide with item Stop player and ask question
		var player = adsGame.heroEntity();
		
		// If the answer is correct then update HUD and remove item
		heroAnswer = showQuestionLayer(this.items_data , this.rndQtnData);
		
		if (heroAnswer != -1)
		{
			if ( heroAnswer == this.rndQtnData.correta){ // if hero correct answer			
				// me.game.HUD.updateItemValue(this.items_data.categoria, parseInt(this.items_data.valor));
				
				//Keep data for all items found by the hero less gold and knowledge increment right away
				if (this.items_data.categoria == 'ouro' ||
					this.items_data.categoria == 'conhecimento'){
					me.game.HUD.updateItemValue(this.items_data.categoria , parseInt(this.items_data.valor, 10));
				}else{
			
			adsGame.Inventory.addItem( this.items_data );
				}						
				hideQuestionLayer('C');
			}else if(heroAnswer != 0){ // if hero answer to the question but it's not the correct one
				var valueRemoved = -(parseInt(this.items_data.valor,10));
				
				//If is velocity then don't remove points
				if (this.items_data.categoria != 'velocidade'){
				    if (this.items_data.categoria == 'vida'){
				        // play a "hitplayer" sound
                        me.audio.play("hithero", false , null , hitHeroVolume);
                        // let's flicker in case we loses health
                        player.renderable.flicker(25);
				    }
					me.game.HUD.updateItemValue(this.items_data.categoria, valueRemoved);
				}	
				hideQuestionLayer('W');
			}else{ // If hero doesn't answer to the question
				hideQuestionLayer('D');
			}
			
			//If correct answer and specialitem remove item - If not special item remove always the item
			if ( (!this.specialItem) || (this.specialItem &&  heroAnswer == this.rndQtnData.correta) ){
				// Remove Item 
				me.game.remove(this);
				
				// Remove sparkle item animation
				me.game.remove(this.itemAnimation);
			}else{ 
				// If is a Special item and the answer is not the correct 
				// then position hero to last position with no collition with item
				player.pos.x = player.posBeforeCollideX;
				player.pos.y = player.posBeforeCollideY;
				
				// If remove helath then play hit sound and flicker player
                if (this.items_data.remover == 'vida'){
                    // play a "hitplayer" sound
                    me.audio.play("hithero", false , null , hitHeroVolume);
                    // let's flicker in case we loses health
                        player.renderable.flicker(25);
                }
                
                // Remove special item value    
				var valueRemoved = -(parseInt(this.items_data.quantidade,10));
				me.game.HUD.updateItemValue(this.items_data.remover, valueRemoved);
			}
		}
		
		//Destroy player variable
		player = undefined;
	}
});

// **************************************
// ****  Distribuir items pelo mapa  ****
// **************************************
//me.InvisibleEntity has been removed, as following previous changes,
//this can now be achieved using a me.ObjectEntity without a renderable component.
var ItemSpawnEntity = me.ObjectEntity.extend({
	
	//Construtor:
    init: function(x, y, settings) {
        this.parent(x, y, settings);
        this.gravity = 0;
		
		var item = [];
		
		var count = 0;
		
		//Create array to store coordinates data
		var checkTriggersData = [];
		
		var checknoItemsData = [];
		
		var collision_layer = me.game.currentLevel.getLayerByName("collision");
				
			
		var background_layer = me.game.currentLevel.getLayerByName("background");
		
		//returns an array of all enumerable property names defined by a given object
        var item_keys = Object.keys(ads_items_data);
		
		//Improve this to not spwan items on triggers points
        //Triggers Points
        $.each(triggersData, function(i, data){
            // create a array to store de tiles that belong to trigger
            // create the array outside this cicle because don't repeat the same code several times'            
            var finalHeight = ( data.settings.height / 32 );
            var finalWidth  = ( data.settings.width  / 32 );
            
            // console.log("Trigger:", data);
            // console.log("Width:", finalWidth);
            // console.log("Height:", finalHeight);

            for ( x = 0; x < finalWidth ; x++) 
            {
                for ( y = 0; y < finalHeight ; y++) 
                { 
                    //Store data coordinates
                    var triggersCoordinates = {};
                    triggersCoordinates.x = ( data.coordinates.x + x);
                    triggersCoordinates.y = ( data.coordinates.y + y);
                    
                    // console.log("triggers data:", triggersCoordinates);
                    checkTriggersData.push(triggersCoordinates);
                }
            }
        }); 
        
        //noItemsData Points
        $.each(noItemsData, function(i, data){
            // create a array to store de tiles that belong to trigger
            // create the array outside this cicle because don't repeat the same code several times'            
            var finalHeight = ( data.settings.height / 32 );
            var finalWidth  = ( data.settings.width  / 32 );

            for ( x = 0; x < finalWidth ; x++) 
            {
                for ( y = 0; y < finalHeight ; y++) 
                { 
                    //Store data coordinates
                    var noItemsCoordinates = {};
                    noItemsCoordinates.x = ( data.coordinates.x + x);
                    noItemsCoordinates.y = ( data.coordinates.y + y);
                    
                    // console.log("triggers data:", triggersCoordinates);
                    checknoItemsData.push(noItemsCoordinates);
                }
            }
        });         
		
		// parse all the collision layer tiles 
		for ( x = 0; x < collision_layer.cols; x++) 
		{
			for ( y = 0; y < collision_layer.rows; y++) 
			{
			   
				var testTileCollision = collision_layer.layerData[x][y];
				var testTileBackground = background_layer.layerData[x][y];

				// If tile of layer collision is null then we can put an item
				if (testTileCollision === null && testTileBackground !== null){					
					// Item probability
					var item_probability = Number.prototype.random(0, itemLucky);
					// Total of items
					total_items = item_keys.length - 1;
					
					// If is a mission item don't spawn
					do{	// If mission item then random new item				    
					    //random a item
                        var randomNumber = Number.prototype.random(0, total_items);
                        var random_item = item_keys[randomNumber];
					}while ( ads_items_data[random_item].categoria == "itemMissao" );	

					if ( item_probability == Math.round(itemLucky / 2) ){						
						//Test if not a trigger or special item or born hero
						var isCollide = false;
						
						// $.each(triggersData, function(i, data){
							// if (data.coordinates.x == x && data.coordinates.y == y)
								// isCollide = true;
						// });
						
						//Improve this to not spwan items on mission tiles
						//special item
						$.each(specialItemsData, function(i, data){
							if (data.coordinates.x == x && data.coordinates.y == y){
								isCollide = true;
							}
						});	
						
                        // If is a trigger don't put object
                        $.each(checkTriggersData, function(i, data){
                            if (data.x == x && data.y == y){
                                isCollide = true;
                                // console.log("Collide with trigger tile!");
                            }
                        }); 
                        
                        // If is a noitems don't put object
                        $.each(checknoItemsData, function(i, data){
                            if (data.x == x && data.y == y){
                                isCollide = true;
                                // console.log("Collide with noItems tile!");
                            }
                        });                         
						
						//Hero born
						if (x == startHero[0] && y == startHero[1])
								isCollide = true;
						
						// Not to spawn item with json criarinicio =false
						if ( ads_items_data[random_item].criarinicio !== undefined && !ads_items_data[random_item].criarinicio){
						    isCollide = true;
						}
						
						if (!isCollide)
						{
							// Item Image
							item[count] = new ItemEntity(parseInt(ads_tile_size*x ,10), parseInt(ads_tile_size*y ,10), 
									{image: ads_items_data[random_item].imagem.replace(".png",""),
									spritewidth: 32, spriteheight: 32}, ads_items_data[random_item]);
							count++;
							// console.log("Populate Map... X:" + parseInt(32*x) +
										// "   Y:" + parseInt(32*y) + 
										// " dss  Count:" + count + "    Item: " + random_item);
						}
					}
				
				}
			}
		}
		
		// add items on layer 5
		$.each(item, function(i, item){
			me.game.add(item,5);
			me.game.sort();
		});
		

		//Spawn special items
		$.each(specialItemsData, function(i, dataSpecialItem){
			$.each(ads_items_data, function(i, ads_item_data){
				// console.log('dataSpecialItem.value: ' + dataSpecialItem.value + '  ads_item_data.valor: ' + ads_item_data.valor);
				if ( dataSpecialItem.value == ads_item_data.valor)
				{
					ads_item_data.remover = dataSpecialItem.remover;
					ads_item_data.removerNome = dataSpecialItem.removerNome;
					ads_item_data.quantidade = dataSpecialItem.quantidade;
					ads_item_data.specialItem = true;
					item = new ItemEntity(parseInt(ads_tile_size*dataSpecialItem.coordinates.x , 10), parseInt(ads_tile_size*dataSpecialItem.coordinates.y ,10), 
					{image: ads_item_data.imagem.replace(".png",""),
					spritewidth: 32, spriteheight: 32}, ads_item_data);
					me.game.add(item,5);
					me.game.sort();
				}
			});
		});
	}
});

// **************************************
// ****  TRIGGER INVISIBLE ENTITY  ****
// **************************************
//me.InvisibleEntity has been removed, as following previous changes,
//this can now be achieved using a me.ObjectEntity without a renderable component.
var TriggerEntity = me.ObjectEntity.extend({
	
	//Constructor
	init: function( x , y , settings , triggerData){
		
		this.parent(x, y , settings );
		
		this.collidable = true;
		
		this.triggerData = triggerData;
		
		// prepare data to message box
		this.msgData = {};
		this.msgData.msgImage = 'sprites/items/' + triggerData.imageName;
		this.msgData.msgName = language.system.TRmessage;
		this.msgData.msg = language.triggers[triggerData.message];		
		this.type = triggerData.type;

		this.targX = triggerData.target.x;
		this.targY = triggerData.target.y;

		this.solution = this.triggerData.solution;		
		
		//add remove option
		this.remove = this.triggerData.remove;
		//check first time pull the trigger
		this.oneTime = false;

        //check one time for collision to trigger when leave trigger variable reseted
		this.oneTimeCollide = false;
		
		// Check if requirements are satisfied to pull the trigger default is true
		this.pullTrigger = true;
		
		//Get data from trigger new NPC
		if(this.type == "NEW_NPC"){
		    //Get data that only exists on NEW_NPC trigger
		    this.npcName = triggerData.npcName;
		    
		    //Get effect to rise the new NPC
		    this.appearEffect = adsNpcData[ this.npcName].appearEffect;
		}	
		
		this.checkSolution = false;
		this.isChecked = false;

		// Create message box for object
		this.message = new adsGame.Message();
		
		//Update always
		this.alwaysUpdate = false;
		
		//  Show message and play sound only one timw when hero does'nt have the door key
		this.oneTimeSoundMessage = false;
		
		// Check requirement if exists only one time
		this.checkRequirementOne = false;
	},

	update : function (){
		// Check collisions
		var res = me.game.collide( this );
        if( res ) {
			if( res.obj.name == 'hero' ) {
			    
				// Verify if hero have the item only one time
				if (!this.isChecked)
				{
					//Create variable to work for each ?!?!?!?!?
					var solution = this.solution;
					var checkSolution = false;
					// Get index where hero have the key to remove that from the inventory
					var itemIndex = null;
					
					//Make it check one time only - Problem var checkSolution = false; have to go inside if doorobject
					//check if hero have the Solution			
					$.each(heroItems, function(i,data)
					{
						//Check if array is undefined to avoid error (may have empty slots)
						if (typeof data !== 'undefined'){
							if (data.valor == solution){
								// console.log('Hero have the key.', i);
								checkSolution = true;
								itemIndex = i;
							}
						}
					});
					
					this.checkSolution = checkSolution;
					this.isChecked = true;
					
					// console.log('Test times...' + this.checkSolution);
					// console.log('Remove the item number : ' + itemIndex);
					
					// If hero have the solution and if the solution is not a subcategoria weapon
					// Remove item from inventory - Index + 1 Slot number 					
					if (itemIndex !== null && heroItems[itemIndex].subcategoria !== "weapon"){
					   adsGame.Inventory.removeItem( 'Slot0' + (itemIndex + 1) );
					}
				}
				
				// If trigger is a chest object
                if (this.type == 'CHEST_OBJECT'){
                    
                    var self = this;
                    
                    if (this.checkSolution){
                        // Remove old chest to empty chest
                        var lowerObjects = me.game.currentLevel.getLayerByName("lower objects");
                        
                        //Give tile number create a classe with good methods to the game
                        // console.log("Tile number:" , lowerObjects.getTileId(this.targX * 32, (this.targY + 3) * 32));
                        
                        //Remove chest
                        lowerObjects.clearTile(this.targX , this.targY);
                        lowerObjects.clearTile(this.targX , this.targY + 1 );
                        
                        //New upper door exploded
                        lowerObjects.setTile(this.targX , this.targY , 293);
                        lowerObjects.setTile(this.targX , this.targY + 1 , 294);
                        
                        //Next Give Item
                        // Show inventory window if is not open
                        if (!adsGame.Inventory.isShowing){
                            adsGame.Inventory.show();
                        }
                        
                        // If is a mission item then set as special item to go the rigth slot (Map items)
                        if (ads_items_data[this.triggerData.give].categoria == 'itemMissao'){
                            ads_items_data[this.triggerData.give].specialItem = true;
                        }
                        
                        if ( this.triggerData.nomeSom !== undefined && this.triggerData.volumeEfeito !== undefined){
                            // play a "throwerSound" sound
                            me.audio.play( this.triggerData.nomeSom , false , null , this.triggerData.volumeEfeito );
                        }
                        
                        // Add item to hero
                        adsGame.Inventory.addItem( ads_items_data[this.triggerData.give] );
                        
                        //The hero open chest show a message to hero
                        if (!npcTalking){
                            this.msgData.msg = language.triggers[this.triggerData.messageOpen];
                            this.message.show(this.msgData , 10000);
                            
                            // msgShowing = true;
                            // var tween = new me.Tween( { x: 0} )
                            // .to( { x: 1 }, 10000 ).onComplete(function(){ 
                                // self.message.hide();
//                                 
                            // }).start();
                            // console.log("How many times...");
                            
                            // Remove Trigger
                            me.game.remove(this);
                        }
                        
                        this.checkSolution = false;
                       
                    }else{
                        //The hero hasn't  the item to open chest show a message to hero
                        if (!npcTalking){
                            this.message.show(this.msgData);
                            // msgShowing = true;
                        }
                    }   
                } // End chest object
				
				// If trigger is a door object
				if (this.type == 'DOOR_OBJECT'){
				    // Check solution only if requirement does't exist or is satisfied
				    if ( typeof this.triggerData.requirement !== "undefined" ){
                        // prepare data to message box
                        var msgDataReq = {};
                        msgDataReq.msgImage = 'sprites/information.png' ;
                        msgDataReq.msgName = language.system.TRmessage;
                        msgDataReq.msg = language.triggers[this.triggerData.requirementMsg]; 
                        
				        if (typeof this.triggerData.requirement.salvarPrisao !== "undefined" && !this.checkRequirementOne ){
				            
				            this.checkRequirementOne = true;
				            
				            var self = this;
				            // var reqSavePrisionerLenght = Object.keys( this.triggerData.requirement.salvarPrisao ).length ;
				            var addAnd ="";
				            var isFree = false;
				            var allFree = true;
				            
                            // play a "doorlockmessage" sound
                            me.audio.play("doorlockmessage");
				            
				            $.each( this.triggerData.requirement.salvarPrisao, function( i , data ) {
				                // TODO - Must check if hero save the prisoners before				                
				                isFree = adsGame.prisonDoors.getPrisonDoorState( adsNpcData[data].prisao.numero );
				                
				                // Not free
				                if ( !isFree ) { 
				                    // One prisoner is not free opss
                                    allFree = false;
                                }
				            });
				            
				            // If not all prisoners are free than show message
				            if ( !allFree ){
                                if (!npcTalking){
                                    this.message.show(msgDataReq);
                                    // msgShowing = true;
                                }
				            }
				            
				            // If all prisioner not free then don't pull the trigger otherwise pull the trigger
				            this.pullTrigger = allFree;
				        }
				    }
				    
				    if (this.pullTrigger){
    				    if (this.checkSolution){
    						// // Open the door
    						// this.doorLayer.clearTile(this.targX,this.targY);
    						// this.collisionLayer.clearTile(this.targX,this.targY);
    
    						// //Remove this object
    						// me.game.remove(this);
    						
    						var doorCoord = new Array();
    						doorCoord[0] = this.targX;
    						doorCoord[1] = this.targY;
    						
    						// play a "opendoor" sound
                            me.audio.play("opendoor");
                          
    						adsGame.prisonDoors.remove(doorCoord , "openDoor", this.triggerData.animation);
    						
    						//portaPrisao -- Set door open to the prison number
    						// adsGame.prisonDoors.prisonBreak[this.triggerData.portaPrisao] = true;
    						adsGame.prisonDoors.openPrisonDoor( this.triggerData.portaPrisao );
    						
    						// console.log("prisonBreak Hero: " , adsGame.prisonDoors.getPrisonDoorState( this.triggerData.portaPrisao ) );

    						// Remove Trigger
    						me.game.remove(this);
    						
    						// **** TODO - REMOVE KEY  FROM LIST OF ITEMS
    					}else{
    						// console.log("Hero don't have the key. npcTalking:" , npcTalking);
    						if ( !this.oneTimeSoundMessage ){
    						    // play a "doorlockmessage" sound
                                me.audio.play("doorlockmessage");
        						if (!npcTalking){
        							this.message.show(this.msgData);
        							// msgShowing = true;
        						}
        						this.oneTimeSoundMessage = true;
    						}
    					} // End checkSolution
    					
    					// Set if NPC prisoner talk to hero to avoid to talk again on npc.js
                        adsGame.prisonDoors.prisonDoorTrigger[this.triggerData.portaPrisao] = true;
                        
					} // End pullTrigger check	
	
				} // End door object
				
				// If trigger is a portal object
				if (this.type == 'PORTAL_OBJECT'){
					if (this.checkSolution){
						//***** TEST TELEPORT AND FADE MAP
						var player = me.game.getEntityByName('Hero');
// 						
						// player[0].pos.x = this.targX * ads_tile_size;
						// player[0].pos.y = this.targY * ads_tile_size;
						
                        // play a "teleport" sound
                        me.audio.play("teleport");
        
						adsGame.heroEntity().pos.x = this.targX * ads_tile_size;
						adsGame.heroEntity().pos.y = this.targY * ads_tile_size;
						

						//TODO - Fade out /in viewport 
						me.game.viewport.fadeOut('#000000',1000, function() {
                            // End level one
                            // console.log("this.solution:", this.solution);
                            if ( this.solution == "chave3cristais"){
                                // console.log("Level one finished.");
                                adsGame.heroEntity().renderable.setCurrentAnimation('down');
                                // me.state.pause();
                                adsGame.Inventory.hide();
                                adsGame.lvlFinishedWindow.show();
                              // window.location = "https://docs.google.com/forms/d/17GBoEcrjcjzQ-kKA3o3RG961sBBLRuX4bmu6v1eGPQ8/viewform";
                            }
						}.bind(this));
						
						// **** TODO - REMOVE SCROOLL OF PORTAL FROM LIST OF ITEMS
					}else{
						// console.log("Hero don't have the key.");
						this.message.show(this.msgData);
						// msgShowing = true;
					}
				} // End portal object				
                
				// If trigger is a npc object object
                if (this.type == 'NEW_NPC'){                        
                        this.message.show(this.msgData, 5000);
                        // msgShowing = true;
                        
                        //Create the new NPC only one time
                        if ( !this.oneTime ){                
                            // Shake map
                            me.game.viewport.shake (20 , 1500);
                            
                            if ( this.triggerData.nomeSom !== undefined && this.triggerData.volumeEfeito !== undefined){
                                // play a "triggerData" sound
                                me.audio.play( this.triggerData.nomeSom , false , null , this.triggerData.volumeEfeito );
                            }
                            
                            //Rises effect goes here if exist
                            var risesNPC = new effect(
                                    (this.appearEffect.coordinates.x * ads_tile_size) , 
                                    (this.appearEffect.coordinates.y * ads_tile_size) , // Coordinates
                                    me.loader.getImage(this.appearEffect.name),  // Image
                                    this.appearEffect.size.width,this.appearEffect.size.height, // Size
                                    this.appearEffect.animationSheet, //Animation sheet
                                    this.appearEffect.speed, // Speed between 0 - Slowest and 60 - fastest
                                    this.appearEffect.repeat, // Repeat
                                    this.appearEffect.waitBetween // Wait between
                                    );
                            me.game.add(risesNPC, 8);
                            me.game.sort();
                                                        
                            //Create new NPC
                            adsGame.Npc.create(adsNpcData[this.npcName]);
                            
                            //Remove Trigger
                            me.game.remove(this);
                        }
                }

                // Quest questions object
                if (this.type == 'QUESTIONS_OBJECT' && !this.oneTimeCollide){

                    var questionQuest = new adsGame.QuestionQuest( this.triggerData.nomeNPC , this );
                    
                    questionQuest.play();
                    
                   questionQuest = undefined;
                   
                    // Remove this object 
                    // me.game.remove(this);
                } // End Quest questions object
                
                //If hero pull the trigger set onetime to true - pull one time atfer test triggers type
                this.oneTime = true;	
			}
		}else{
		     
			// if (!msgShowing)
			// {
			this.message.hide();	
			// }
			
			// if (!npcTalking)
            // {
                    // msgShowing = false;
            // }
			
			// Play sound only one time
			this.oneTimeSoundMessage = false;
			
			// Check Trigger requirement only one time
			this.checkRequirementOne = false;
			
			// Reset check for items
			this.isChecked = false;
			
			//Remove item from game if remove = true:
            if (this.remove && this.oneTime){
                  // Remove this object 
                  me.game.remove(this);
                  
                  // console.log("Trigger Removed.....");
            }
		}

        // TODO - Use that variable for check only one time in others triggers
        // check only one collision with hero to activate the question quest
        if (this.type == 'QUESTIONS_OBJECT'){
            if ( res && res.obj.name == 'hero' ){
                this.oneTimeCollide = true;
            } else{ // If not collide with hero
                //If hero leave trigger reset onetime to false
                this.oneTimeCollide = false;
            }
        }
        
	}, // End Update
	
    onDestroyEvent : function(){
        console.log("TriggerEntity was destroyed...");
        // Hide messages when TriggerEntity was destroyed
        // this.message.hide();
    }
	
});

// **************************************
// ****  INVISIBLE ENTITY SPAWN ****
// **************************************
//me.InvisibleEntity has been removed, as following previous changes,
//this can now be achieved using a me.ObjectEntity without a renderable component.
var TriggerSpawnEntity = me.ObjectEntity.extend({
	//Constructor
	init: function( x , y , settings){
		// call the parent constructor
		this.parent(x, y, settings);
		
		// var triggerData = {};
		// triggerData.coordinates = {x:6,y:10};
		// triggerData.type = 'DOOR_OBJECT';
		// triggerData.tileTarget = {x:6,y:10};
		// triggerData.message = "Precisas da Chave Caveira<br>para abrir a porta.";
		// triggerData.imageName = "chaveosso.png";
		// triggerData.solution = "chaveosso";
		
		// //var settings = {};
		// var settings = triggerData.settings;
		// settings.width = 32;
		// settings.height = 32;
		
		// Adicionar items na camada 4
		$.each(triggersData, function(i, triggerData){
			trigger = new TriggerEntity( triggerData.coordinates.x * ads_tile_size , triggerData.coordinates.y * ads_tile_size
										, triggerData.settings , triggerData);
			me.game.add(trigger,4);
			me.game.sort();
		});	
		
		// // Door = new DoorEntity( 6*32 , 9*32, {image: "doorcheck", spritewidth: 32, spriteheight: 32});
		// heroDoorCell = new TriggerEntity( 6*32 , 9*32, settings , triggersData[0]);
		// me.game.add(heroDoorCell,3);
		// me.game.sort();
	}
});
// **************************************
// ****  END INVISIBLE ENTITY SPAWN ****
// **************************************

// **************************************
// ****  THROWERS ENTITY 				 ****
// **************************************

  var throwersEntity = me.ObjectEntity.extend({
    
	init: function (x, y, throwerData) {

		this.throwerData = throwerData;

		var settings = this.throwerData.configuracoes;
	 
		this.parent(x, y , settings);

		this.collidable = false;
		this.isSolid = true;
		
		// disable gravity
		this.gravity = 0;
		
		if (typeof this.throwerData.numeroDisparos !== "undefined"){
		  this.numeroDisparos = this.throwerData.numeroDisparos;
        }
        
        // If thrower is animated in all directions
        if ( this.throwerData.animacoes.animaTodasPosicoes) {
            this.renderable.addAnimation("right"  ,  this.throwerData.animacoes.direita );
            this.renderable.addAnimation("left"    ,  this.throwerData.animacoes.esquerda );
            this.renderable.addAnimation("up"     ,  this.throwerData.animacoes.cima );
            this.renderable.addAnimation("down",  this.throwerData.animacoes.baixo );
            
            // console.log("Set animations to NPC..." , this.throwerData.configuracoes.image);
        }
        
		this.renderable.addAnimation("default", this.throwerData.animacoes.parado );
		this.renderable.addAnimation("throw", this.throwerData.animacoes.animado );
		
		this.renderable.setCurrentAnimation("default");
		
		this.animationspeed = me.sys.fps / (me.sys.fps / this.throwerData.animacoes.velocidade);
		
		this.resetThrowDurationAndTimer();
		
		// console.log('this.throwerData.solido:',this.throwerData.solido ,  'this.throwerData.nome:', this.throwerData.nome)
		
		//Put solid tile in this place if thrower is solid this.collisionLayer.getTileId( 0 , 0 ) number
		// In this case in the map 0,0 coordinates must be an solid tile
		if (this.throwerData.solido){
			this.collisionLayer = me.game.currentLevel.getLayerByName("collision");
			this.collisionLayer.setTile(this.throwerData.coordenadas.x,this.throwerData.coordenadas.y, this.collisionLayer.getTileId( 0 , 0 ));
			
			// Debug get solid tile number - Improve
			// console.log(" Solid tile number :", this.collisionLayer.getTileId( 0 , 0 ) );
			
		}
		
		// Create a maximum number of projectile objects
		this.numberProjectils = 0;
	},
    
	update: function () {
		//Create project by mouse click if thrower is controlled by mouse
		// If keypressed I then open the inventory
		var self = this;
		
		var htmlWeaponSlot = $("#Slot0" + heroWeaponSlot + " span");
		
	    if (typeof this.numeroDisparos !== "undefined"){
		  htmlWeaponSlot.text( this.numeroDisparos );
		}
		
		if (this.throwerData.movimento == "mouseClickMovement"){
            if (me.input.isKeyPressed('mouseOverride') && heroWeaponEnable)
            {
                // console.log('Mouse click create projectil...');
                // console.log('me.input.mouse.pos X:' , (me.input.mouse.pos.x + me.game.viewport.pos.x) );
//                 
                 // console.log('Hero pos X=:' , adsGame.heroEntity().pos.x , "  wY=", adsGame.heroEntity().pos.y);
                 
                var cursorWidth = me.loader.getImage("point_cur").width ;
                 
                // World Destination = mouse position - image mouse pointer size + viewport position
                this.throwerData.destX = ( me.input.mouse.pos.x - cursorWidth ) + me.game.viewport.pos.x;
                this.throwerData.destY = ( me.input.mouse.pos.y ) + me.game.viewport.pos.y;
                
                // Define here how many projectils hero must create
                if (typeof this.numeroDisparos !== "undefined"){
                    // console.log("this.throwerData.numeroDisparos:", this.numeroDisparos);
                    this.numeroDisparos--; // = this.throwerData.numeroDisparos - 1;
                    if (this.numeroDisparos > 0){
                        this.createProjectil();
                         // Add text to div that contain weapon                        
                    }else if ( this.numeroDisparos == 0 ){   
                            // Remove thrower and send information to remove item from inventory
                            this.createProjectil();
                            var player = adsGame.heroEntity();
                            player.removeWeapon( this.throwerData.nomeItem );
                            
                            htmlWeaponSlot.empty();
                            
                            me.game.remove( self );
                    }
                }else{
                    this.createProjectil();
                }
                
            }
        }else { //Thrower by time
            // Create projectil by interval time
            this.updateThrowTimer(); 
        }
        
        
		// check & update thrower movement
		updated = this.updateMovement();

		// update animation
		// if (updated)
		// {
			// // Actualizar animação
			// this.parent(this);
		// }
		
		// Always update thrower animation and movement
        this.parent(this);
        
		return updated;
	},
    
    updateThrowTimer: function () {
      this.throwTimer++;
      if (this.throwTimer > this.throwDuration) {
        this.resetThrowDurationAndTimer();
        this.throwProjectil();
      }
    },
    
    throwProjectil: function () {
       
       // If animation was no direction else another class control that ( NPC for example)
       if ( !this.throwerData.animacoes.animaTodasPosicoes) {
           this.renderable.setCurrentAnimation("throw", "default");
       }
      	  
	  // DEBUG
	  // If distancia exists then verify distance between thrower and hero
	  if (typeof(this.throwerData.distancia) !== 'undefined' ){
	  
		var player = adsGame.heroEntity();
		// console.log("Distance between hero and thrower : " , this.distanceTo(player[0]));
		
	  
		if (this.throwerData.distancia > this.distanceTo(player) ){
			if (typeof(this.throwerData.numeroDeProjeteis) !== 'undefined' ){
				// Create a maximum number of projectil objects
				this.createMaxProjectils(this.throwerData.numeroDeProjeteis);
			}else{
				this.createProjectil();
			}
		}
		// destroy player variable
		player = undefined;
      }
      // me.audio.play("shot1");
    },
    
    resetThrowDurationAndTimer: function () {
	  // Set throw interval between shots
      this.throwDuration = randomInt(this.throwerData.intervaloTempoDisparo[0], this.throwerData.intervaloTempoDisparo[1]);
      this.throwTimer = 0;
    },
    
    createProjectil: function () {
	
		// //Create a random velocity for each projectil created
		// projectilsData[this.throwerData.nomeProjectil].velocity = randomInt(this.throwerData.velocidade[0], this.throwerData.velocidade[1]);
		
		// //Receive witch type of path the projectil must follow
		// projectilsData[this.throwerData.nomeProjectil].movimento = this.throwerData.movimento;
		
		this.throwerData.GUID = this.GUID;
		
		// if (this.throwerData.direcao == "up" || this.throwerData.direcao == "down"){
			// // Calculate trigger position on (X=middle of thrower - middle of projectil) and (Y = projectil height)
			// var triggerPositionX = ~~(this.throwerData.configuracoes.spritewidth / 2) - 
									// ~~(projectilsData[this.throwerData.nomeProjectil].configuracoes.spritewidth / 2);
			// var triggerPositionY = this.throwerData.posicaoDisparo.y ;	
				
			// console.log("triggerPositionY + this.pos.y:" , triggerPositionY , "+", this.pos.y)
			
		// }else if (this.throwerData.direcao == "right" || this.throwerData.direcao == "left"){
			// var triggerPositionX = this.throwerData.posicaoDisparo.x ;
			// var triggerPositionY = ~~(this.throwerData.configuracoes.spriteheight / 2) - 
									// ~~(projectilsData[this.throwerData.nomeProjectil].configuracoes.spriteheight / 2);
		// }else{
			
			//  posicaoDisparo - give the launch position added to current positon of thrower
			// var triggerPositionX = this.throwerData.posicaoDisparo.x ;
			// var triggerPositionY = this.throwerData.posicaoDisparo.y ;
		// }
			
		// Debug - Console
		// console.log("throwerData.nome :", this.throwerData.nome );
		
		if ( this.throwerData.nomeSom != undefined && this.throwerData.volumeEfeito != undefined){
            // play a "throwerSound" sound
            me.audio.play( this.throwerData.nomeSom , false , null , this.throwerData.volumeEfeito );
        }
		
        //  posicaoDisparo - give the launch position added to current positon of thrower
        var triggerPositionX = this.throwerData.posicaoDisparo.x ;
        var triggerPositionY = this.throwerData.posicaoDisparo.y ;
            
		var projectil = new projectilEntity(this.pos.x + triggerPositionX , 
											this.pos.y + triggerPositionY, 
											projectilsData[this.throwerData.nomeProjectil], this.throwerData);
		
		me.game.add(projectil,10);
		me.game.sort.defer();
    },
	
	// Max of prjectils if there is a max
	createMaxProjectils: function (maxNumberProjectils){
		if (this.numberProjectils <  maxNumberProjectils ){
			//Create projectil
			this.createProjectil();
			this.numberProjectils++;
			// console.log('numberProjectils' , this.numberProjectils);
			return;
		}
	}
  });
  
// **************************************
// ****  END THROWERS ENTITY 			 ****
// **************************************  
  
// **************************************
// ****  PROJECTIL ENTITY 	     	 ****
// ************************************** 
   var projectilEntity = me.ObjectEntity.extend({
    
    init: function (x, y, projectilData, throwerData ) {
		
		this.projectilData = projectilData;
		
		this.throwerData = throwerData;
		
		// console.debug( "Projectil", projectilData );
		var settings = this.projectilData.configuracoes;
		
		this.parent(x, y, settings);

		this.gravity = 0;
		this.canBreakTile = true;
		
		// Set NPC object type
        this.type = 'PROJECTIL_OBJECT';
		
		//Define if object moves in all directions
		this.testDirection = false;
		
		// If the projectil move in all directions then add animation if not set one animation
		if (typeof(this.projectilData.animacoes.anima) != 'undefined' && this.projectilData.animacoes.anima != null){
			this.renderable.addAnimation("default", this.projectilData.animacoes.parado );
			this.renderable.addAnimation("down", this.projectilData.animacoes.anima.baixo );
			this.renderable.addAnimation("up", this.projectilData.animacoes.anima.cima );
			this.renderable.addAnimation("left", this.projectilData.animacoes.anima.esquerda );
			this.renderable.addAnimation("right", this.projectilData.animacoes.anima.direita );
			
			//If projectil moves in all directions
			this.testDirection = true;
		}else{
			this.renderable.addAnimation("anime", this.projectilData.animacoes.animaTodasDirecoes );
			this.renderable.addAnimation("default", this.projectilData.animacoes.parado );			
		}
		
		if (typeof(this.projectilData.animacoes.animacaoRemover) != "undefined"){
            this.renderable.addAnimation("removeAnimation", this.projectilData.animacoes.animacaoRemover );
        }
		this.currentAnimation = "";
		
		this.renderable.setCurrentAnimation("default");
		
		switch (this.throwerData.movimento){
			case "line":
					this.lineMovement();
			break;

			case "random":
					this.randomDirection = "";
					this.initialDirection = true;
					this.randomMovement();
			break;
			
			case "BeeHavior":
					this.currentAnimation = "default";
					this.launchAngle = 0;
					
					this.changeRadius = -50;
			break;
			
			case "followHero":
					this.currentAnimation = "default";
					
					this.velocityFollow = randomFloat(this.throwerData.velocidade[0], this.throwerData.velocidade[1]);
					
			break;
			
			// Case mouseClickMovement then get the coordinates where is the point to move the projectil
            case "mouseClickMovement":
                    // Get mouse coordinates and save on this.destX and this.destY
                     this.destX = this.throwerData.destX;
                     this.destY = this.throwerData.destY; 
                     
                     this.velocityFollow = randomFloat(this.throwerData.velocidade[0], this.throwerData.velocidade[1]);
            break;			
			
			default:
			break;
		}
		
		// If you want add time before destroy object must be interesting
		this.timeToDestroy = 0;
		
		//Update always???
        this.alwaysUpdate = false;
    },
    
    update: function () {
	
	    var self = this;
	    
		//Update animation
		if (this.testDirection){
			this.renderable.setCurrentAnimation( this.currentAnimation );
		}else{
	       	this.renderable.setCurrentAnimation("anime" , 
            (function(){
                if (typeof(self.throwerData.repetirAnimProj) != 'undefined' && 
                    !self.throwerData.repetirAnimProj &&
                    typeof(self.throwerData.tempoDeVida) == 'undefined'){
                        this.renderable.setAnimationFrame( this.projectilData.animacoes.animaTodasDirecoes.length - 1 );
                        this.renderable.animationpause = true;
                        me.game.remove(this);
                }
            }).bind( this ));
		}
				
		// for bees movement
		if(this.throwerData.movimento  === "BeeHavior"){
			moveObjectBeeHavior( this );
		}
		
		if(this.throwerData.movimento  === "mouseClickMovement"){
		   // Move the projectil to destination point
           if( fireProjectil( this ) ){
               // If there is a live time then don't remove presently
               // Make a tween with the time and remove after time with animation if exists
               
               // if reach the point remove projectil if no time to destroy
               if (typeof(self.throwerData.tempoDeVida) == 'undefined'){
                    me.game.remove(this);
               }
            }
        }
		
		if(this.throwerData.movimento  === "followHero"){
            // Rotate projectil here if true
            var heroAux = adsGame.heroEntity();
            
            followHero( this );
            
            // Verify if projectil rotate
            if (typeof(this.throwerData.rodarProjectil) !== 'undefined' && this.throwerData.rodarProjectil){
                var angleToHero = this.angleTo(heroAux);
                this.renderable.angle = angleToHero;
            }
		}
		
		// Destroy object if the livetime has been exceeded
		if ( typeof(this.throwerData.tempoDeVida) !== 'undefined' ){
			this.liveTime();
		}
		
		
		        // If projectil ignore wall        
        if( !this.throwerData.ignorasolido ){
    		// check & update movement
    		updated = this.updateMovement();
    
    		// update animation
    		if (updated)
    		{
    			this.handleCollisions(updated);
    			// Actualizar animação
    			this.parent(this);
    		}
    	 
    		return updated;		
		}else{
		    this.handleCollisions(updated);
		    this.computeVelocity(this.vel);
            this.pos.add(this.vel);
              // Actualizar animação
            this.parent(this);            
		}
    },
	
	liveTime: function (){
	    var self = this;
	    
		this.timeToDestroy++;
		if (this.timeToDestroy >  this.throwerData.tempoDeVida ){
			//Remove object with removeAnimation animation
			if (typeof(this.projectilData.animacoes.animacaoRemover) !== "undefined"){
                this.renderable.setCurrentAnimation("removeAnimation" , 
                        function(){
                            self.renderable.setAnimationFrame( self.projectilData.animacoes.animacaoRemover.lenght - 1 );
                            self.renderable.animationpause = true;
                            me.game.remove( self );
                        });
            }else{
			     me.game.remove(this);
			}
			return;
		}
	},
    
    handleCollisions: function ( updated ) {
		var res = me.game.collide(this , true);
		var collideHero = false;
		var self = this;

		//Testing multiple collisions to verify if projectil collide with hero
        $.each(res, function(i,data)
        {
            if (data && data.obj.type == 'HERO_OBJECT' && self.throwerData.atacaObjeto == 'HERO_OBJECT') {
                collideHero = true;
            }else if  (data && data.obj.type == 'NPC_OBJECT' && self.throwerData.atacaObjeto == 'NPC_OBJECT') {
                //Get NPC GUID
                console.log("Hit NPC...", data.obj.GUID);
                //Remove object with removeAnimation if animation exists
                if (typeof(self.projectilData.animacoes.animacaoRemover) != "undefined"){
                    self.renderable.setCurrentAnimation("removeAnimation" , 
                            function(){
                                    // If NPC is hit by hero weapon
                                    if ( data.obj.npcData.armaHeroiAtaca === undefined || data.obj.npcData.armaHeroiAtaca )
                                        data.obj.removeHealth( self.projectilData.atualizarHUD.valor );
                                                      
                                    me.game.remove( self );
                            });
                }else{
                    // If NPC is hit by hero weapon
                    if ( data.obj.npcData.armaHeroiAtaca === undefined || data.obj.npcData.armaHeroiAtaca )
                        data.obj.removeHealth( self.projectilData.atualizarHUD.valor );
                     //remove projectil when hits NPC
                     me.game.remove( self );
                }
            }
        });
        
        if ( collideHero ) {
                me.game.HUD.updateItemValue(this.projectilData.atualizarHUD.tipo, 
                                            -(parseInt(this.projectilData.atualizarHUD.valor)));                    
                //Remove object
                me.game.remove(this);
                
                // If remove health then play hit sound and flicker player
                if ( this.projectilData.atualizarHUD.tipo == 'vida' ){
                    //When player collide with item Stop player and ask question
                    var player = adsGame.heroEntity();
                    // play a "hitplayer" sound
                    me.audio.play("hithero", false , null , hitHeroVolume);
                    // let's flicker in case we loses health
                    player.renderable.flicker(10);
                    player = undefined;
                }
                
                //if there is a maximum number of projectils then when one die another is created
                if (typeof(this.throwerData.numeroDeProjeteis) !== 'undefined' ){
                    var throwerEntity = me.game.getEntityByGUID(this.throwerData.GUID);
                    throwerEntity.numberProjectils--;
                }   
                    
                return;
        }
        
        // If projectil ignore wall        
        if( !this.throwerData.ignorasolido ){
    		// Remove bees only when do complet circle
    		if (this.checkWallCollision(updated)){
    			if(this.throwerData.movimento === "random"){			
    				this.randomMovement();
    			}else{
    				//Remove object if there is a distance up 32 pixels
    				me.game.remove(this);
    			}			
    		}
		}
		
		
		
    },
	
	checkWallCollision: function (updated) {
		
		var wallCollision = updated.x != 0 || updated.y!= 0 ? true : false;

		return wallCollision;	
	},

    randomMovement: function () {	

		var randomVelocity = randomFloat(this.throwerData.velocidade[0], this.throwerData.velocidade[1]);
		var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
		
		
		if (this.initialDirection){
			this.randomDirection = this.throwerData.direcao;
			this.initialDirection = false;
		}else{
			if(this.randomDirection == "down"){
				this.randomDirection = "up";
			}else{
				this.randomDirection = "down";
			}
		}
		
		switch (this.randomDirection){
		
			case "down":
				this.vel.x = randomVelocity * plusOrMinus;
				this.vel.y = randomVelocity;
			break;
			
			case "up":
				this.vel.x = randomVelocity * plusOrMinus;
				this.vel.y = -randomVelocity;
			break;
			
			case "all":
				this.vel.x = randomVelocity * plusOrMinus;
				plusOrMinus = Math.random() < 0.5 ? -1 : 1;
				this.vel.y = randomVelocity * plusOrMinus;
			break;
		}
		
		this.setMyAnimation( this );
		
	},
	
	mouseClickMovement: function () {
	    	    
	},
    
	lineMovement: function () {	
		switch (this.throwerData.direcao){
		
			case "down":
				this.vel.y = randomFloat(this.throwerData.velocidade[0], this.throwerData.velocidade[1]);
			break;
			
			case "up":
				this.vel.y = -randomFloat(this.throwerData.velocidade[0], this.throwerData.velocidade[1]);
			break;
			
			case "left":
				this.vel.x = -randomFloat(this.throwerData.velocidade[0], this.throwerData.velocidade[1]);
			break;
			
			case "right":
				this.vel.x = randomFloat(this.throwerData.velocidade[0], this.throwerData.velocidade[1]);
			break;
		}
	},
	
	setMyAnimation: function(  object){
		if ((object.vel.x < 0 && object.vel.y < 0) || 
			(object.vel.x < 0 && object.vel.y > 0) ||
			(object.vel.x < 0 && object.vel.y == 0)){
			object.currentAnimation = "left";
		}else if((object.vel.x > 0 && object.vel.y < 0) || 
			(object.vel.x > 0 && object.vel.y > 0) ||
			(object.vel.x > 0 && object.vel.y == 0)){
			object.currentAnimation = "right";
		} else if(object.vel.x == 0 && object.vel.y < 0){
			object.currentAnimation = "up";
		}  else {
			object.currentAnimation = "down";
		}
	}
    
  });
  
// **************************************
// ****  END PROJECTIL ENTITY 		*****
// **************************************


// **************************************
// ****  THROWERS ENTITY SPAWN ****
// **************************************
//me.InvisibleEntity has been removed, as following previous changes,
//this can now be achieved using a me.ObjectEntity without a renderable component.
var ThrowersSpawnEntity = me.ObjectEntity.extend({
	//Constructor
	init: function( x , y , settings){
		// call the parent constructor
		this.parent(x, y, settings);
		
		
		// Adicionar items na camada 4
		$.each( throwersData, function(i, throwerData){
		    if ( throwerData.criarinicio){
    			thrower = new throwersEntity( throwerData.coordenadas.x * ads_tile_size , throwerData.coordenadas.y * ads_tile_size, throwerData);
    			me.game.add(thrower,6);
    			me.game.sort.defer();
			}
		});	

	}
});
// **************************************
// ****  END THROWERS ENTITY SPAWN ****
// **************************************

// **************************************
// ****  MAP EFFECTS ENTITY SPAWN ****
// **************************************
//me.InvisibleEntity has been removed, as following previous changes,
//this can now be achieved using a me.ObjectEntity without a renderable component.
var MapEffectsSpawnEntity = me.ObjectEntity.extend({
	//Constructor
	init: function( x , y , settings){
		// call the parent constructor
		this.parent(x, y, settings);
		
		
		// Add effects on map
		$.each( mapEffectsData, function(i, mapEffectData){
			var mapEffect = new effect(
				mapEffectData.coordenadas.x * 32 , mapEffectData.coordenadas.y * 32 , // Coordinates
				me.loader.getImage(mapEffectData.imagem),	// Image
				mapEffectData.largura, mapEffectData.altura, // Size
				mapEffectData.animacao, //Animation sheet
				mapEffectData.velocidade, // Speed between 0 - Slowest and 60 - fastest
				mapEffectData.repetir, // Repeat animation
				0 // time between animations
				);
			me.game.add(mapEffect,7);
			me.game.sort.defer();
		});	

	}
});
// **************************************
// ****  END MAP EFFECTS ENTITY SPAWN ****
// **************************************  