class MazePrototype {
    static COLORS = {
        cWhite: [240],
        cBlack: [0, 0, 0],
        cBlue: [0, 255, 255],
        cYellow: [255, 255, 0],
        cGandY: [200, 255, 0],
        cGrey: [161, 161, 161],
        cRed: [255, 0, 0]
    }

    constructor(canvasWidth, canvasHeight, cellWidth, cellHeight=cellWidth) {
        
        this.size = {
            width: canvasWidth,
            height: canvasHeight,
            w: cellWidth,
            h: cellHeight
        };

        this.rows = Math.floor(canvasWidth / cellWidth);
        if (this.rows % 2 == 0) this.rows--;
        
        this.cols = Math.floor(canvasHeight / cellHeight);
        if (this.cols % 2 == 0) this.cols--;

        // A* variables
        this.grid;
        this.initGrid(); // update grid

        for(let i = 0; i < this.rows; i++){ // Tell each spot their neighbors
            for(let j = 0; j < this.cols; j++){
                grid[i][j].addNeighbors(this.grid);
            }
        }

        //add start and end (they are not walls)
        this.start = this.grid[1][0];
        this.end = this.grid[this.rows - 2][this.cols - 1];
        this.start.wall = false;
        this.end.wall = false;

        this.openSet = [];
        this.closedSet = [];
        this.path = [];

        //we start from the begining
        openSet.push(start);
    }

    initGrid() {}

    nextA_StarStep() {
        if(this.openSet.length > 0) { // if still searching
            //we can order them with "openSet.sort(spotComparison);"
            //but we search only for the best
            let indexBestSpot = 0;
            for(let i = 0; i < this.openSet.length; i++){
                if(this.openSet[i].f < this.openSet[indexBestSpot].f) { // if i better index
                    indexBestSpot = i;
                }
            }
            let current = this.openSet[indexBestSpot];
            if(current === this.end) { // if current is the end => finish
                console.log("Done!, there is a way!");
                for(let p = this.path.length - 1, q = 1; p > 0; p--, q++){
                    console.log(q + "º (" + this.path[p].i + ", " + this.path[p].j +")");
                }
                noLoop();
            }

            this.openSet.splice(indexBestSpot, 1);//remove the best from openSet
            this.closedSet.push(current);//add it to the closed

            let neighbors = current.neighbors;//get them from current
            for (let i = 0; i < neighbors.length; i++) {
                let neighbor = neighbors[i];

                // Valid next spot?
                if (!this.closedSet.includes(neighbor) && !neighbor.wall) {
                    let tempG = current.g + this.heuristics(neighbor, current);

                    // Is this a better path than before?
                    let newPath = false;
                    if (this.openSet.includes(neighbor)) {
                        if (tempG < neighbor.g) {
                            neighbor.g = tempG;
                            newPath = true;
                        }
                    } 
                    else {
                        neighbor.g = tempG;
                        newPath = true;
                        this.openSet.push(neighbor);
                        neighbor.show(cGandY);
                    }

                    // Yes, it's a better path
                    if (newPath) {
                        neighbor.h = this.heuristics(neighbor, end);
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

        // Find the path by working backwards
        this.path = [];
        let temp = current;
        this.path.push(temp);
        while (temp.previous) {
            this.path.push(temp.previous);
            temp = temp.previous;
        }
    }

    heuristics(a, b){//dist a to b (heuristitcs)
        return dist(a.i, a.j, b.i, b.j);
    }
}

class Maze extends MazePrototype {
    constructor(canvasWidth, canvasHeight, cellWidth, cellHeight=cellWidth) {
        super(canvasWidth, canvasHeight, cellWidth, cellHeight);
    }

    initGrid() {
        this.grid = primMaze(rows, cols);
    }
}

class RandomMaze extends MazePrototype {
    constructor(canvasWidth, canvasHeight, cellWidth, cellHeight=cellWidth) {
        super(canvasWidth, canvasHeight, cellWidth, cellHeight);
    }

    initGrid() {
        this.grid = new Array(this.rows);
        for(let i = 0; i < this.rows; i++) {
            grid[i] = new Array(this.cols);
            for(let j = 0; j < this.cols; j++){
                grid[i][j] = new Spot(i, j);
            }
        }
    }
}