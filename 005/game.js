var canvas  = document.getElementById('canvas');
var ctx  = canvas.getContext('2d');


var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x109900});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

var sprite = PIXI.Sprite.fromImage('images/creature.png');

sprite.interactive = true;
sprite.on('mousedown', onDown);
sprite.on('touchstart', onDown);
sprite.scale.x-= 0.8;
sprite.scale.y-= 0.8;



var style = {
    font : 'bold italic 36px Arial',
    fill : '#F7EDCA',
    stroke : '#4a1850',
    strokeThickness : 5,
    dropShadow : true,
    dropShadowColor : '#000000',
    dropShadowAngle : Math.PI / 6,
    dropShadowDistance : 6,
    wordWrap : true,
    wordWrapWidth : 440
};

var richText = new PIXI.Text('Points: 0',style);
richText.x = 30;
richText.y = 180;


var descText = new PIXI.Text('Use keys f /j  ',style);
descText.x = 30;
descText.y = 0;


stage.addChild(descText);





stage.addChild(sprite);

console.log('height' , sprite.height);
sprite.position.set(230,420);
console.log(sprite);


var cosmos =   PIXI.Sprite.fromImage('images/cosmos.png');
var monster  =   PIXI.Sprite.fromImage('images/avatar.png');

cosmos.scale.y -= 0.5;
cosmos.scale.x -= 0.5;

stage.addChild(cosmos);
stage.addChild(monster);

cosmos.position.set(230,400);
monster.position.set(430,400);

monster.scale.x-= 0.5;
monster.scale.y-= 0.5;



stage.addChild(richText);

// from  http://www.html5gamedevs.com/topic/3759-how-can-i-detect-two-sprits-hit/
var isIntersecting = function(r1, r2) {

return !(r2.x > (r1.x + r1.width) || 

           (r2.x + r2.width) < r1.x || 

           r2.y > (r1.y + r1.height) ||

           (r2.y + r2.height) < r1.y);

}





function onDown (eventData) {

  //sprite.scale.x += 0.3;
  //sprite.scale.y += 0.3;
}
// start animating

var dir = 6;

var $points = $('#points');
var points = 0;
var updatePoints = function(){
  // $points.text(points);
  richText.setText("Points: " + points);
}


var cosmosDir = 1;
var cosmosVelocity = 3;



var monsterDir = 1;
var monsterVelocity = 8;


var mX = 1;
var mVX  = 2;


var cX = 3;


var animateChar = function(){

  if(isIntersecting(sprite, cosmos)){
    console.log('intersection!');
    points+= 1;
    updatePoints();
  }

  if(isIntersecting(sprite, monster)){
    console.log('monster intersection!');
    points+= -1;
    updatePoints();
  }

  sprite.position.x += dir;
  if(sprite.position.x >=  800  - sprite.width|| sprite.position.x <= 0){
    dir *= -1;
  }




  cosmos.position.x  += cX* cosmosVelocity;
  if(cosmos.position.x >=  800  || cosmos.position.x <= 0){
    cX   *= -1;
  }




  cosmos.position.y += cosmosDir* cosmosVelocity;
  if(cosmos.position.y >=  600  || cosmos.position.y <= 0){
    cosmosDir  *= -1;
  }



  monster.position.y += monsterDir * monsterVelocity;
  if(monster.position.y >=  600  || monster.position.y <= 0){
    monsterDir  *= -1;
  }


  monster.position.x += mX * mVX;
  if(monster.position.x >=  800  || monster.position.x <= 0){
    mX   *= -1;
  }





};


setInterval(function(){

  monsterVelocity  = Math.random(0, 18) + 3;
  mVX   = Math.random(0, 8) + 3;

}, 2);

setInterval(function(){

  monsterVelocity  = Math.random(0, 4) + 3;
}, 3);





$(document).on('keypress', function(e){
   var code = e.keyCode || e.which;
   console.log('key', code);
   console.log('key', e.charCode);
   if(code === 102){ //f
     dir = -Math.abs(dir);
   }
   if(code === 106) { // j
     dir = Math.abs(dir);

   }



});
animate();




function animate() {


  animateChar();
    requestAnimationFrame(animate);

    // render the root container
    renderer.render(stage);
}

