class DominoStone {
    constructor(d, tb, i, j) {
        this.d = d;
        this.cntt = 0;
        this.cntr = 0;
        this.cnts = 0;
        this.backTexture = tb;
        this.Texture = this.d.Texture;
        this.active = {"left": i, "right": j};
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
}