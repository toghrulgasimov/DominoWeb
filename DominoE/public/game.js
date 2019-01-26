let tempStone = null;

class Game {
    constructor(A, playerCount) {
        this.table = [];
        this.players = [];
        this.Bazar = new Bazar(A);
        this.shuffle(this.Bazar.A);
        this.init(600, 1);
    }

    eksi(d) {
        // 1:yuxari, 2:sag, 3:asagi, 4:sol (sagin eksi sol yuxarinin eksi asagi ..)
        if(d == 1) return 3;
        if(d == 2) return 4;
        if(d == 3) return 1;
        if(d == 4) return 2;
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
                        if(!s.islightOn()) {
                            return;
                        }
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
                                if (this.table[j].active[x] == player.selectedStone.active["kicik"] ||
                                    this.table[j].active[x] == player.selectedStone.active["boyuk"]) {
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

        this.moveStone2(selectedStone, destStone);

        if (this.table.length == 0) {
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
                        if ((this.table[j].active[x] == this.players[0].hand[i].active["kicik"] ||
                            this.table[j].active[x] == this.players[0].hand[i].active["boyuk"])
                            && this.players[0].hand[i].TYPE == "HAND") {
                            this.players[0].hand[i].lightOn();
                        }
                    }
                }
            }
        }

    }

    async moveStone(selectedStone, destStone) {
        if (destStone == null) {
            if (selectedStone.active["left"] != selectedStone.active["right"])
                selectedStone.rotate(90, 100);

            selectedStone.translate(700, 200, 100);
            return;
        }

        if (destStone.active["left"] != undefined && Math.round(destStone.d.rotation * 180 / Math.PI) == 90) {
            if (destStone.active["left"] == selectedStone.active["left"]) {
                await selectedStone.rotate(-90, 100);
                selectedStone.translate(destStone.d.x, destStone.d.y + 60, 100);
            } else if (destStone.active["left"] == selectedStone.active["right"]) {
                await selectedStone.rotate(90, 100);
                selectedStone.translate(destStone.d.x + 120, destStone.d.y, 100);
            }
        }
        else if (destStone.active["left"] != undefined && Math.round(destStone.d.rotation * 180 / Math.PI) == -90) {
            if (destStone.active["left"] == selectedStone.active["left"]) {
                await selectedStone.rotate(90, 100);
                selectedStone.translate(destStone.d.x, destStone.d.y - 60, 100);
            } else if (destStone.active["left"] == selectedStone.active["right"]) {
                await selectedStone.rotate(-90, 100);
                selectedStone.translate(destStone.d.x - 120, destStone.d.y, 100);
            }
        }
        else if (destStone.active["right"] != undefined && Math.round(destStone.d.rotation * 180 / Math.PI) == 90) {
            if (destStone.active["right"] == selectedStone.active["left"]) {
                await selectedStone.rotate(90, 100);
                selectedStone.translate(destStone.d.x - 120, destStone.d.y, 100);
            } else if (destStone.active["right"] == selectedStone.active["right"]) {
                await selectedStone.rotate(-90, 100);
                selectedStone.translate(destStone.d.x - 240, destStone.d.y + 60, 100);
            }
        }
        else if (destStone.active["right"] != undefined && Math.round(destStone.d.rotation * 180 / Math.PI) == -90) {
            if (destStone.active["right"] == selectedStone.active["left"]) {
                await selectedStone.rotate(-90, 100);
                selectedStone.translate(destStone.d.x + 120, destStone.d.y, 100);
            } else if (destStone.active["right"] == selectedStone.active["right"]) {
                await selectedStone.rotate(90, 100);
                selectedStone.translate(destStone.d.x + 240, destStone.d.y - 60, 100);
            }
        }
    }

    moveStone2(selectedStone, destStone) {
        if(destStone == null) {
            selectedStone.boyuk = [2,1,3];
            selectedStone.kicik = [4,3,1];
            selectedStone.rotate(90, 500);
            selectedStone.translate(300, 300, 500);
            console.log(selectedStone);
            return;
        }

        for (let x in selectedStone.active) {
            for (let y in destStone.active) {
                if (selectedStone.active[x] == destStone.active[y]) {
                    if(y == "boyuk") {
                        let d = destStone.boyuk[0];
                        let ters = this.eksi(d);
                        // 1-yuxari, 2-saga, 3-asagi, 4-sola
                        selectedStone.donder(selectedStone.active[x], ters);
                        selectedStone.apar(destStone, d);
                    }else {
                        let d = destStone.kicik[0];
                        selectedStone.apar(destStone, d);
                        let ters = this.eksi(d);
                        // 1-yuxari, 2-saga, 3-asagi, 4-sola
                        selectedStone.donder(selectedStone.active[x], ters);
                    }
                    delete selectedStone.active[x];
                    delete destStone.active[y];

                    return;
                    break;
                }
            }
        }
        // selectedStone.translate(destStone.d.x+120, destStone.d.y, 500);
        // selectedStone.rotate(90, 500);

    }

}