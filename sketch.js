var maze;
var w = 10;
var h = w;

function setup() {
  maze = new Maze(windowWidth, windowHeight, w, h);
  
  rows = Math.floor(windowWidth / w);
  if (rows % 2 == 0) rows--;
  cols = Math.floor(windowHeight / h);
  if (cols % 2 == 0) cols--;

  createCanvas(rows * w, cols * h);

  strokeWeight(0);
  for (let i = 0; i < maze.rows; i++) {
      for (let j = 0; j < maze.cols; j++) {
          maze.grid[i][j].show();
      }
  }

}

function draw() {
  for (var i = 0; i < maze.path.length; i++) {
    maze.path[i].show(Maze.COLORS.cGrey);
  }

  maze.nextA_StarStep();
  
  for (var i = 0; i < maze.path.length; i++) {
    maze.path[i].show(Maze.COLORS.cBlue);
  }
  maze.end.show(Maze.COLORS.cRed);
}