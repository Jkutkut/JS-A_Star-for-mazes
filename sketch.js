//Global variables
var cols;
var rows;
var w = 20; // horizontal size of each cell
var h = w; // vertical size of each cell


var grid;

var start, end;
var openSet = [];
var closedSet = [];

// The road taken
var path = [];

//colors:
var cWhite, cBlack, cBlue, cYellow, cGandY, cGrey, cRed;

function heuristics(a, b){//dist a to b (heuristitcs)
  return dist(a.i, a.j, b.i, b.j);
}


function setup() {

  rows = Math.floor(windowWidth / w);
  cols = Math.floor(windowHeight / h);


  createCanvas(rows * w, cols * h);
  background(230);
  
  //setup colors:
  cWhite = color(240);
  cBlack = color(0,0,0);
  cBlue = color(0, 255, 255);
  cYellow = color(255, 255, 0);
  cGandY = color(200, 255, 0);
  cGrey = color(190, 190, 190);
  cRed = color(255, 0, 0);

  
  //create grid and add neighbors:
  grid = new Array(rows);
  for(let i = 0; i < rows;i++){
    grid[i] = new Array(cols);
    for(let j = 0; j < cols; j++){
      grid[i][j] = new spot(i,j);
    }
  }
  for(let i = 0; i < rows;i++){
    for(let j = 0; j < cols; j++){
      grid[i][j].addNeighbors(grid);
    }
  }
  
  //add start and end (there are not walls)
  start = grid[0][0];
  end = grid[rows - 1][cols - 1];
  start.wall = false;
  end.wall = false;
  
  //we start from the begining
  openSet.push(start);
}

function draw() {
  nextA_StarStep()
  
  //Draw everything
  background(cWhite);
  for (let i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      grid[i][j].show();
    }
  }
  for (let i = 0; i < closedSet.length; i++) {
    closedSet[i].show(cGrey);
  }
  for (let i = 0; i < openSet.length; i++) {
    openSet[i].show(cGandY);
  }
  
  // Find the path by working backwards
  path = [];
  var temp = current;
  path.push(temp);
  while (temp.previous) {
    //console.log(temp.i + ", "+ temp.j);
    path.push(temp.previous);
    temp = temp.previous;
  }
   for (var i = 0; i < path.length; i++) {
     path[i].show(cBlue);
   }
  end.show(cRed);
}

function nextA_StarStep() {
  if(openSet.length > 0){//if still searching
    //we can order them with "openSet.sort(spotComparison);"
    //but we search only for the best
    var indexBestSpot = 0;
    for(let i = 0; i < openSet.length; i++){
      if(openSet[i].f < openSet[indexBestSpot].f){//if i better index
        indexBestSpot = i;
      }
    }
    var current = openSet[indexBestSpot];
    if(current === end){//if current is the end => finish
      console.log("Done!, there is a way!");
      for(let p = path.length - 1, q = 1; p > 0; p--, q++){
        console.log(q + "º (" + path[p].i + ", " + path[p].j +")");
      }
      noLoop();
    }
    
    openSet.splice(indexBestSpot, 1);//remove the best from openSet
    closedSet.push(current);//add it to the closed
    
    var neighbors = current.neighbors;//get them from current
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];

      // Valid next spot?
      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        var tempG = current.g + heuristics(neighbor, current);

        // Is this a better path than before?
        var newPath = false;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }

        // Yes, it's a better path
        if (newPath) {
          neighbor.h = heuristics(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }

    }
  }
  else{//if no other way to go
    console.log("Ups, there is no way to go to the end");
    noLoop();
    return;
  }
}