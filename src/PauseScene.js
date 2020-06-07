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

        var amounts = [
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0
        ];

        var descriptions = [
            "Hydrogen - very flammable!",
            "    ",
            "    ",
            "    ",
            "    ",
            "    ",
            "    ",
            "    ",
            "Helium - makes you sound like a 9 year old!",
            "Lithium - drop this in water and it goes boom!",
            "Beryllium - used for high speed aircraft!",
            "    ",
            "Boron - used in medicine to improve thinking skills!",
            "Carbon - diamonds = graphite = made from carbon!",
            "Nitrogen - necessary for growing hearty crops!",
            "Oxygen - it is all around us!",
            "Fluorine - makes sure your teeth stays clean!",
            "Neon - lights up a nightclub at 2 am!",
            "Sodium - season with sodium chloride and pepper!",
            "Magnesium - don't confuse this element with manganese!",
            "    ",
            "Aluminum - the optimal material for planes!",
            "Silicon - found in computer chips!",
            "Phosphorus - it exists in 2 colours, white and red!",
            "Sulfur - light up a bonfire with a match to cook some s'mores!",
            "Chlorine - do you like the smell of pool water?",
            "Argon - third most abundant gas in the Earth's atmosphere!",
            "Potassium - don't go bananas over the fact that its found in bananas!",
            "Calcium - makes your bones nice and strong!",
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
        // close.on('pointerover', () => { console.log('pointerover'); });
        
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
                    100+65*m, 300 + c*60, elements[i] + +amounts[i], {
                        font: "12px monospace",
                        fill: "#000000",
                        padding: { x: 11, y: 20 },
                        backgroundColor: "#" + (255).toString(16) + (225-t).toString(16) + (255).toString(16)
                })
                .setInteractive()
                .on('pointerdown', () => {
                    console.log(descriptions[i])
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

