function spot(x, y, wall=undefined){
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

    this.show = function(col){
        if(this.wall){
            fill(cWhite);
            rect(this.i * w, this.j * h, w, h);
            fill(cBlack);
            rect(this.i * w, this.j * h, w - 0.5, h - 0.5);
        }
        else if(col){
            //noStroke();
            stroke(col);
            fill(col);
            rect(this.i * w, this.j * h, w - 1, h - 1);
        }
    }

    this.addNeighbors = function(grid){
        this.neighbors = [];
        // Allow diagonal moves

        // for (let i = -1; i <= 1; i++) {
        //   for (let j = -1; j <= 1; j++) {
        //     let x = this.i + i;
        //     let y = this.j + j;

        //     if (j === 0 && i === 0 ||
        //         x < 0 || y < 0 ||
        //         x >= rows || y >= cols) continue
        //     this.neighbors.push(grid[x][y]);
        //   }
        // }

        // Only vertical and horizontal moves
        for (let i = -1; i <= 1; i++) {
            let x = this.i + i;
            let y = this.j;

            if (!(x < 0 || y < 0 ||
                  x >= rows || y >= cols)) {
                this.neighbors.push(grid[x][y]);
            }

            x = this.i;
            y = this.j + i;
            if (!(x < 0 || y < 0 ||
                  x >= rows || y >= cols)) {
                this.neighbors.push(grid[x][y]);
            }
        }
    }
}