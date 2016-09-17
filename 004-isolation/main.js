console.log('Init');
var graph;
    function myGraph() {

        // Add and remove elements on the graph object
        this.addNode = function (id, color) {
            var node = {"id": id, radius: 10, color: color};
            nodes.push(node);
            update();
            return node;
        };


        this.updateNode = function(id, radius, color) {
          var i = 0;
          var n = findNode(id);
          n.radius = radius;
          n.color = color;

          update();
        };

        this.removeNode = function (id) {
            var i = 0;
            var n = findNode(id);
            while (i < links.length) {
                if ((links[i]['source'] == n) || (links[i]['target'] == n)) {
                    links.splice(i, 1);
                }
                else i++;
            }
            nodes.splice(findNodeIndex(id), 1);
            update();
        };

        this.removeLink = function (source, target) {
            for (var i = 0; i < links.length; i++) {
                if (links[i].source.id == source && links[i].target.id == target) {
                    links.splice(i, 1);
                    break;
                }
            }
            update();
        };

        this.removeallLinks = function () {
            links.splice(0, links.length);
            update();
        };

        this.removeAllNodes = function () {
            nodes.splice(0, links.length);
            update();
        };

        this.addLink = function (source, target, value) {
            links.push({"source": findNode(source), "target": findNode(target), "value": value});
            update();
        };

        var findNode = function (id) {
            for (var i in nodes) {
                if (nodes[i]["id"] === id) return nodes[i];
            }
            ;
        };

        var findNodeIndex = function (id) {
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].id == id) {
                    return i;
                }
            }
            ;
        };

        // set up the D3 visualisation in the specified element
        var w = 960,
                h = 450;

        var color = d3.scale.category10();

        var vis = d3.select("body")
                .append("svg:svg")
                .attr("width", w)
                .attr("height", h)
                .attr("id", "svg")
                .attr("pointer-events", "all")
                .attr("viewBox", "0 0 " + w + " " + h)
                .attr("perserveAspectRatio", "xMinYMid")
                .append('svg:g');

        var force = d3.layout.force();

        var nodes = force.nodes(),
                links = force.links();

        var update = function () {
            var link = vis.selectAll("line")
                    .data(links, function (d) {
                        return d.source.id + "-" + d.target.id;
                    });

            link.enter().append("line")
                    .attr("id", function (d) {
                        return d.source.id + "-" + d.target.id;
                    })
                    .attr("stroke-width", function (d) {
                        return d.value / 10;
                    })
                    .attr("class", "link");
            link.append("title")
                    .text(function (d) {
                        return d.value;
                    });
            link.exit().remove();

            var node = vis.selectAll("g.node")
                    .data(nodes, function (d) {
                        return d.id;
                    });

            node
              .on("click", function() {
                var c = d3.select(this).classed("doubled");
                d3.select(this).classed("doubled", !c);
                console.log('clicked', this)

                this.remove();
              })

            var nodeEnter = node.enter().append("g")
                    .attr("class", "node")
                    .call(force.drag);

            nodeEnter.append("svg:circle")
                    .attr("class", "circle")
                    .attr("r", function(d) {
                      if(d.radius == null) {
                        return 2;
                      } else {
                        return d.radius;
                      }

                    })
                    .attr('data-id',function(d){
                      return d.id;
                    })
                    .attr("id", function (d) {
                        return "Node;" + d.id;
                    })
                    .attr("class", "nodeStrokeClass")
                    .attr("fill", function(d) { return d.color || color(d.id); });
            nodeEnter.append("svg:text")
                    .attr("class", "textClass")
                    .attr("x", 14)
                    .attr("y", ".31em")
                    .text(function (d) {
                        return d.id;
                    });

            node.exit().remove();

            force.on("tick", function () {

                node.attr("transform", function (d) {
                    return "translate(" + d.x + "," + d.y + ")";
                });

                node.select('circle')
                  .style('fill', function(d) {

                    if(d.color) return d.color;
                    if(d.radius > 20){

                      return '#eee';
                    }

                  })
                  .attr("r", function(d) {

                    if(d.radius == null) {
                      return 2;
                    } else {
                      return d.radius * 2;
                    }

                  })

                link.attr("x1", function (d) {
                    return d.source.x;
                })
                        .attr("y1", function (d) {
                            return d.source.y;
                        })
                        .attr("x2", function (d) {
                            return d.target.x;
                        })
                        .attr("y2", function (d) {
                            return d.target.y;
                        });
            });

            // Restart the force layout.
            force
                    .gravity(.01)
                    .charge(-80000)
                    .friction(0)
                    .linkDistance( function(d) { return d.value * 10 } )
                    .size([w, h])
                    .start();
        };


        // Make it all go
        update();
    }

    function drawGraph() {

        graph = new myGraph("#svgdiv");

        // Our sample dataset
        var nodeList = [
          {
            name: 'A',
            links: ['B',  'D']
          },

          {
            name: 'B',
            links: [ 'A' , 'E']
          },

          {
            name: 'C',
            links: [ 'D' ]
          },

          {
            name: 'D',
            links: [ 'A', 'C', 'E' ]
          },
          {
            name: 'E',
            links: [ 'D' , 'B']
          },
        ];


        // Node List
        var A = { 'name': 'A', links: []};
        var B = { 'name': 'B', links:[]};
        var C = { 'name': 'C', links:[]};
        var D = { 'name': 'D', links:[]};
        var E = { 'name': 'E', links:[]};

        var X = { 'name': 'X',  radius: 2, links:[A]};
        A.links.push(X);
        // A
        A.links.push(B);
        A.links.push(D);

        // B
        B.links.push(A);
        B.links.push(B);

        // C
        C.links.push(D);

        // D
        D.links.push(A);
        D.links.push(C);
        D.links.push(E);

        // E
        E.links.push(D);
        E.links.push(B);


        console.log('A', A);
        console.log('B', B);
        console.log('X', B);


        var NodeEls = {

        }
        // Add nodes:
        for(var ii = 0; ii < nodeList.length; ii++) {
          var node = nodeList[ii];
          NodeEls[node.name]  = graph.addNode(node.name, '#eee');

        }

        // Add connections
        for(var ii = 0; ii < nodeList.length; ii++) {
          var node = nodeList[ii];
          for(var  xx = 0; xx < node.links.length; xx++ ){
            graph.addLink(node.name, node.links[xx], 10);
          }
        }

        var graphStart = nodeList[0];

        var xNode;
        setTimeout(function() {
          console.log('add node')
             xNode =  graph.addNode(X.name, '#000');
            graph.addLink(X.name, 'A', 10);

            keepNodesOnTop();

        }, 100);
        setTimeout(function(){
          xNode.radius = 15;
          keepNodesOnTop();

        }, 500);






        keepNodesOnTop();

    }

    drawGraph();

    // because of the way the network is created, nodes are created first, and links second,
    // so the lines were on top of the nodes, this just reorders the DOM to put the svg:g on top
    function keepNodesOnTop() {
        $(".nodeStrokeClass").each(function( index ) {
            var gnode = this.parentNode;
            gnode.parentNode.appendChild(gnode);
        });
    }
    function addNodes() {
        d3.select("svg")
                .remove();
         drawGraph();
    }
