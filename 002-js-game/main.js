console.log('hello');

window.onload = function(){
  console.log('Loaded');

  var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight;
      var ctx = context;

      document.body.addEventListener('mousedown', function(){
        inMotion = true;
        xOff = 0;
      });

      var drawSquare = function(color, x, y, size){

        ctx.beginPath();
        ctx.rect(x, y, 150, 100);
        ctx.fillStyle = color;
        ctx.fill();

      }


      var shapes = [
      ];

      document.body.addEventListener('mousemove', function(ee){
        console.log(ee);

        drawSquare('yellow', ee.clientX, ee.clientY, 20);
      });


};


