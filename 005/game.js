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



stage.addChild(sprite);

console.log('height' , sprite.height);
sprite.position.set(230,420);
console.log(sprite);


// var cosmos =   PIXI.Sprite.fromImage('images/creature.png');


// from  http://www.html5gamedevs.com/topic/3759-how-can-i-detect-two-sprits-hit/
var isIntersecting = function(r1, r2) {

return !(r2.x > (r1.x + r1.width) || 

           (r2.x + r2.width) < r1.x || 

           r2.y > (r1.y + r1.height) ||

           (r2.y + r2.height) < r1.y);

}


function onDown (eventData) {

    sprite.scale.x += 0.3;
    sprite.scale.y += 0.3;
}
// start animating

var dir = 6;
var animateChar = function(){

  sprite.position.x += dir;
  if(sprite.position.x >=  800  - sprite.width|| sprite.position.x <= 0){
    dir *= -1;
  }

};

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

