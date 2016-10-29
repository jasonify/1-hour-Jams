var circle = d3.selectAll('circle');
circle.style('fill', 'purple');



circle.attr("cy", function(){
  return Math.random() * 700;
});

