  var canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d'),
  width = canvas.width = window.innerWidth,
  height = canvas.height = window.innerHeight;
  var ctx = context;
  var mouseX  = 0;
  var green = '#2eec40';
  var mouseY = 0;
  var targetWord = '';
  // A = 65
  var minASCCICode = 65;
  var monsters = [];
  var monsterWidth = 10;
  var playerWidth = playerHeight = 50;

  // z  = 122
  var maxASCIICode = 122;
  var str = ""; // user string

  var doors;
  var wordsMatch = function(){
    var reversed = targetWord.split('').reverse().join('');
    console.log('reversed', reversed);
    console.log('user str', str);
    var subReversed = reversed.substring(0, str.length)
    console.log('target Substring', subReversed);
    return   subReversed === str;
  }

  // borrowed util
  function intersectRect(r1, r2) {
    return !(r2.left > r1.right ||
      r2.right < r1.left ||
      r2.top > r1.bottom ||
      r2.bottom < r1.top);
    }


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

  var drawSquare = function(color, x, y, size){
    ctx.beginPath();
    ctx.rect(x, y, size, size);
    ctx.fillStyle = color;
    ctx.fill();
  }


  var checkMonsters = function(){


    var createCount = maxMonsters -  monsters.length;
    for(var ii = 0; ii < createCount ; ii++){
      monsters.push({
        x: width + Math.random()*400, // adding monster with a little offset
        y: Math.random() * height
      });
    }


  }


  var indicateDoor = function(){
    console.log('ENABLE DOOR!');
    doors[secretDoor].color = green;
  };

  $(document).keypress(function(event){
    console.log(event.charCode);
    console.log(String.fromCharCode(event.charCode))

    str += String.fromCharCode(event.charCode);
    $('.user-text').text(str);
    var wordsMatched = wordsMatch();
    console.log('wordsMatch', wordsMatched);


    $('.user-text').css({
        color: 'white',
        'font-size': '2em'
      });
    if(!wordsMatched){
      $('.user-text').css({
        color: 'red'
      });
    }

    if(wordsMatched && str.length === targetWord.length){
      indicateDoor();
      $('.user-text').css({
        color: green 
      });
    }
  });

  var intervalRef;
  var generateTargetWord = function(length){
    var str = "";
    for(var ii = 0; ii < length; ii++){
      var rawValue = Math.floor(Math.random()* (maxASCIICode - minASCCICode));
      var actualASCII = rawValue + minASCCICode;
      str += String.fromCharCode(actualASCII);
    }
    return str;
  };

  var setWord = function(){
    targetWord = generateTargetWord(4);
    $('.target-word').text(targetWord);
  };

  var secretDoor;

  // Moving doors maybe?
  var initDoors = function(count){
    secretDoor = Math.floor(Math.random() * count);
    for(var ii = 0; ii < count; ii++){
      doors.push({
        x: width * .8,
        y: (Math.random() * height*0.8) + height*0.1,
        color: 'black',
        isSecretDoor: ii === secretDoor,
        height: 20,
        width: 10
      })
    }
  };

  var maxMonsters = 10;
  var gameOver = false;

  var checkIfPlayerHit = function(){

    for(var ii = 0; ii < monsters.length; ii++){
      var monster = monsters[ii];
      var collision = intersectRect({
        left: mouseX,
        right: mouseX + playerWidth,
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

  var drawDoors = function(){
    for(var ii = 0; ii < doors.length; ii++){
      var door = doors[ii];
      ctx.beginPath();
      ctx.rect(door.x, door.y, door.width, door.height);
      ctx.fillStyle = door.color;
      ctx.fill();
    }
  }

  var startGame = function(){
    str = "";
    doors = [];
    monsters = [];
    initDoors(2);
    $(".user-text")
    .text("Type in the word in reverse to get a hint of which door to take. Or not and just guess!");
    console.log('Starting Game...');
    clearInterval(intervalRef);
    setWord();
    render();
  };

  var render = function(){
    if(gameOver) return;
    ctx.clearRect(0,0, width, height);

    // Draw player
    ctx.beginPath();
    ctx.rect(mouseX, mouseY, playerWidth, playerHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    drawDoors();
    checkMonsters();
    //updateMonsters();

    checkIfPlayerHit();

    intervalRef = setTimeout(function(){
      render();
    }, 1000/60)
  }

window.onload = function(){
  startGame();
  document.addEventListener('mousemove', function(ee){
    mouseX = ee.clientX;
    mouseY = ee.clientY;
  });

};
