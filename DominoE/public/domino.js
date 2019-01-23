class Domino {
    constructor(S) {
        this.S = S;
    }
    update() {
        for(let x in this.S) {
            this.S[x].update();
        }
    }
    allTurnB() {
        for(let x in this.S) {
            this.S[x].turnB();
        }
    }
    disableAll() {
        for(let x in this.S) {
            this.S[x].translate(0, 0, 1000);
        }
    }
}