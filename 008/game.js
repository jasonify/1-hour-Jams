
var gameOver = false;


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

var canvas  = document.getElementById('canvas');
var ctx  = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

var points = 0;
var lives = 0;

var pulseLength = 0;
var timeStart = 0;
var centerPointX = null;
var centerPointY = null
var mouseIsDown = false;
var weaponUnitLength = 20;


function  initAgents(count){
  var agents = [];
  for(var ii = 0; ii < count; ii++){
    var length = Math.random() * 30+ 10;
    agents.push({
      x: Math.random() * width* 0.9 + width*0.05,
      y: Math.random() * height * 0.9 + height*0.05,
      speed: Math.random() * 2 + 5,
      direction: Math.random() <= 0.5 ? 1: -1,
      width:  length,
      height: length

    });
  }
  return agents;
}


function updateAgents(agents, color){
  ctx.fillStyle = color;
  for(var ii = 0 ; ii < agents.length ; ii++){
    var enemy = agents[ii];
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    enemy.x += enemy.speed * enemy.direction;
    if(enemy.x >= width || enemy.x <= 0){
      enemy.direction *= -1;
    }
  }
}



var enemies = initAgents(4);
var allies = initAgents(3);
var weapon = [];



var drawRect = function(cell, color){
  //Draw rect
  ctx.fillStyle = color;
  ctx.fillRect(cell.x,  cell.y, weaponUnitLength, weaponUnitLength);
}


function addToWeapon(x, y){
  // check with mouse:

  var pulseCell = {
   x: centerPointX + x * weaponUnitLength,
   y: centerPointY + y * weaponUnitLength,
   width: weaponUnitLength,
   height: weaponUnitLength
  }
  weapon.push(pulseCell);
}
function updatePulse(){
  weapon = [];
  if(mouseIsDown){
    pulseLength +=0.5 ;
  } else{
    return;
  }

  var length = Math.floor(pulseLength);
  for(var ii = - Math.ceil(length/2); ii < length; ii++){
    var x = 1;
    var y = 1;
    addToWeapon(x*ii, y*ii);
    addToWeapon(x*-ii, y*ii);

  }
}

function hitCount(cells1, cells2){
  var hits = 0;
  cells1.forEach(function(cell1){
    cells2.forEach(function(cell2){
      if(intersects(cell1, cell2)){
        hits++;
      }
    });
  });
  return hits;
};


function restart(){
  lives = 4;
  points = 0;
  gameOver = false;
  $('#lives').text('Lives: ' +  lives);
  $('#points').text('Points: ' + points);
}


function animate(){
  if(gameOver){
    return;
  }
  ctx.clearRect(0, 0, width, height);
  updatePulse();

  weapon.forEach(function(cell){
    drawRect(cell, '#fff');
  });

  updateAgents(enemies, '#ff0000');
  updateAgents(allies, '#00ff00');


  var player = {x: centerPointX, y: centerPointY};
  var enemeyHits = hitCount(weapon, enemies);


  var poinsHit = hitCount(weapon, allies);
  points += poinsHit;
  if(poinsHit > 0){
     console.log('POINTS!', points);
    $('#points').text('Points: ' + points);
  }

  if(enemeyHits > 0){
    console.log('HIT');

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
    } else {
      pulse = 0;
      weapon = [];
    }
  }
  



  requestAnimationFrame(animate, 1000/60);
};


document.addEventListener('mousemove', function(event){
  centerPointX = event.clientX;
  centerPointY = event.clientY;
  
});

document.addEventListener('mouseup', function(event){
  mouseIsDown = false;
  pulseLength = 0;

});


document.addEventListener('mousedown', function(event){
  mouseIsDown = true;
  timeStart = new Date();

});

document.body.addEventListener('onkeypress', function(event){
  console.log('keycode', event.keyCode);
  console.log('keycode', event);
});



restart();
animate();
