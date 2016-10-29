var circle = d3.selectAll('circle');
circle.style('fill', 'purple');


function animate(){


circle.attr("cy", function(){
  return Math.random() * 500;
});

  setTimeout(function(){
    requestAnimationFrame(animate);
  }, 1000/20);
}


animate();
