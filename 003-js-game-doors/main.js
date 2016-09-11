console.log('hello');

window.onload = function(){

  var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight;
      var ctx = context;

  var str = ""
  $(document).keypress(function(event){
    console.log(event.charCode);
    console.log(String.fromCharCode(event.charCode))

    str += String.fromCharCode(event.charCode);
    $('.text').text(str);
    console.log();
  });


};

// A = 65
var minASCCICode = 65;
// z  = 122
var maxASCIICode = 122;

var generateTargetWord = function(length){
  var str = "";
  for(var ii = 0; ii < length; ii++){
    var rawValue = Math.floor(Math.random()* (maxASCIICode - minASCCICode));
    var actualASCII = rawValue + minASCCICode;
    str += String.fromCharCode(actualASCII);
  }
    return str;
};
