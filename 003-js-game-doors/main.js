console.log('hello');

window.onload = function(){

  var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight;
      var ctx = context;


$(document).keypress(function(event){
  console.log(String.fromCharCode(event.charCode));
});



};
