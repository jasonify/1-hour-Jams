// Prep
var data = [];
for(var ii = 0; ii < 30; ii++){
  data.push(ii*10);
};


var agents = [];

for(var ii = 0; ii < 10; ii++){
}
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


  //var rect = document.getElementById('enemy');
  var rect = svgRoot.createSVGRect();
  rect.x = 0 
  rect.y = 0  
  rect.height =  100;
  rect.width =  100;
  console.log(rect);

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
    var isCollisoin = svgRoot.checkIntersection(curr, rect);
    if(isCollisoin){
      console.log('collidning!');
    }
  });



  time++;




  setTimeout(function(){
    requestAnimationFrame(animate);
  }, 1000/30);
}


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
