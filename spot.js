function spot(x, y){
  this.i = x;
  this.j = y;
  
  //A* data
  this.g = 0;//cost until here
  this.h = 0;//heuristics
  this.f = 0;//cost function
  
  //More data
  this.neighbors = [];
  this.previous = undefined;
  this.wall = random(1) < 0.4;
  
  this.show = function(col){
    if(this.wall){
      stroke(cBlack);
      fill(cBlack);
      rect(this.i * w, this.j * h, w - 1, h - 1);
    }
    else if(col){
      //noStroke();
      stroke(col);
      fill(col);
      rect(this.i * w, this.j * h, w - 1, h - 1);
    }
  }
  
  this.addNeighbors = function(grid){
    var i = this.i;
    var j = this.j;
    if (i < cols - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
    if (i > 0 && j > 0) {
      this.neighbors.push(grid[i - 1][j - 1]);
    }
    if (i < cols - 1 && j > 0) {
      this.neighbors.push(grid[i + 1][j - 1]);
    }
    if (i > 0 && j < rows - 1) {
      this.neighbors.push(grid[i - 1][j + 1]);
    }
    if (i < cols - 1 && j < rows - 1) {
      this.neighbors.push(grid[i + 1][j + 1]);
    }
  }
}