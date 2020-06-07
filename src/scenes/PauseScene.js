export default class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseScene' });
    }

    preload() {
        this.load.image("bgImage", "assets/images/main_menu_scene.png");
    }

    create() {
        var elements = [
            "H ", "He",
            "Li", "Be", "B ", "C ", "N ", "O ", "F ", "Ne",
            "Na", "Mg", "Al", "Si", "P ", "S ", "Cl", "Ar",
            "K ", "Ca",
        ];

        var count = this.game.elementAmounts
        // var count = [
        //     0, 0,
        //     0, 0, 0, 0, 0, 0, 0,
        //     0, 0, 0, 0, 0, 0, 0,
        //     0, 0,
        // ];

        var info = [
            "Hydrogen", 1, 1.01,
            "Helium",2,4.01,
            "Lithium",3,6.94,
            "Beryllium",4,9.01,
            "Boron",5,10.81,
            "Carbon",6,12.01,
            "Nitrogen",7,14.01,
            "Oxygen",8,16.00,
            "Fluorine",9,19.00,
            "Neon",10,20.18,
            "Sodium",11,22.99,
            "Magnesium",12,24.31,
            "Aluminum",13,26.98,
            "Silicon",14,28.09,
            "Phosphorus",15,30.97,
            "Sulfur",16,32.06,
            "Chlorine",17,35.45,
            "Argon",18,39.95,
            "Potassium",19,39.10,
            "Calcium",20,40.08,
        ]

        const { width, height } = this.sys.game.config;
        let background = this.add.sprite(0, 0, 'bgImage');
        background.alpha = 0.5;
        background.setOrigin(0, 0);

        let close = this.add.text(
            width/2, height/2-120, 'Return to Game', {
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
            backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[0])).toString(16) + (255).toString(16)
          })
            .on('pointerdown', () => {
              document.getElementById('element-name').innerHTML = info[elementIndex][0];
              document.getElementById('element-atomic-number').innerHTML = info[elementIndex][1];
              document.getElementById('element-atomic-weight').innerHTML = info[elementIndex][2];
              document.getElementById('element-obtained').innerHTML = count[elementIndex];
              // document.getElementById('element-description').innerHTML = info[elementIndex];
            });

          element.setInteractive();
        }

        for (let i = 0; i < 20; ++i) {
          addElement(i);
        }

        /*
        // Feels bad to hardcode
        // Better solution will come in the future
        const hydrogen = this.add.text(
            112,  250, elements[0], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[0])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            console.log(info[0])
        });
        if (count[0] >= 1)
            hydrogen.setInteractive()


        const helium = this.add.text(
            632,  250, elements[1], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[1])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            console.log(info[1])
        });
        if (count[1] >= 1)
            helium.setInteractive()


        const lithium = this.add.text(
            112, 315, elements[2], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[2])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            console.log(info[2])
        });
        if (count[2] >= 1)
            lithium.setInteractive()


        const beryllium = this.add.text(
            177, 315, elements[3], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[3])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            console.log(info[3])
        });
        if (count[3] >= 1)
            beryllium.setInteractive()


        const boron = this.add.text(
            307, 315, elements[4], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[4])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            console.log(info[4])
        });
        if (count[4] >= 1)
            boron.setInteractive()


        const carbon = this.add.text(
            372, 315, elements[5], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[5])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            console.log(info[5])
        });
        if (count[5] >= 1)
        carbon.setInteractive()


        const nitrogen = this.add.text(
            437, 315, elements[6], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[6])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            console.log(info[6])
        });
        if (count[6] >= 1)
        nitrogen.setInteractive()


        const oxygen = this.add.text(
            502, 315, elements[7], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[7])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            console.log(info[7])
        });
        if (count[7] >= 1)
        oxygen.setInteractive()


        const fluorine = this.add.text(
            567, 315, elements[8], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[8])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            console.log(info[8])
        });
        if (count[8] >= 1)
        fluorine.setInteractive()


        const neon = this.add.text(
            632, 315, elements[9], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[9])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            console.log(info[9])
        });
        if (count[9] >= 1)
        neon.setInteractive()


        const sodium = this.add.text(
            112, 380, elements[10], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[10])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            console.log(info[10])
        });
        if (count[10] >= 1)
        sodium.setInteractive()


        const magnesium = this.add.text(
            177, 380, elements[11], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[11])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            console.log(info[11])
        });
        if (count[11] >= 1)
        magnesium.setInteractive()


        const aluminum = this.add.text(
            307, 380, elements[12], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[12])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            console.log(info[12])
        });
        if (count[12] >= 1)
        aluminum.setInteractive()


        const silicon = this.add.text(
            372, 380, elements[13], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[13])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            console.log(info[13])
        });
        if (count[13] >= 1)
        silicon.setInteractive()


        const phosphorus = this.add.text(
            437, 380, elements[14], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[14])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            console.log(info[14])
        });
        if (count[14] >= 1)
        phosphorus.setInteractive()


        const sulfur = this.add.text(
            502, 380, elements[15], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[15])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            console.log(info[15])
        });
        if (count[15] >= 1)
        sulfur.setInteractive()


        const chlorine = this.add.text(
            567, 380, elements[16], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[16])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            console.log(info[16])
        });
        if (count[16] >= 1)
        chlorine.setInteractive()


        const argon = this.add.text(
            632, 380, elements[17], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[17])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            console.log(info[17])
        });
        if (count[17] >= 1)
        argon.setInteractive()


        const potassium = this.add.text(
            112, 445, elements[18], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[18])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            console.log(info[18])
        });
        if (count[18] >= 1)
        potassium.setInteractive()


        const calcium = this.add.text(
            177, 445, elements[19], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[19])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            console.log(info[19])
        });
        if (count[19] >= 1)
        calcium.setInteractive()

         */

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
}

