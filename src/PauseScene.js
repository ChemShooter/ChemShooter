export default class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseScene' });
    }

    preload() {
        this.load.image("bgImage", "assets/images/main_menu_scene.png");
    }

    create() {
        var elements = [
            "H : ", "    ", "    ", "    ", "    ", "    ", "    ", "    ", "He: ",
            "Li: ", "Be: ", "    ", "B : ", "C : ", "N : ", "O : ", "F : ", "Ne: ",
            "Na: ", "Mg: ", "    ", "Al: ", "Si: ", "P : ", "S : ", "Cl: ", "Ar: ",
            "K : ", "Ca: ",
        ];

        var descriptions = [
            "Hydrogen - very flammable",
            "    ",
            "    ",
            "    ",
            "    ",
            "    ",
            "    ",
            "    ",
            "Helium",
            "Lithium",
            "Beryllium",
            "    ",
            "Boron",
            "Carbon",
            "Nitrogen",
            "Oxygen",
            "Fluorine",
            "Neon",
            "Sodium",
            "Magnesium",
            "    ",
            "Aluminum",
            "Silicon",
            "Phosphorus",
            "Sulfur",
            "Chlorine",
            "Argon",
            "Potassium",
            "Calcium - ",
        ]

        const { width, height } = this.sys.game.config;
        let background = this.add.sprite(0, 0, 'bgImage');
        background.alpha = 0.5;
        background.setOrigin(0, 0);

        let close = this.add.text(
            width/2, height/2-70, 'Return to Game', {
                font: "18px monospace",
                fill: "#000000",
                padding: { x: 20, y: 10 },
                backgroundColor: "#ffffff"
                // align: 'center'
        })
        .setOrigin(0.5, 0.5)
        .on('pointerdown', () => {
          this.scene.stop()
          this.scene.resume('DungeonScene')
        });

        close.setInteractive();

        let i, t;
        t = 0;
        // var h = toString(16);

        for (i = 0; i < 29; i++) {
            let c, m;
            c = Math.floor(i/9);
            m = (i%9)
            // console.out(i, c);
            if (elements[i] != "    ") {
                t += 7;
                this.add.text(
                    100+65*m, 300 + c*60, elements[i] + this.game.elementAmounts[i], {
                        font: "12px monospace",
                        fill: "#000000",
                        padding: { x: 11, y: 20 },
                        backgroundColor: "#" + (255).toString(16) + (225-t).toString(16) + (255).toString(16)
                });
            } else {
                this.add.text(
                    100+65*m, 300 + c*60, "     ", {
                        padding: { x: 11, y: 20 },
                        // backgroundColor: "#" + (255).toString(16) + (225-10*i).toString(16) + (255).toString(16)
                });
            }
        }
    }
}

