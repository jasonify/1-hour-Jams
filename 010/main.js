// Prep
var data = [];
for(var ii = 0; ii < 20; ii++){
  data.push(ii*10);
};

// D3
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
function animate(){

  circleEnter.attr('cy', function(d, i){
    console.log(Math.sin(time + i));
    //return Math.random() * 200;
    return Math.sin((time + i) * 0.1) * 100 + 150;
  });

  time++;




  setTimeout(function(){
    requestAnimationFrame(animate);
  }, 1000/20);
}


animate();
