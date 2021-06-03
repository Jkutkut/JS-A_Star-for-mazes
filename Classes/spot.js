class MazeSpot {
    constructor (x, y, wall=undefined) {
        this.i = x;
        this.j = y;

        //A* data
        this.g = 0;//cost until here
        this.h = 0;//heuristics
        this.f = 0;//cost function

        //More data
        this.neighbors = [];
        this.previous = undefined;

        if (wall != undefined) {
            this.wall = wall;
        }
        else {
            this.wall = random(1) < 0.4;
        }
    }

    show(c) {
        if(this.wall){
            fill(Maze.COLORS.cWhite);
            rect(this.i * w, this.j * h, w, h);
            fill(Maze.COLORS.cBlack);
            rect(this.i * w, this.j * h, w - 0.5, h - 0.5);
        }
        else if(c){
            //noStroke();
            // stroke(col);
            fill(c);
            rect(this.i * w, this.j * h, w - 1, h - 1);
        }
    }

    addNeighbors(parent) {
        this.neighbors = [];
        // Only vertical and horizontal moves
        for (let i = -1; i <= 1; i++) {
            let x = this.i + i;
            let y = this.j;

            if (!(x < 0 || y < 0 ||
                  x >= parent.rows || y >= parent.cols)) {
                this.neighbors.push(parent.grid[x][y]);
            }

            x = this.i;
            y = this.j + i;
            if (!(x < 0 || y < 0 ||
                  x >= parent.rows || y >= parent.cols)) {
                this.neighbors.push(parent.grid[x][y]);
            }
        }
    }
}

class Spot extends MazeSpot {
    constructor (x, y, wall=undefined) {
        super(x, y, wall);
    }

    addNeighbors(parent) { // Allow diagonal moves
        this.neighbors = [];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let x = this.i + i;
                let y = this.j + j;
    
                if (j === 0 && i === 0 ||
                    x < 0 || y < 0 ||
                    x >= parent.rows || y >= parent.cols) continue;
                
                this.neighbors.push(parent.grid[x][y]);
            }
        }
    }
}