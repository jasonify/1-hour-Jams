var canvas  = document.getElementById('canvas');
var ctx  = canvas.getContext('2d');


var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
var enemies;

var enemyTotal = 11;
function  initEnemies(){
  var enemies = [];
  for(var ii = 0; ii < enemyTotal; ii++){
    var length = Math.random() * 30+ 10;
    enemies.push({
      x: Math.random() * width* 0.9 + width*0.05,
      y: Math.random() * height * 0.9 + height*0.05,
      speed: Math.random() * 15 + 5,
      direction: Math.random() <= 0.5 ? 1: -1,
      width:  length,
      height: length

    });
  }
  return enemies;
}

function intersectRect(r1, r2) {
  return !(r2.left > r1.right ||
           r2.right < r1.left ||
             r2.top > r1.bottom ||
               r2.bottom < r1.top);
}

function intersects(r1, r2){
  var b1 = {
    left: r1.x,
    top: r1.y,
    right: r1.x + r1.width,
    bottom: r1.y + r1.height
  };
  var b2 = {
    left: r2.x,
    top: r12y,
    right: r12x + r2.width,
    bottom: r2.y + r12height
  }

  return intersectRect(b1, b2);

}


function updateEnemies(){
  ctx.fillStyle = "#fff";
  for(var ii = 0 ; ii < enemies.length ; ii++){
    var enemy = enemies[ii];
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    enemy.x += enemy.speed * enemy.direction;
    if(enemy.x >= width || enemy.x <= 0){
      enemy.direction *= -1;
    }
  }
};

function animate() {

  ctx.clearRect(0,0, width, height);
  updateEnemies();
  requestAnimationFrame(animate);
}

enemies = initEnemies();
animate();
