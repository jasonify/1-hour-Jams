// Prep
var data = [];
for(var ii = 0; ii < 40; ii++){
  data.push(ii*10);
};


var agents = [];

// D3
var svgRoot =  document.getElementById("svgroot");
var svg = d3.select("svg");
var circle = svg.selectAll("circle")
  .data(data);

  var circleEnter = circle.enter().append("circle");

  circleEnter.attr('r', 8);
  circleEnter.attr('fill', 'green');
  circleEnter.attr('cx', function(d, i){
    return d + 20;
  });


  var time = 0;
  var selectedIndex = 0;


  var leftGood = false;
  var rect = document.getElementById('left');
  var rightRect =  document.getElementById('right');
  /*
  var rect = svgRoot.createSVGRect();
  rect.x = 0 
  rect.y = 0  
  rect.height =  100;
  rect.width =  100;
  */
  console.log(rect);

var points = 0;
var $points = $('#points');
function animate(){


  circleEnter.attr('fill', function(d, index){
   
    if(index === selectedIndex){
      return 'orange';
    }
    return 'green';
 
    
  });


  circleEnter.attr('cy', function(d, i){
    //console.log(Math.sin(time + i));
    return Math.sin((time + i) * 0.1) * 100 + 150;
  });



  circleEnter.each(function(n, a){
    var curr = this;


    var d3Obj =     d3.select(this);


    var collide = function(d3Obj, rect){
      if(d3Obj.attr('fill') === 'orange'){
        var isCollisoin = svgRoot.checkIntersection(curr, rect.getBBox());


        if(isCollisoin){
          if(d3.select(rect).attr('fill') === 'red'){
            console.log('collidning!');
            points--;
          } else {
            points++;
          }
        }

      }

    }
    collide(d3Obj, rect);
    collide(d3Obj, rightRect);

    
  });

  time++;


  $points[0].textContent =  "Points: " + points;

  setTimeout(function(){
    requestAnimationFrame(animate);
  }, 1000/30);
}


setInterval(function(){

  var opposite = function(rect){

    var isRed = d3.select(rect).attr('fill') === 'red';
    if(isRed){
      d3.select(rect).attr('fill', 'lime');
    } else {
      d3.select(rect).attr('fill', 'red');
    }
  };

  opposite(rect);
  opposite(rightRect);
}, 800);
document.onkeydown = function(e){
  e =e || window.event;

  if (e.keyCode == '38') {
    // up arrow
  }
  else if (e.keyCode == '40') {
    // down arrow
  }
  else if (e.keyCode == '37') {
    // left arrow
    selectedIndex--;
    if(selectedIndex<= 0){
      selectedIndex = data.length -1;
    }
  }
  else if (e.keyCode == '39') {
    // right arrow
    selectedIndex++;
    if(selectedIndex>= data.length){
      selectedIndex = 0;
    }
  }
};

animate();


console.log("INSTRUCTIONS");
console.log("");
