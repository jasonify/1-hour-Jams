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
        ctx.rect(x, y, size, size);
        ctx.fillStyle = color;
        ctx.fill();

      }


      var mouseY = 0;
      var playerX = 100
      var playerWidth = 50;
      

            var bullets  = [
      ];

      var maxBullets = 3;
      var monsterWidth = 15;
      var bulletWidth = 10;

      var monsters = [
      ];

      var trophies = [];
      var trophiesWidth = 5;

      var maxMonsters = 10;
      var gameOver = false;


      // borrowed util
      function intersectRect(r1, r2) {
        return !(r2.left > r1.right || 
                 r2.right < r1.left || 
                   r2.top > r1.bottom ||
                     r2.bottom < r1.top);
      }

      var checkIfPlayerHit = function(){

        for(var ii = 0; ii < monsters.length; ii++){
          var monster = monsters[ii];
          var collision = intersectRect({
            left: playerX,
            right: playerX + playerWidth,
            top: mouseY,
            bottom: mouseY + playerWidth
          },
          {
            left: monster.x,
            right: monster.x + monsterWidth,
            top: monster.y,
            bottom: monster.y + monsterWidth
          });

          if(collision){
            console.log('HIT!');
            gameOver = true;
            alert('Game over :(. Refresh to restart');
          }
        }
      }

      var checkIfMonsterKilled = function(){
        for(var ff = 0; ff < bullets.length; ff++){

          var bullet = bullets[ff];
          for(var ii = 0; ii < monsters.length; ii++){
            var monster = monsters[ii];
            var collision = intersectRect({
              left: bullet.x ,
              right: bullet.x + bulletWidth,
              top: bullet.y,
              bottom: bullet.y + bulletWidth
            },
            {
              left: monster.x,
              right: monster.x + monsterWidth,
              top: monster.y,
              bottom: monster.y + monsterWidth
            });

            if(collision){
              console.log('KILLLL!');
              trophies.push(monsters[ii]);
              document.getElementById('points').innerHTML = "" + trophies.length;
              monsters.splice(ii, 1);

            }
          }
        }
      }



      var updateTrophies = function(){

        var bullets = trophies;
        for(var ii = 0; ii < bullets.length; ii++){
          var m = bullets[ii];
          drawSquare('white', m.x, m.y, 2);
        }

      };

      var time = 0;


      var updateBullets= function(){

        time++;
        console.log('time', time);
        for(var ii = 0; ii < bullets.length; ii++){
          console.log('bullets');
          var m = bullets[ii];
          m.x+= 10;
          m.y = Math.sin( m.x/10 ) * 20  + m.y;
          console.log('sin', Math.sin(time));
          drawSquare('white', m.x, m.y, bulletWidth);
          if(m.x+10 + bulletWidth  >=  width ) {
            bullets.splice(ii, 1);
          }
        }

      };



      var updateMonsters = function(){

        for(var ii = 0; ii < monsters.length; ii++){
          var m = monsters[ii];
          m.x-= 10;
          drawSquare('red', m.x, m.y, monsterWidth);
          if(m.x-10 <= 0 ) {
            monsters.splice(ii, 1);
          }
        }

      };

      var checkMonsters = function(){

        
        var createCount = maxMonsters -  monsters.length;
        for(var ii = 0; ii < createCount ; ii++){
          monsters.push({
            x: width + Math.random()*400, // adding monster with a little offset
            y: Math.random() * height
          });
        }

       
      }



      var render = function(){
        if(gameOver) return;
        ctx.restore();
        ctx.save();
        ctx.clearRect(0,0, width, height);


        checkMonsters();
        updateMonsters();
        updateBullets();
        updateTrophies();

        // We are drawing the killer 
        drawSquare('yellow', playerX, mouseY,  playerWidth);


        checkIfPlayerHit();
        checkIfMonsterKilled();
        setTimeout(function(){ 
          render();
        }, 1000/60);
      }
      render();


      document.body.addEventListener('mousedown', function(ee){
        console.log('mousedown', maxBullets, bullets.length);
        //console.log(ee);
        mouseY = ee.clientY;
        if(maxBullets >  bullets.length){
          console.log('adding bullet');
          bullets.push({
            x:  playerX,
            y:  mouseY
          });
        }

      });



      document.body.addEventListener('mousemove', function(ee){
        //console.log(ee);
        mouseY = ee.clientY;

      });


};


