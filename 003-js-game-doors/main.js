
window.onload = function(){

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
  var str = ""

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
  }
  $(document).keypress(function(event){
    console.log(event.charCode);
    console.log(String.fromCharCode(event.charCode))

    str += String.fromCharCode(event.charCode);
    $('.text').text(str);
    console.log();
    var wordsMatched = wordsMatch();
    console.log('wordsMatch', wordsMatched);
    if(wordsMatched && str.length === targetWord.length){
      indicateDoor();
    }
  });

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

  var startGame = function(){
    console.log('Starting Game...');
    setWord();
    render();
  };

  var render = function(){

    ctx.clearRect(0,0, width, height);
    ctx.beginPath();
    ctx.rect(mouseX, mouseY, 50,50);
    ctx.fillStyle = "black";
    ctx.fill();


    setTimeout(function(){
      render();
    }, 1000/60)
  }
  startGame();

  document.addEventListener('mousemove', function(ee){
    mouseX = ee.clientX;
    mouseY = ee.clientY;
  });

};
