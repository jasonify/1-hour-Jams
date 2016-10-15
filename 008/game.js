


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


var pulseLength = 0;
var timeStart = 0;
var centerPointX = null;
var centerPointY = null
var mouseIsDown = false;
var weaponUnitLength = 20;


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
   y: centerPointY + y * weaponUnitLength
  }
  weapon.push(pulseCell);
  // console.log('pulseCell', pulseCell);
}
function updatePulse(){
  weapon = [];
  if(mouseIsDown){
    pulseLength +=1 ;
  } else{
    return;
  }

  var length = Math.floor(pulseLength);
  // console.log('pulseLength', length);
  for(var ii = - Math.ceil(length/2); ii < length; ii++){
    var x = 1;
    var y = 1;
    addToWeapon(x*ii, y*ii);

  }
}





function animate(){
  ctx.clearRect(0, 0, width, height);
  updatePulse();

  console.log('len', weapon.length);
  weapon.forEach(function(cell){
    // console.log('cell', cell);
    drawRect(cell, '#fff');
  });
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


animate();
