class DominoStone {
    constructor(d, tb, j, i) {
        this.d = d;
        this.backTexture = tb;
        this.Texture = this.d.Texture;
        this.active = {"boyuk": j, "kicik": i};

        this.TYPE = "BAZAR"; // BAZAR, HAND, TABLE
    }

    async rotate(r, msec) {
        r = r / 180 * Math.PI;
        let cnt = msec / 10;
        let rr = r / cnt;
        while (cnt > 0) {
            this.d.rotation += rr;
            cnt--;
            await this.sleep(10);
        }
    }

    async translate(ex, ey, msec) {
        let cnt = msec / 10;
        let dx = (ex - this.d.x) / cnt;
        let dy = (ey - this.d.y) / cnt;
        while (cnt > 0) {
            this.d.x += dx;
            this.d.y += dy;
            cnt--;
            await this.sleep(10);
        }
    }

    async scale(ssx, ssy, msec) {
        let cnt = msec / 10;
        let sx = (ssx - this.d.scale.x) / cnt;
        let sy = (ssy - this.d.scale.y) / cnt;
        while (cnt > 0) {
            cnt--;
            this.d.scale.x += sx;
            this.d.scale.y += sy;
            await this.sleep(10)

        }
        return new Promise(resolve => {
            resolve('resolved');
        });
    }

    getDegree() {
        return this.d * 180 / Math.PI;
    }

    sleep(t) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('resolved');
            }, t);
        });
    }

    update() {
        //this.updater();
        //this.updatet();
        //this.updates();

    }

    async turnB() {
        if (this.d.texture != this.backTexture) {
            await this.scale(0, 1, 200);
            this.d.setTexture(this.backTexture);
            await this.scale(1, 1, 200);
        }

    }

    async turnF() {
        if (this.d.texture != this.Texture) {
            await this.scale(0, 1, 200);
            this.d.setTexture(this.Texture);
            await this.scale(1, 1, 200);
        }
    }

    lightOn() {
        // this.scale(1.06, 1.06, 100);
        this.d.alpha = 1;
    }

    lightOff() {
        // this.scale(1, 1, 100);
        this.d.alpha = 0.5;
    }

    islightOff() {
        return this.d.alpha == 0.5;
    }

    islightOn() {
        return this.d.alpha == 1;
    }

     select() {
        return new Promise(async (resolve) => {
            await this.scale(1.08, 1.08, 100);
            resolve();
        })
    }

    deSelect() {
        return new Promise(async (resolve) => {
            await this.scale(1, 1, 50);
            resolve();
        })
    }
    eksi(d) {
        // 1:yuxari, 2:sag, 3:asagi, 4:sol (sagin eksi sol yuxarinin eksi asagi ..)
        if(d == 1) return 3;
        if(d == 2) return 4;
        if(d == 3) return 1;
        if(d == 4) return 2;
    }
    donder(s, typ) {
        console.log(s, typ)
        let r = 0;
        if(typ == 1) {
            r = 0;
        }else if(typ == 2) {
            r = 90;
        }else if(typ == 3) {
            r = 180
        }else if(typ == 4) {
            r = -90
        }
        if((s +"") == this.active["kicik"]) {
            console.log(this.active["kicik"]);
            //let k = r + 180;
            //let k2 = r - 180;
            //r = Math.min(Math.abs(k), Math.abs(k2));
            r += 180;
            this.kicik = [];
            this.boyuk = [];
            let e = typ;
            if(e != 2) this.boyuk.push(2);
            if(e != 4) this.boyuk.push(4);
            if(e != 3) this.boyuk.push(3);
            if(e != 1) this.boyuk.push(1);
        }else {
            this.kicik = [];
            this.boyuk = [];
            let e = typ;
            if(e != 2) this.kicik.push(2);
            if(e != 4) this.kicik.push(4);
            if(e != 3) this.kicik.push(3);
            if(e != 1) this.kicik.push(1);
        }
        if(r == 270) r = -90;

        this.rotate(r, 500);

    }
    apar(ds, d) {
        let x = ds.d.x, y = ds.d.y;
        //if(d == 1) y -= 120;
        if(d == 2) x += 120;
        if(d == 4) x -= 120;
        this.translate(x, y, 500);
    }
}