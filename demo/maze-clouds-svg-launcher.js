/*
 * dam.js, dam-widgets.js, and maze-clouds.js should be loaded before this.
 * After this is loaded, call launch() to start the gewgaw.
 */

function makeSVG(container) {
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute('version', "1.1");
  svg.setAttribute('viewBox', "0 0 600 600");
  container.appendChild(svg);
  return svg;
}

function makeSVGElem(svg, tag, cfg) {
  var elem = document.createElementNS(svg.namespaceURI, tag);
  Object.keys(cfg).forEach(function(key) {
    elem.setAttribute(key, cfg[key]);
  });
  svg.appendChild(elem);
  return elem;
}

function launch(config) {
  var CANVAS_WIDTH = 600;
  var CANVAS_HEIGHT = 600;
  var CELL_WIDTH = CANVAS_WIDTH / MAZE_WIDTH;
  var CELL_HEIGHT = CANVAS_HEIGHT / MAZE_HEIGHT;

  var svg = makeSVG(config.container);

  var maze = makeMaze();
  var hue = 180;

  var obtainColour = function(x, y, depth) {
    var l = depth / maze.maxValue;
    var s = 1.0;
    return "hsl(" + hue + "," + Math.trunc(s * 100) + "%," + Math.trunc(l * 100) + "%)";
  };

  function redrawMaze() {
    svg.innerHTML = '';
    drawMaze(maze, function(x, y, depth) {
      makeSVGElem(svg, 'rect', {
          x: x * CELL_WIDTH,
          y: y * CELL_HEIGHT,
          width: CELL_WIDTH + 1,
          height: CELL_HEIGHT + 1,
          fill: obtainColour(x, y, depth)
      });
    });
  }

  var div=DAM.maker('div'), button=DAM.maker('button');
  var controlPanel = div(
    div(
      DAM.makeRange({ title: "Hue:", min: 0, max: 359, value: 180, onchange: function(v) { hue = v; redrawMaze(); } })
    ),
    div(
      DAM.makeSelect({
        title: "Visuals",
        options: [
          {
            text: 'Cumulus',
            value: 1,
            obtainColour: function(x, y, depth) {
              var l = ((depth / maze.maxValue) / 2) + 0.5;
              var s = 1.0;
              return "hsl(" + hue + "," + Math.trunc(s * 100) + "%," + Math.trunc(l * 100) + "%)";
            }
          },
          {
            text: 'Overcast',
            value: 2,
            obtainColour: function(x, y, depth) {
              var l = 0.5;
              var s = depth / maze.maxValue;
              return "hsl(" + hue + "," + Math.trunc(s * 100) + "%," + Math.trunc(l * 100) + "%)";
            }
          },
          {
            text: 'Stormy',
            value: 3,
            obtainColour: function(x, y, depth) {
              var l = depth / maze.maxValue;
              var s = 1.0;
              return "hsl(" + hue + "," + Math.trunc(s * 100) + "%," + Math.trunc(l * 100) + "%)";
            }
          },
          {
            text: 'Quite Stormy',
            value: 4,
            obtainColour: function(x, y, depth) {
              var l = depth / maze.maxValue;
              var s = depth / maze.maxValue;
              return "hsl(" + hue + "," + Math.trunc(s * 100) + "%," + Math.trunc(l * 100) + "%)";
            }
          },
          {
            text: 'Rainbow',
            value: 5,
            obtainColour: function(x, y, depth) {
              var l = 0.5;
              var s = 1.0;
              var h = Math.trunc(depth / maze.maxValue * 360);
              return "hsl(" + h + "," + Math.trunc(s * 100) + "%," + Math.trunc(l * 100) + "%)";
            }
          },
          {
            text: 'Digital',
            value: 6,
            obtainColour: function(x, y, depth) {
              return (depth % 3 === 0) ? "#000000" : "#ffffff";
            }
          }
        ],
        onchange: function(option) {
          obtainColour = option.obtainColour;
          redrawMaze();
        }
      })
    ),
    div(
      button("Re-roll", { onclick: function() { maze = makeMaze(); redrawMaze(); }})
    )
  );
  config.container.appendChild(controlPanel);

  redrawMaze();
}
