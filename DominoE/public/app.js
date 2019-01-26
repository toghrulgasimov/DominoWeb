window.onload = function () {


    let app = new PIXI.Application({
            width: 2000,
            height: 1000,
            antialias: true,
            transparent: false,
            resolution: 1
        }
    );

    document.body.appendChild(app.view);

    PIXI.loader
        .add("images/aa.png")
        .load(setup);

    let d;

    function setup() {

        var background = new PIXI.Graphics();
        background.beginFill(0x123456);
        background.drawRect(0, 0, 1400, 600);
        background.endFill();
        app.stage.addChild(background);

        let a = [];
        var baseTexture = new PIXI.Texture.fromImage('images/aa.png');
        for (let y = 0; y <= 600; y += 140) {
            for (let x = 0; x <= 500; x += 80) {
                var cuted = new PIXI.Texture(baseTexture, new PIXI.Rectangle(x, y, 60, 120));
                let domino = PIXI.Sprite.from(cuted);
                domino.x = x;
                domino.y = y;
                domino.Texture = cuted;
                a.push(domino);
            }
        }

        d = {
            "66": a[0],
            "65": a[1],
            "64": a[2],
            "63": a[3],
            "62": a[4],
            "61": a[5],
            "60": a[6]
            ,
            "55": a[7],
            "54": a[8],
            "53": a[9],
            "52": a[10],
            "51": a[11],
            "50": a[12],
            "44": a[13]
            ,
            "43": a[14],
            "42": a[15],
            "41": a[16],
            "40": a[17],
            "33": a[18],
            "32": a[19],
            "31": a[20],
            "30": a[21],
            "22": a[22],
            "21": a[23],
            "20": a[24],
            "11": a[25],
            "10": a[26],
            "00": a[27],
            "k": a[28],
            "b": a[29]
        };
        let S = {};
        let AR = [];
        let player = new Player();
        for (let i = 0; i <= 6; i++) {
            for (let j = i; j <= 6; j++) {
                let name = j + "" + i;
                d[name].x = 0;
                d[name].y = 0;
                d[name].anchor.x = 0.5;
                d[name].anchor.y = 0.5;
                d[name].interactive = true;
                S[name] = new DominoStone(d[name], d["b"].texture, j+"", i+"");
                d[name].pp = S[name];
                app.stage.addChild(d[name]);
                AR.push(S[name]);
            }
        }

        let game = new Game(AR, 1);





    }


}