export default class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseScene' });
    }

    preload() {
        this.load.image("bgImage", "assets/images/main_menu_scene.png");
    }

    create() {
        // this.image.destroy();
        this.scene.bringToTop();
        var elements = [
            "H ", "He",
            "Li", "Be", "B ", "C ", "N ", "O ", "F ", "Ne",
            "Na", "Mg", "Al", "Si", "P ", "S ", "Cl", "Ar",
            "K ", "Ca",
        ];

        var count = this.game.elementAmounts;

        const info = [
            ["Hydrogen", 1, 1.01],
            ["Helium",2,4.01],
            ["Lithium",3,6.94],
            ["Beryllium",4,9.01],
            ["Boron",5,10.81],
            ["Carbon",6,12.01],
            ["Nitrogen",7,14.01],
            ["Oxygen",8,16.00],
            ["Fluorine",9,19.00],
            ["Neon",10,20.18],
            ["Sodium",11,22.99],
            ["Magnesium",12,24.31],
            ["Aluminum",13,26.98],
            ["Silicon",14,28.09],
            ["Phosphorus",15,30.97],
            ["Sulfur",16,32.06],
            ["Chlorine",17,35.45],
            ["Argon",18,39.95],
            ["Potassium",19,39.10],
            ["Calcium",20,40.08],
        ];

        const descriptions = [
          "Very flammable!",
          "Makes you sound like a 9 year old!",
          "Drop this in water and it goes boom!",
          "Used for high speed aircraft!",
          "Used in medicine to improve thinking skills!",
          "Diamonds = graphite = made from carbon!",
          "Necessary for growing hearty crops!",
          "It is all around us!",
          "Makes sure your teeth stays clean!",
          "Lights up a nightclub at 2 am!",
          "Season with sodium chloride and pepper!",
          "Don't confuse this element with manganese!",
          "The optimal material for planes!",
          "Found in computer chips!",
          "It exists in 2 colours, white and red!",
          "Light up a bonfire with a match to cook some s'mores!",
          "Do you like the smell of pool water?",
          "Third most abundant gas in the Earth's atmosphere!",
          "Don't go bananas over the fact that its found in bananas!",
          "Makes your bones nice and strong!",
        ]

        const { width, height } = this.sys.game.config;
        let background = this.add.sprite(0, 0, 'bgImage');
        background.alpha = 0.5;
        background.setOrigin(0, 0);

        let close = this.add.text(
            width/2, height/2-120, 'Resume Game', {
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

        const addElement = (elementIndex) => {
          let offsetY;
          if (elementIndex <= 1) offsetY = 250;
          else if (elementIndex >= 2 && elementIndex <= 9) offsetY = 315;
          else if (elementIndex < 18) offsetY = 380;
          else offsetY = 445;

          const columnXOffsets = [112, 177, 307, 372, 437, 502, 567, 632];
          let offsetX = 112;
          if (elementIndex === 1) offsetX = 632;
          else if (elementIndex >= 2) offsetX = columnXOffsets[(elementIndex - 2) % columnXOffsets.length]

          const element = this.add.text(offsetX, offsetY, elements[elementIndex], {
            font: '12px monospace',
            fill: '#000000',
            padding: { x: 20, y: 20 },
            backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[elementIndex])).toString(16) + (255).toString(16)
          })
            .on('pointerdown', () => {
              document.getElementById('element-name').innerHTML = info[elementIndex][0];
              document.getElementById('element-atomic-number').innerHTML = info[elementIndex][1];
              document.getElementById('element-atomic-weight').innerHTML = info[elementIndex][2];
              document.getElementById('element-obtained').innerHTML = count[elementIndex];
              document.getElementById('element-description').innerHTML = descriptions[elementIndex];
              const elementChemicalSymbol = document.getElementById('element-chemical-symbol');
              elementChemicalSymbol.style.display = 'flex';
              elementChemicalSymbol.innerHTML = elements[elementIndex].trim();
            });

          element.setInteractive();
        }

        for (let i = 0; i < 20; ++i) {
          addElement(i);
        }

        // close.on('pointerover', () => { console.log('pointerover'); });

        // let i, t;
        // t = 0;
        // var h = toString(16);

        // for (i = 0; i < 29; i++) {
        //     let c, m;
        //     c = Math.floor(i/9);
        //     m = (i%9)
        //     // console.out(i, c);
        //     if (elements[i] != "    ") {
        //         t += 7;
        //         this.add.text(
        //             100+65*m,  250 + c*60, elements[i] + +count[i], {
        //                 font: "12px monospace",
        //                 fill: "#000000",
        //                 padding: { x: 11, y: 20 },
        //                 backgroundColor: "#" + (255).toString(16) + (225-t).toString(16) + (255).toString(16)
        //         })
        //         .setInteractive()
        //         .on('pointerdown', () => {
        //             console.log(info[i])
        //         });
        //     } else {
        //         this.add.text(
        //             100+65*m,  250 + c*60, "     ", {
        //                 padding: { x: 11, y: 20 },
        //                 // backgroundColor: "#" + (255).toString(16) + (225-10*i).toString(16) + (255).toString(16)
        //         });
        //     }
        // }
    }

    // infoscreen() {
    //     // this.scene.pause();
    // } 
}

