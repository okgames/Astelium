"use strict";function __extends(e,t){function n(){this.constructor=e}extendStatics(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}function __awaiter(e,t,n,r){return new(n||(n=Promise))(function(o,i){function a(e){try{l(r.next(e))}catch(e){i(e)}}function s(e){try{l(r.throw(e))}catch(e){i(e)}}function l(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(a,s)}l((r=r.apply(e,t||[])).next())})}function __generator(e,t){function n(e){return function(t){return r([e,t])}}function r(n){if(o)throw new TypeError("Generator is already executing.");for(;l;)try{if(o=1,i&&(a=i[2&n[0]?"return":n[0]?"throw":"next"])&&!(a=a.call(i,n[1])).done)return a;switch(i=0,a&&(n=[0,a.value]),n[0]){case 0:case 1:a=n;break;case 4:return l.label++,{value:n[1],done:!1};case 5:l.label++,i=n[1],n=[0];continue;case 7:n=l.ops.pop(),l.trys.pop();continue;default:if(a=l.trys,!(a=a.length>0&&a[a.length-1])&&(6===n[0]||2===n[0])){l=0;continue}if(3===n[0]&&(!a||n[1]>a[0]&&n[1]<a[3])){l.label=n[1];break}if(6===n[0]&&l.label<a[1]){l.label=a[1],a=n;break}if(a&&l.label<a[2]){l.label=a[2],l.ops.push(n);break}a[2]&&l.ops.pop(),l.trys.pop();continue}n=t.call(e,l)}catch(e){n=[6,e],i=0}finally{o=a=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var o,i,a,s,l={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s}var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])},Renderer=function(){function e(){}return e.renderModel=function(e){var t=document.createElement("div");t.id=e._selector,t.innerHTML=e._HTMLTemplate,e._HTMLTemplate=t.innerHTML,document.querySelector("#"+e._parentSelector).innerHTML+=t.outerHTML},e}(),Renderable=function(){function e(e,t,n,r){this._selector=e,this._HTMLTemplate=t||null,this._autoRendering=n||!1,this.setChildModels(r)}return e.prototype.setChildModels=function(e){if(e){for(var t=0,n=e;t<n.length;t++)n[t]._parentSelector=this._selector;this._childModels=e}else this._childModels=[]},e.prototype.appendChild=function(e){var t=this._childModels.findIndex(function(t){return t._selector===e._selector});-1===t?(e._parentSelector=this._selector,this._childModels.push(e)):this._childModels[t]=e},e.prototype.renderChild=function(e){var t=this._childModels.find(function(t){return t._selector===e});t.render(t._parentSelector)},e.prototype.renderSelectedChildren=function(e){var t=this;document.querySelector("#"+this._selector).innerHTML="",e.forEach(function(e){return t.renderChild(e)})},e.prototype.render=function(e){this._parentSelector=e,Renderer.renderModel(this),this._childModels.length>0&&this._childModels.forEach(function(e){e._autoRendering&&e.render(e._parentSelector)})},e}(),Menu=function(e){function t(t,n,r,o){var i=e.call(this,t,n,r)||this;return i._actionItems=o||new Map,i}return __extends(t,e),t}(Renderable),GameObject=function(e){function t(t,n,r,o){var i=e.call(this,t,n,r)||this;return i._position=o,i}return __extends(t,e),t.prototype.render=function(t){e.prototype.render.call(this,t),document.querySelector("#"+this._selector).style.top=this._position.y+"px",document.querySelector("#"+this._selector).style.left=this._position.x+"px"},t}(Renderable),Engine=function(){function e(e,t){this._modelsMap=e||new Map,this._managersMap=t||new Map}return Object.defineProperty(e.prototype,"modelsMap",{get:function(){return this._modelsMap},set:function(e){this._modelsMap=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"managersMap",{get:function(){return this._managersMap},set:function(e){this._managersMap=e},enumerable:!0,configurable:!0}),e.prototype.getModel=function(e){return this._modelsMap.get(e)},e.prototype.loadModels=function(e){var t=this;e.forEach(function(e){t._modelsMap.set(e._selector,e)})},e.prototype.getManager=function(e){return this._managersMap.get(e)},e.prototype.registerManagers=function(e){var t=this;e.forEach(function(e){t._managersMap.set(e.id,e)})},e.prototype.updateModel=function(e,t){console.log("SELECT",e);for(var n=0,r=this._modelsMap.get(this._modelsMap.get(e)._parentSelector)._childModels;n<r.length;n++){var o=r[n];o._selector===e&&(o=Object.assign(o,t),this._modelsMap.set(e,o))}},e}(),Manager=function(){function e(e){this._id=e}return Object.defineProperty(e.prototype,"id",{get:function(){return this._id},set:function(e){this._id=e},enumerable:!0,configurable:!0}),e}(),Direction;!function(e){e[e.UP=0]="UP",e[e.DOWN=1]="DOWN",e[e.LEFT=2]="LEFT",e[e.RIGHT=3]="RIGHT"}(Direction||(Direction={}));var PhysicsManager=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t}(Manager),Mover=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.changePositionX=function(e,t){t===Direction.RIGHT?this._position.x+=e:t===Direction.LEFT&&(this._position.x-=e)},t.prototype.changePositionY=function(e,t){t===Direction.UP?this._position.y-=e:t===Direction.DOWN&&(this._position.y+=e)},t.prototype.changePosition=function(e,t,n,r){this.changePositionX(e,t),this.changePositionY(n,r)},t.prototype.moveUp=function(e){this.changePositionY(e,Direction.UP)},t.prototype.moveDown=function(e){this.changePositionY(e,Direction.DOWN)},t.prototype.moveLeft=function(e){this.changePositionX(e,Direction.LEFT)},t.prototype.moveRight=function(e){this.changePositionX(e,Direction.RIGHT)},t.prototype.rotate=function(e){document.querySelector(""+this._selector).style.rotate=""+e},t}(GameObject),Player=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t}(Mover),Pawn=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t}(GameObject),AsteliumNetworkManager=function(e){function t(n,r){var o=e.call(this,n)||this;return t._socket=r,o}return __extends(t,e),Object.defineProperty(t.prototype,"socket",{get:function(){return t._socket},set:function(e){t._socket=e},enumerable:!0,configurable:!0}),t.send=function(e){this._socket.send(e)},t}(Manager),AsteliumPlayer=function(e){function t(t,n,r,o){var i=e.call(this,t,n,r,o)||this;return i._moveEventListener=i.getMoveListener(),i._actionEventListener=i.getActionListener(),i}return __extends(t,e),t.prototype.getMoveListener=function(){var e=this;return function(t){switch(t.key){case"w":e.moveUp(3);break;case"s":e.moveDown(3);break;case"a":e.moveLeft(3);break;case"d":e.moveRight(3)}}},t.prototype.getActionListener=function(){var e=this;return function(t){var n=APP_ENGINE_INSTANCE.getModel(e._parentSelector);"Enter"===t.key&&console.log("Action is called"),"Escape"===t.key&&(APP_ENGINE_INSTANCE.getManager(AsteliumSelector.GAME_STATE_MANAGER_ID).currentState={storage:{players:n._childModels.filter(function(e){return e instanceof Player}),pawns:n._childModels.filter(function(e){return e instanceof Pawn})},dom:document.querySelector("#"+n._selector).outerHTML},APP_ENGINE_INSTANCE.getManager(AsteliumSelector.AUDIO_MANAGER_ID).playSelected(["/soul.mp3","/menu.mp3"]),n.renderSelectedChildren([AsteliumSelector.GAME_MENU_ID]),e.pause())}},t.prototype.addMoveListener=function(){document.addEventListener("keypress",this._moveEventListener)},t.prototype.addActionListener=function(){document.addEventListener("keydown",this._actionEventListener)},t.prototype.removeMoveListener=function(){document.removeEventListener("keypress",this._moveEventListener)},t.prototype.removeActionListener=function(){document.removeEventListener("keydown",this._actionEventListener)},t.prototype.moveUp=function(t){e.prototype.moveUp.call(this,t),APP_ENGINE_INSTANCE.updateModel(this._selector,this),AsteliumNetworkManager.send(JSON.stringify({type:"move-up-to-server",player:this}))},t.prototype.moveDown=function(t){e.prototype.moveDown.call(this,t),APP_ENGINE_INSTANCE.updateModel(this._selector,this),AsteliumNetworkManager.send(JSON.stringify({type:"move-down-to-server",player:this}))},t.prototype.moveLeft=function(t){e.prototype.moveLeft.call(this,t),APP_ENGINE_INSTANCE.updateModel(this._selector,this),AsteliumNetworkManager.send(JSON.stringify({type:"move-left-to-server",player:this}))},t.prototype.moveRight=function(t){e.prototype.moveRight.call(this,t),APP_ENGINE_INSTANCE.updateModel(this._selector,this),AsteliumNetworkManager.send(JSON.stringify({type:"move-right-to-server",player:this}))},t.prototype.init=function(){this.addMoveListener(),this.addActionListener()},t.prototype.pause=function(){this.removeMoveListener(),this.removeActionListener()},t}(Player),AsteliumSelector;!function(e){e.AUDIO_MANAGER_ID="ast-aud-manager",e.GAME_STATE_MANAGER_ID="ast-gamestate-manager",e.NETWORK_MANAGER_ID="ast-network-manager",e.PHYSICS_MANAGER_ID="ast-phys-manager",e.GAME_LAYOUT_ID="game-layout",e.GAME_MENU_ID="ast-menu",e.ADVICER_ID="ast-advicer"}(AsteliumSelector||(AsteliumSelector={}));var AsteliumEngine=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.SOCKET_SERVER_MESSAGES=new Map([["move-up-to-client",function(e){console.log("UP "+e.player._selector);var n=e.player;t.getManager(AsteliumSelector.PHYSICS_MANAGER_ID).animate(n._selector,n._position,Direction.UP)}],["move-down-to-client",function(e){console.log("DOWN "+e.player._selector);var n=e.player;t.getManager(AsteliumSelector.PHYSICS_MANAGER_ID).animate(n._selector,n._position,Direction.DOWN)}],["move-left-to-client",function(e){console.log("LEFT "+e.player._selector);var n=e.player;t.getManager(AsteliumSelector.PHYSICS_MANAGER_ID).animate(n._selector,n._position,Direction.LEFT)}],["move-right-to-client",function(e){console.log("RIGHT "+e.player._selector);var n=e.player;t.getManager(AsteliumSelector.PHYSICS_MANAGER_ID).animate(n._selector,n._position,Direction.RIGHT)}],["connection-response-broadcast",function(e){console.log(e),t.activePlayers=e.activePlayers.map(function(e){return Object.assign(new AsteliumPlayer,e)}),t.availablePlayers=e.availablePlayers.map(function(e){return Object.assign(new AsteliumPlayer,e)}),t.loadModels(t.activePlayers),t.activePlayers.forEach(function(e){t.getModel(AsteliumSelector.GAME_LAYOUT_ID).appendChild(e)}),console.log("ENGINE",t.modelsMap.values())}],["connection-response-single",function(e){t.currentPlayer=e.currentPlayer,t.currentPlayer=Object.assign(t.getModel(t.currentPlayer._selector),t.currentPlayer),console.log("Current player",t.currentPlayer)}]]),t}return __extends(t,e),Object.defineProperty(t.prototype,"activePlayers",{get:function(){return this._activePlayers},set:function(e){this._activePlayers=e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"availablePlayers",{get:function(){return this._availablePlayers},set:function(e){this._availablePlayers=e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"currentPlayer",{get:function(){return this._currentPlayer},set:function(e){this._currentPlayer=e},enumerable:!0,configurable:!0}),t}(Engine),APP_ENGINE_INSTANCE=new AsteliumEngine,AsteliumMenu=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.initializeView=function(e){APP_ENGINE_INSTANCE.getModel(this._parentSelector);var t='<div class="ast-header">ASTELIUM</div>\n            <div class="ast-logo"></div>';this._actionItems=e,this._actionItems.forEach(function(e,n){var r='<div class="action-item" id="action-'+n.substring(0,3)+'">\n                <button>'+n+"</button>\n            </div>";t+=r}),this._HTMLTemplate=t},t.prototype.render=function(t){APP_ENGINE_INSTANCE.getManager(AsteliumSelector.AUDIO_MANAGER_ID).play("/menu.mp3",!0),null===this._HTMLTemplate?this.initializeView(this.getBasicItems()):this.initializeView(this._actionItems),document.querySelector("#"+this._parentSelector).innerHTML="",e.prototype.render.call(this,t),this.registerEvents()},t.prototype.getBasicItems=function(){var e=this;return new Map([["New game",function(){e.initializeView(e.getNewGameItems()),APP_ENGINE_INSTANCE.getManager(AsteliumSelector.AUDIO_MANAGER_ID).playSelected(["/newgame.mp3"]),e.render(e._parentSelector)}],["Load",function(){e.getSavedGameItems().then(function(t){e.initializeView(t),e.render(e._parentSelector)}).then(function(){e.initializeView(e.getInGameItems())})}],["Options",function(){APP_ENGINE_INSTANCE.getManager(AsteliumSelector.AUDIO_MANAGER_ID).play("/options.mp3")}]])},t.prototype.getNewGameItems=function(){var e=this;return new Map([["SinglePlayer",function(){var t=APP_ENGINE_INSTANCE.getModel(e._parentSelector);e.initializeView(e.getInGameItems()),e.render(e._parentSelector),t.renderSelectedChildren(e.getGameObjectsSelectors()),APP_ENGINE_INSTANCE.getManager(AsteliumSelector.AUDIO_MANAGER_ID).playSelected(["/singleplayer.mp3","/location.mp3"]),APP_ENGINE_INSTANCE.currentPlayer.init()}],["Multiplayer",function(){var t=APP_ENGINE_INSTANCE.getModel(e._parentSelector);console.log("CHILDREN",t._childModels),e.initializeView(e.getInGameItems()),e.render(e._parentSelector),t.renderSelectedChildren(e.getGameObjectsSelectors()),APP_ENGINE_INSTANCE.getManager(AsteliumSelector.AUDIO_MANAGER_ID).playSelected(["/multiplayer.mp3","/location.mp3"]),APP_ENGINE_INSTANCE.currentPlayer.init()}],["Back",this.backCallback()]])},t.prototype.getInGameItems=function(){var e=this,t=APP_ENGINE_INSTANCE.getModel(this._parentSelector);return new Map([["Save",function(){APP_ENGINE_INSTANCE.getManager(AsteliumSelector.GAME_STATE_MANAGER_ID).save((new Date).toLocaleTimeString("en-us",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"}).replace(/\:/g,"-"),"/save"),APP_ENGINE_INSTANCE.getManager(AsteliumSelector.AUDIO_MANAGER_ID).playSelected(["/location.mp3"]),t.renderSelectedChildren(e.getGameObjectsSelectors()),APP_ENGINE_INSTANCE.currentPlayer.init()}],["Load",function(){e.getSavedGameItems().then(function(t){e.initializeView(t),e.render(e._parentSelector)}).then(function(){e.initializeView(e.getInGameItems())})}],["Continue",function(){APP_ENGINE_INSTANCE.getManager(AsteliumSelector.AUDIO_MANAGER_ID).playSelected(["/location.mp3"]),t.renderSelectedChildren(e.getGameObjectsSelectors()),APP_ENGINE_INSTANCE.currentPlayer.init()}]])},t.prototype.getSavedGameItems=function(){return __awaiter(this,void 0,void 0,function(){var e,t,n,r=this;return __generator(this,function(o){switch(o.label){case 0:return e=APP_ENGINE_INSTANCE.getModel(this._parentSelector),t=APP_ENGINE_INSTANCE.getManager(AsteliumSelector.GAME_STATE_MANAGER_ID),n=new Map,[4,t.showAllSaves("/showAllSaves").then(function(o){return n.set("Back",r.backCallback()),o.forEach(function(r,o){n.set(o+1+"-"+r,function(){t.load(r,"/load").then(function(n){t.currentState=n.state,APP_ENGINE_INSTANCE.getManager(AsteliumSelector.AUDIO_MANAGER_ID).playSelected(["/location.mp3"]);var r=[];n.state.storage.players.forEach(function(e){r.push(e),APP_ENGINE_INSTANCE.updateModel(e._selector,e)}),n.state.storage.pawns.forEach(function(e){r.push(e),APP_ENGINE_INSTANCE.updateModel(e._selector,e)}),e.renderSelectedChildren(r.map(function(e){return e._selector})),APP_ENGINE_INSTANCE.currentPlayer.init()})})}),n})];case 1:return[2,o.sent()]}})})},t.prototype.backCallback=function(){var e=this,t=APP_ENGINE_INSTANCE.getModel(this._parentSelector);return this._actionItems===this.getInGameItems()?function(){e.initializeView(e.getInGameItems()),e.render(e._parentSelector),APP_ENGINE_INSTANCE.getManager(AsteliumSelector.AUDIO_MANAGER_ID).playSelected(["/location.mp3"]),t.renderSelectedChildren(e.getGameObjectsSelectors())}:function(){e.initializeView(e.getBasicItems()),e.render(e._parentSelector)}},t.prototype.getGameObjectsSelectors=function(){return APP_ENGINE_INSTANCE.getModel(this._parentSelector)._childModels.filter(function(e){return e instanceof GameObject}).map(function(e){return e._selector})},t.prototype.registerEvents=function(){this._actionItems.forEach(function(e,t){document.querySelector("#action-"+t.substring(0,3)).addEventListener("click",e)})},t}(Menu),AudioManager=function(e){function t(t,n){var r=e.call(this,t)||this;return r._audioMap=n||new Map([]),r}return __extends(t,e),Object.defineProperty(t.prototype,"generalVolume",{get:function(){return this._generalVolume},set:function(e){this._generalVolume=e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"audioMap",{get:function(){return this._audioMap},set:function(e){this._audioMap=e},enumerable:!0,configurable:!0}),t.prototype.load=function(e){var t=this;e.forEach(function(e){t.audioMap.set(e,new Audio(e))})},t.prototype.play=function(e,t,n){var r=this.audioMap.get(e);r.loop=t||!1,r.volume=n||this._generalVolume||1,r.play()},t.prototype.playSelected=function(e,t,n){var r=this;this.audioMap.forEach(function(o,i){e.includes(i)?(o.loop=t||!1,o.volume=n||r._generalVolume||1,o.play()):o.pause()})},t.prototype.stopAll=function(){this.audioMap.forEach(function(e){e.played&&e.pause()})},t.prototype.stopAllExceptSelected=function(e){this.audioMap.forEach(function(t,n){e.includes(n)&&t.played&&t.pause()})},t}(Manager),AsteliumAudioManager=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t}(AudioManager),GameStateManager=function(e){function t(t,n,r){var o=e.call(this,t)||this;return o._currentState=n||null,o._savedGames=r||[],o}return __extends(t,e),Object.defineProperty(t.prototype,"currentState",{get:function(){return this.currentState},set:function(e){this._currentState=e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"savedGames",{get:function(){return this._savedGames},set:function(e){this._savedGames=e},enumerable:!0,configurable:!0}),t.prototype.save=function(e,t){console.log("Current State ",this._currentState);var n={date:(new Date).toLocaleTimeString("en-us",{weekday:"long",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"}),state:this._currentState,name:e};console.log("Save",n),fetch("/save",{method:"POST",body:JSON.stringify(n),headers:new Headers({"Content-Type":"application/json"})}).then(function(e){return e.json()}),this._savedGames.push(n)},t.prototype.showAllSaves=function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){switch(e.label){case 0:return[4,fetch("/showAllSaves",{method:"GET"}).then(function(e){return e.json()}).then(function(e){return console.log("Response",e),e.saves})];case 1:return[2,e.sent()]}})})},t.prototype.load=function(e,t){return console.log("Save name",e),fetch("/load",{method:"POST",body:JSON.stringify({name:e}),headers:new Headers({"Content-Type":"application/json"})}).then(function(e){return e.json()}).then(function(e){return e})},t}(Manager),AsteliumGameStateManager=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t}(GameStateManager),Layout=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t}(Renderable),AsteliumGameLayout=function(e){function t(t,n,r){return e.call(this,t,n,r)||this}return __extends(t,e),t.prototype.render=function(t,n){e.prototype.render.call(this,t)},t}(Layout),Advicer=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t}(Pawn),AsteliumPhysicsManager=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.animate=function(e,t,n){document.querySelector("#"+e).style.top=t.y+"px",document.querySelector("#"+e).style.left=t.x+"px",n===Direction.LEFT?document.querySelector("#"+e).style.transform="scaleX(1)":n===Direction.RIGHT&&(document.querySelector("#"+e).style.transform="scaleX(-1)")},t}(PhysicsManager);document.addEventListener("DOMContentLoaded",function(){fetch("/app-url",{method:"GET"}).then(function(e){return e.json()}).then(function(e){var t=new WebSocket("ws://"+e.host+":"+e.port);t.onopen=function(e){console.log("Connected..."),t.send(JSON.stringify({type:"connection-request",status:"Opened"})),t.onmessage=function(e){var t=JSON.parse(e.data);console.log("From server: ",t),APP_ENGINE_INSTANCE.SOCKET_SERVER_MESSAGES.get(t.type)(t)},window.onbeforeunload=function(e){APP_ENGINE_INSTANCE.activePlayers.splice(APP_ENGINE_INSTANCE.activePlayers.indexOf(APP_ENGINE_INSTANCE.currentPlayer),1),APP_ENGINE_INSTANCE.availablePlayers.push(APP_ENGINE_INSTANCE.currentPlayer),t.send(JSON.stringify({type:"before-unload",activePlayers:APP_ENGINE_INSTANCE.activePlayers,availablePlayers:APP_ENGINE_INSTANCE.availablePlayers}))},t.onclose=function(e){console.log("Closed connection...")},t.onerror=function(e){t.send(JSON.stringify(e))}};var n=new AsteliumAudioManager(AsteliumSelector.AUDIO_MANAGER_ID),r=new AsteliumGameStateManager(AsteliumSelector.GAME_STATE_MANAGER_ID),o=new AsteliumPhysicsManager(AsteliumSelector.PHYSICS_MANAGER_ID),i=new AsteliumNetworkManager(AsteliumSelector.NETWORK_MANAGER_ID,t);n.load(["/location.mp3","/menu.mp3","/multiplayer.mp3","/newgame.mp3","/options.mp3","/singleplayer.mp3","/slime.mp3","/soul.mp3"]),APP_ENGINE_INSTANCE.registerManagers([n,r,i,o]),APP_ENGINE_INSTANCE.loadModels([new AsteliumGameLayout(AsteliumSelector.GAME_LAYOUT_ID,null,!0),new AsteliumMenu(AsteliumSelector.GAME_MENU_ID,null,!0),new Advicer(AsteliumSelector.ADVICER_ID,null,!1,{x:250,y:250})]),APP_ENGINE_INSTANCE.getModel(AsteliumSelector.GAME_LAYOUT_ID).setChildModels([APP_ENGINE_INSTANCE.getModel(AsteliumSelector.GAME_MENU_ID),APP_ENGINE_INSTANCE.getModel(AsteliumSelector.ADVICER_ID)]),APP_ENGINE_INSTANCE.getModel(AsteliumSelector.GAME_LAYOUT_ID).render("renderTarget")})});
