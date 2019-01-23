class DominoStone {
    constructor(d, tb){
        this.d = d;
        this.cntt = 0;
        this.cntr = 0;
        this.cnts = 0;
        this.backTexture = tb;
        this.Texture = this.d.Texture;
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
    translate(ex, ey, fr) {
        this.dx = (ex - this.d.x) / fr;
        this.dy = (ey - this.d.y) / fr;
        this.cntt = fr;
    }
    async scale(ssx, ssy, msec) {
        let cnt = msec / 10;
        let sx = (ssx-this.d.scale.x) / cnt;
        let sy = (ssy-this.d.scale.y) / cnt;
        while(cnt > 0) {
            cnt--;
            this.d.scale.x += sx;
            this.d.scale.y += sy;
            await this.sleep(10)

        }
        return  new Promise(resolve => {
            resolve('resolved');
        });
    }
    updater() {

    }
    updatet() {
        if(this.cntt == 0) {
            return;
        }
        this.d.x += this.dx;
        this.d.y += this.dy;
        this.cntt--;
    }
    sleep(t) {
        return  new Promise(resolve => {
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
        if(this.d.texture != this.backTexture) {
            await this.scale(0, 1, 200);
            this.d.setTexture(this.backTexture);
            await this.scale(1, 1, 200);
        }

    }
    async turnF() {
        if(this.d.texture != this.Texture) {
            await this.scale(0, 1, 200);
            this.d.setTexture(this.Texture);
            await this.scale(1, 1, 200);
        }
    }
}