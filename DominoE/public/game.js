let tempStone = null;

class Game {
    constructor() {
        this.table = [];
        this.players = [];

    }

    init(gamePad) {
        for (let i = 0; i < this.players[0].hand.length; i++) {
            let s = this.players[0].hand[i];
            let player = this.players[0];
            s.TYPE = "HAND";
            this.players[0].hand[i].d.on("pointerdown", (event) => {
                console.log(s);

                if (this.table.length == 0) {
                    s.translate(gamePad / 2, gamePad / 2, 1000);
                    s.rotate(90, 1000);
                    s.TYPE = "TABLE";
                    this.play(s, null);
                } else {
                    if(s.TYPE == "HAND") {
                        if(player.selectedStone != null) {
                            player.selectedStone.d.alpha = 0.6;
                        }

                        player.selectedStone = s;
                        player.selectedStone.d.alpha = 1;


                        for(let j = 0; j < this.table.length; j++) {
                            this.table[j].d.alpha = 0.6;
                            //console.log(this.table[j].active);
                            for(let x in this.table[j].active) {
                                if(this.table[j].active[x] == player.selectedStone.active["left"] ||
                                    this.table[j].active[x] == player.selectedStone.active["right"]) {
                                    this.table[j].d.alpha = 1;
                                }
                            }
                        }


                    }else {
                        if(s.d.alpha == 1 && player.selectedStone != null) {
                            this.play(player.selectedStone, s);
                            player.selectedStone.TYPE = "TABLE";
                            s.d.alpha = 0.6;
                            player.selectedStone.d.alpha = 0.6;
                            player.selectedStone = null;
                        }
                    }

                }
            });
        }
    }

    play(selectedStone, destStone) {
        if (this.table.length == 0)
            this.table.push(selectedStone);
        else {
            for (let x in selectedStone.active) {
                for (let y in destStone.active) {
                    if (selectedStone.active[x] == destStone.active[y]) {
                        delete selectedStone.active[x];
                        delete destStone.active[y];
                        break;
                    }
                }
            }
            this.table.push(selectedStone);
            selectedStone.translate(destStone.d.x+120,destStone.d.y,1000);
            //selectedStone.rotate(-90,1000);
        }
    }
}