  var canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d'),
  width = canvas.width = window.innerWidth,
  height = canvas.height = window.innerHeight;
  var ctx = context;
  var mouseX  = 0;
  var mouseY = 0;
  var targetWord = '';
  // A = 65
  var minASCCICode = 65;
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

  var indicateDoor = function(){
    console.log('ENABLE DOOR!');
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
        color: '#2eec40'
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
        height: 100,
        width: 20
      })
    }
  };

  var startGame = function(){
    str = "";
    doors = [];
    initDoors(2);
    $(".user-text")
    .text("Type in the word in reverse to get a hint of which door to take. Or not and just guess!");
    console.log('Starting Game...');
    clearInterval(intervalRef);
    setWord();
    render();
  };

  var render = function(){
    ctx.clearRect(0,0, width, height);
    ctx.beginPath();
    ctx.rect(mouseX, mouseY, 50,50);
    ctx.fillStyle = "black";
    ctx.fill();

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
