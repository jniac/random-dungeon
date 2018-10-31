
class Neighbors extends Map {

    get E() { return this.get(0) }
    set E(value) { this.set(0, value) }
    get SE() { return this.get(1) }
    set SE(value) { this.set(1, value) }
    get S() { return this.get(2) }
    set S(value) { this.set(2, value) }
    get SW() { return this.get(3) }
    set SW(value) { this.set(3, value) }
    get W() { return this.get(4) }
    set W(value) { this.set(4, value) }
    get NW() { return this.get(5) }
    set NW(value) { this.set(5, value) }
    get N() { return this.get(6) }
    set N(value) { this.set(6, value) }
    get NE() { return this.get(7) }
    set NE(value) { this.set(7, value) }

}

Object.defineProperty(Neighbors.prototype, Symbol.iterator, {

    value: function() { return this.values() },

})

class Cell {

    constructor(x, y) {

        let neighbors = new Neighbors()

        Object.assign(this, { x, y, neighbors })

    }

}

class Grid {

    constructor(width = 40, height = 40) {

        let cells = []

        for (let y = 0; y < height; y++) {

            for (let x = 0; x < width; x++) {

                let cell = new Cell(x, y)

                if (y > 0) {

                    let N = cells[(y - 1) * width + x]
                    cell.neighbors.N = N
                    N.neighbors.S = cell

                    if (x > 0) {

                        let NW = cells[(y - 1) * width + x - 1]
                        cell.neighbors.NW = NW
                        NW.neighbors.SE = cell

                    }

                    if (x < width - 1) {

                        let NE = cells[(y - 1) * width + x + 1]
                        cell.neighbors.NE = NE
                        NE.neighbors.SW = cell

                    }

                }

                if (x > 0) {

                    let W = cells[y * width + x - 1]
                    cell.neighbors.W = W
                    W.neighbors.E = cell

                }

                cells.push(cell)

            }

        }

        Object.assign(this, { width, height, cells })

    }

    cell(x, y) {

        let { cells, width, height } = this

        if (x < 0)
            x += width

        if (y < 0)
            y += height

        return cells[y * width + x]

    }

}

Object.assign(window, { Grid, Cell })

export { Grid, Cell }
