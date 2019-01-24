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
        for (let i = 0; i < this.players.length; i++) {
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
        for (let i = 0; i < playerCount; i++) {
            this.players.push(new Player());
        }
        this.distribute();

        for (let i = 0; i < this.players[0].hand.length; i++) {
            let s = this.players[0].hand[i];
            let player = this.players[0];
            s.TYPE = "HAND";


            this.players[0].hand[i].d.on("pointerdown", async (event) => {
                console.log(s);
                if (this.table.length == 0) {

                    s.TYPE = "TABLE";
                    s.lightOff();
                    s.deSelect();
                    this.play(s, null);

                } else {
                    if (s.TYPE == "HAND") {
                        if (player.selectedStone != null) {
                            player.selectedStone.deSelect();
                        }
                        player.selectedStone = s;
                        player.selectedStone.select();
                        player.selectedStone.lightOn();
                        for (let j = 0; j < this.table.length; j++) {
                            this.table[j].lightOff();
                            await this.table[j].deSelect();
                            for (let x in this.table[j].active) {
                                if (this.table[j].active[x] == player.selectedStone.active["left"] ||
                                    this.table[j].active[x] == player.selectedStone.active["right"]) {
                                    this.table[j].lightOn();
                                    await this.table[j].select();
                                }
                            }
                        }
                    } else {
                        if (s.islightOn() && player.selectedStone != null) {
                            this.play(player.selectedStone, s);
                            player.selectedStone.TYPE = "TABLE";
                            s.lightOff();
                            s.deSelect();
                            player.selectedStone.lightOff();
                            player.selectedStone.deSelect();
                            player.selectedStone = null;
                        }
                    }

                }
            });
        }

        this.lightActiveStones();
    }

    play(selectedStone, destStone) {
        if (this.table.length == 0) {
            this.moveStone(selectedStone,null);
            this.table.push(selectedStone);
        }
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
            this.moveStone(selectedStone,destStone);

        }

        this.lightActiveStones();
    }

    lightActiveStones() {

        if (this.table.length == 0) {
            for (let i = 0; i < this.players[0].hand.length; i++)
                this.players[0].hand[i].lightOn();
        } else {
            for (let i = 0; i < this.players[0].hand.length; i++) {
                this.players[0].hand[i].lightOff();
                for (let j = 0; j < this.table.length; j++) {
                    for (let x in this.table[j].active) {
                        if ((this.table[j].active[x] == this.players[0].hand[i].active["left"] ||
                            this.table[j].active[x] == this.players[0].hand[i].active["right"])
                            && this.players[0].hand[i].TYPE == "HAND") {
                            this.players[0].hand[i].lightOn();
                        }
                    }
                }
            }
        }

    }

    moveStone(selectedStone,destStone){
        if(destStone == null) {
            selectedStone.translate(200, 200, 500);
            selectedStone.rotate(90, 500);
            return;
        }
        // r-r
        // l-l
        // r-l
        // l-r

        selectedStone.translate(destStone.d.x + 120, destStone.d.y, 500);
        if(destStone.active["left"] == selectedStone.active["left"]) {
            selectedStone.rotate(-90, 500);
        }else if(destStone.active["right"] == selectedStone.active["right"]) {
            selectedStone.rotate(-90, 500);
        }else if(destStone.active["left"] == selectedStone.active["right"]) {
            selectedStone.rotate(90, 500);
        }else if(destStone.active["right"] == selectedStone.active["left"]) {
            selectedStone.rotate(90, 500);
        }

    }


}