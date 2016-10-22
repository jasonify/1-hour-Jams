
var isGood = true;
var width = window.innerWidth;
var height = window.innerHeight;
var $lime = $('#lime');
var transform = "translate("+width/2 + "px, " + height/2+"px) scale(3,3)";
console.log('translate', transform)
$lime.css({
  transform:  transform,
  cursor: 'pointer'
 
});


$lime.click(function(ee){
  if(isGood){
    console.log('YAY');

  }else{
    console.log('NOOOOO');
  }
  console.log(ee);
});



setInterval(function(){
  if(Math.random() <= 0.5){
    isGood = true;
  } else {
    isGood = false;
  }

  if(isGood){
    $lime.css({'opacity': 1});
  } else{
    $lime.css({'opacity': 0.5});
  }
}, 500);
function aniamte(){
  
}


