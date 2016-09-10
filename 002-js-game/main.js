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


      var mouseX = 0;
      var mouseY = 0;
      var playerX = 100
      var playerWidth = 20;

            var bullets  = [
      ];

      var maxBullets = 3;

      var monsters = [
      ];

      var maxMonsters = 2;

      var updateMonsters = function(){

        for(var ii = 0; ii < monsters.length; ii++){
          var m = monsters[ii];
          m.x-= 10;
          drawSquare('red', m.x, m.y, 10);
        }

      };
      var checkMonsters = function(){
        var createCont = (maxMonsters-1) -  monsters.length;
        for(var ii = 0; ii < maxMonsters; ii++){
          monsters.push({
            x: width  ,
            y: Math.random() * height
          });
        }

       
      }



      var render = function(){
        ctx.restore();
        ctx.save();
        ctx.clearRect(0,0, width, height);


        checkMonsters();
        updateMonsters();

        // We are drawing the killer 
        drawSquare('yellow', playerX, mouseY,  playerWidth);


        setTimeout(function(){ 
          render();
        }, 1000/60);
      }
      render();




      document.body.addEventListener('mousemove', function(ee){
        console.log(ee);
        mouseY = ee.clientY;

      });


};


