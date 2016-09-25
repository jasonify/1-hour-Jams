var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;


function animate(){
  ctx.restore();
  ctx.clearRect(0,0, width, height);
  ctx.save();
  ctx.fillStyle = '#0000ff';
  ctx.beginPath();
  ctx.arc(0,0, 200, 0, 2*Math.PI);
  ctx.fill();


}
animate();


