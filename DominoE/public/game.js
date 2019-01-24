let tempStone = null;

class Game {
    constructor(A, playerCount) {
        this.table = [];
        this.players = [];
        this.Bazar = new Bazar(A);
        this.shuffle(this.Bazar.A);
        this.init(600, 1);
    }
    distribute() {
        for(let i = 0; i < this.players.length; i++) {
            this.players[i].hand = this.Bazar.getStone(28);
            this.players[i].arrangeStones();
        }
    }
    shuffle(a) {
        let j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }


    init(gamePad, playerCount) {
        for(let i = 0; i < playerCount; i++) {
            this.players.push(new Player());
        }
        this.distribute();

        for (let i = 0; i < this.players[0].hand.length; i++) {
            let s = this.players[0].hand[i];
            let player = this.players[0];
            s.TYPE = "HAND";
            this.players[0].hand[i].d.on("pointerdown", (event) => {
                if (this.table.length == 0) {
                    s.translate(gamePad / 2, gamePad / 2, 200);
                    s.TYPE = "TABLE";
                    this.play(s, null);
                } else {
                    if(s.TYPE == "HAND") {
                        if(player.selectedStone != null) {
                            player.selectedStone.lightOff();
                        }
                        player.selectedStone = s;
                        player.selectedStone.lightOn();
                        for(let j = 0; j < this.table.length; j++) {
                            this.table[j].lightOff();
                            for(let x in this.table[j].active) {
                                if(this.table[j].active[x] == player.selectedStone.active["left"] ||
                                    this.table[j].active[x] == player.selectedStone.active["right"]) {
                                    this.table[j].lightOn();
                                }
                            }
                        }
                    }else {
                        if(s.islightOn() && player.selectedStone != null) {
                            this.play(player.selectedStone, s);
                            player.selectedStone.TYPE = "TABLE";
                            s.lightOff();
                            player.selectedStone.lightOff();
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

            selectedStone.translate(destStone.d.x+60,destStone.d.y,200);
        }
    }
}