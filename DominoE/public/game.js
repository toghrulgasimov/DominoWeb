let tempStone = null;

class Game {
    constructor() {
        this.table = [];
        this.players = [];

    }

    getOpenStone() {
        let s = [];
        for (let i = 0; i < this.table.length; i++) {

        }
    }


    emitPlayerEvents(gamePad) {
        for (let i = 0; i < this.players[0].hand.length; i++) {
            let fck = this.players[0].hand[i];
            this.players[0].hand[i].d.on("pointerdown", (event) => {
                console.log(fck);
                if (this.table.length == 0) {
                    fck.translate(gamePad / 2, gamePad / 2, 1000);
                    fck.rotate(90, 1000);
                    this.play(fck, null);
                } else {
                    if (tempStone != null)
                        this.play(tempStone, fck);
                    else
                        tempStone = fck;
                }
            });
        }
    }


    play(selectedStone, destStone) {
        console.log("cagir meni");

        if (this.table.length == 0)
            this.table.push(selectedStone);
        else {
            for (let x in selectedStone.active) {
                for (let y in destStone.active) {
                    if (selectedStone.active[x] == destStone.active[y]) {
                        delete selectedStone.active[x];
                        delete destStone.active[y];
                    }
                }
            }
            this.table.push(selectedStone);
        }
        console.log(this.table);
    }
}