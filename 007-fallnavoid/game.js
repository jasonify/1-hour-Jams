var canvas  = document.getElementById('canvas');
var ctx  = canvas.getContext('2d');


var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
var enemies;

var enemyTotal = 11;

var mouseX = width / 2 ;
var player = {
  x: width/2 -5,
  y: -20,
  width: 10,
  height: 10,
  speedY: 5
};
var points = 0;
var lives = 0;


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
    top: r2.y,
    right: r2.x + r2.width,
    bottom: r2.y + r2.height
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

function updatePlayer(){
  ctx.fillStyle = '#00ff00';
  player.x = mouseX - player.width/2;
  ctx.fillRect(player.x, player.y, player.width, player.height);
  player.y += player.speedY;
  if(player.y >= height ){
    player.y = 0;
    points++;
    player.speedY++;
    player.speedY = Math.min(10, player.speedY);
    console.log('player speed',player.speedY);
    $('#points').text('Points: ' + points);
    ctx.fillRect(0, 0,width, height);

  }
 
}
function checkHits(){
  for(var ii = 0 ; ii < enemies.length ; ii++){
    var enemy = enemies[ii];
    if(intersects(player, enemy)){
      return true;
    }
  }
  return false;

}

var gameOver = false;

function wasHit(hit){
  if(!hit) return;
  console.log('HIT!!!!');
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(0,0, width, height);
  
  lives--;
  $('#lives').text('Lives: ' +  lives);
  if(lives <= 0 ){ 
    gameOver = true;
    $('#lives').text('Game Over! ').css({
      color: 'black',
      'font-size': '100px'
    });

  } else{
    player.y = -player.height;
  }

}


function animate() {

  if(!gameOver){
    ctx.clearRect(0,0, width, height);
    updateEnemies();
    updatePlayer();
    var hit = checkHits();
    wasHit(hit);

  }
  setTimeout(function(){
  requestAnimationFrame(animate);
  }, 1000/60);
}

document.addEventListener('mousemove', function(ee){
  mouseX = ee.clientX;
});

function restart(){
  lives = 4;
  points = 0;
  gameOver = false;
  player.y = -player.height;
  $('#lives').text('Lives: ' +  lives);
  $('#points').text('Points: ' + points);
}
document.addEventListener('mousemove', function(ee){

  mouseX = ee.clientX;
});

document.addEventListener('mousedown', function(ee){
  restart();
});



restart();

enemies = initEnemies();
animate();
