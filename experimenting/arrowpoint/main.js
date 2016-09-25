var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;


var x, y = 0;
var arrowX = width/2;
var arrowY = height / 2;
function animate(){
  ctx.restore();
  ctx.clearRect(0,0, width, height);
  ctx.save();
  ctx.translate(width/2, height/2);
  ctx.strokeStyle = '#00ff00';
  ctx.beginPath();
  ctx.arc(0,0, 100, 0, 2*Math.PI);
  ctx.stroke();
  ctx.fillStyle = '#0000ff';
  // ctx.rotate(Math.PI/180 * 45);
  //ctx.fillRect(-25,-25, 50, 50);

  var angle =  Math.atan(y/x);
  console.log('angle radians', angle)
  console.log('angle degrees', angle * 180 / Math.PI);
  // ctx.rotate(angle);
  ctx.rotate(0);

  ctx.beginPath()
  // Center part
  ctx.moveTo(-20, 0);
  ctx.lineTo(20, 0);
  ctx.lineTo(10, -10);
  ctx.moveTo(20, 0);
  ctx.lineTo(10, 10);
  ctx.stroke();

  setTimeout(function(){
    requestAnimationFrame(animate);
  }, 1000/30);
}
animate();



document.addEventListener('mousemove', function(event){
  var mouseX = event.clientX;
  var mouseY = event.clientY;
  y = mouseY - arrowY;
  x = mouseX - arrowX;
  console.log('x', x, 'y',y);

});
