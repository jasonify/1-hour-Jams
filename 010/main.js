// Prep
var data = [];
for(var ii = 0; ii < 10; ii++){
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

function animate(){

  circleEnter.attr('cy', function(d, i){
    return Math.random() * 200;
  });





  setTimeout(function(){
    requestAnimationFrame(animate);
  }, 1000/20);
}


animate();
