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
        
        var count = this.game.elementAmounts
        // var count = [
        //     0, 0, 
        //     0, 0, 0, 0, 0, 0, 0,
        //     0, 0, 0, 0, 0, 0, 0, 
        //     0, 0,
        // ];

        var info = [
            "Hydrogen\nAtomic Number: 1\nAtomic Weight: 1.01\nObtained: " + count[0],
            "Helium\nAtomic Number:2\nAtomic Weight:4.01\nObtained: " + count[1],
            "Lithium\nAtomic Number:3\nAtomic Weight:6.94\nObtained: " + count[2],
            "Beryllium\nAtomic Number:4\nAtomic Weight:9.01\nObtained: " + count[3],
            "Boron\nAtomic Number:5\nAtomic Weight:10.81\nObtained: " + count[4],
            "Carbon\nAtomic Number:6\nAtomic Weight:12.01\nObtained: " + count[5],
            "Nitrogen\nAtomic Number:7\nAtomic Mass:14.01\nObtained: " + count[6],
            "Oxygen\nAtomic Number:8\nAtomic Mass:16.00\nObtained: " + count[7],
            "Fluorine\nAtomic Number:9nAtomic Mass:19.00\nObtained: " + count[8],
            "Neon\nAtomic Number:10\nAtomic Mass:20.18\nObtained: " + count[9],
            "Sodium\nAtomic Number:11\nAtomic Mass:22.99\nObtained: " + count[10],
            "Magnesium\nAtomic Number:12\nAtomic Mass:24.31\nObtained: " + count[11],
            "Aluminum\nAtomic Number:13\nAtomic Mass:26.98\nObtained: " + count[12],
            "Silicon\nAtomic Number:14\nAtomic Mass:28.09\nObtained: " + count[13],
            "Phosphorus\nAtomic Number:15\nAtomic Mass:30.97\nObtained: " + count[14],
            "Sulfur\nAtomic Number:16\nAtomic Mass:32.06\nObtained: " + count[15],
            "Chlorine\nAtomic Number:17\nAtomic Mass:35.45\nObtained: " + count[16],
            "Argon\nAtomic Number:18\nAtomic Mass:39.95\nObtained: " + count[17],
            "Potassium\nAtomic Number:19\nAtomic Mass:39.10\nObtained: " + count[18],
            "Calcium\nAtomic Number:20\nAtomic Mass:40.08\nObtained: " + count[19],
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
            if (count[0] >= 1)
                console.log(info[0])
            else
                console.log("You haven't found this element")
        });
        hydrogen.setInteractive()


        const helium = this.add.text(
            632,  250, elements[1], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[1])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            if (count[1] >= 1)
                console.log(info[1])
            else
                console.log("You haven't found this element")
        }); 
        helium.setInteractive()

        const lithium = this.add.text(
            112, 315, elements[2], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[2])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            if (count[2] >= 1)
                console.log(info[2])
            else
                console.log("You haven't found this element")
        });
        lithium.setInteractive()

        const beryllium = this.add.text(
            177, 315, elements[3], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[3])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            if (count[3] >= 1)
                console.log(info[3])
            else
                console.log("You haven't found this element")
        });
        beryllium.setInteractive()


        const boron = this.add.text(
            307, 315, elements[4], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[4])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            if (count[4] >= 1)
                console.log(info[4])
            else
                console.log("You haven't found this element")
        });
        boron.setInteractive()


        const carbon = this.add.text(
            372, 315, elements[5], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[5])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            if (count[5] >= 1)
                console.log(info[5])
            else
                console.log("You haven't found this element")
        });
        carbon.setInteractive()


        const nitrogen = this.add.text(
            437, 315, elements[6], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[6])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            if (count[6] >= 1)
                console.log(info[6])
            else
                console.log("You haven't found this element")
        });
        nitrogen.setInteractive()


        const oxygen = this.add.text(
            502, 315, elements[7], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[7])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            if (count[7] >= 1)
                console.log(info[7])
            else
                console.log("You haven't found this element")
        });
        oxygen.setInteractive()


        const fluorine = this.add.text(
            567, 315, elements[8], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[8])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            if (count[8] >= 1)
                console.log(info[8])
            else
                console.log("You haven't found this element")
        });
        fluorine.setInteractive()


        const neon = this.add.text(
            632, 315, elements[9], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[9])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            if (count[9] >= 1)
                console.log(info[9])
            else
                console.log("You haven't found this element")
        });
        neon.setInteractive()



        const sodium = this.add.text(
            112, 380, elements[10], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[10])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            if (count[10] >= 1)
                console.log(info[10])
            else
                console.log("You haven't found this element")
        });
        sodium.setInteractive()


        const magnesium = this.add.text(
            177, 380, elements[11], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[11])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            if (count[11] >= 1)
                console.log(info[11])
            else
                console.log("You haven't found this element")
        });
        magnesium.setInteractive()

        const aluminum = this.add.text(
            307, 380, elements[12], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[12])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            if (count[12] >= 1)
                console.log(info[12])
            else
                console.log("You haven't found this element")
        });
        aluminum.setInteractive()


        const silicon = this.add.text(
            372, 380, elements[13], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[13])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            if (count[13] >= 1)
                console.log(info[13])
            else
                console.log("You haven't found this element")
        });
        silicon.setInteractive()


        const phosphorus = this.add.text(
            437, 380, elements[14], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[14])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            if (count[14] >= 1)
                console.log(info[14])
            else
                console.log("You haven't found this element")
        });
        phosphorus.setInteractive()


        const sulfur = this.add.text(
            502, 380, elements[15], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[15])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            if (count[15] >= 1)
                console.log(info[15])
            else
                console.log("You haven't found this element")
        });
        sulfur.setInteractive()


        const chlorine = this.add.text(
            567, 380, elements[16], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[16])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            if (count[16] >= 1)
                console.log(info[16])
            else
                console.log("You haven't found this element")
        });
        chlorine.setInteractive()


        const argon = this.add.text(
            632, 380, elements[17], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[17])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            if (count[17] >= 1)
                console.log(info[17])
            else
                console.log("You haven't found this element")
        });
        argon.setInteractive()


        const potassium = this.add.text(
            112, 445, elements[18], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[18])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            if (count[18] >= 1)
                console.log(info[18])
            else
                console.log("You haven't found this element")
        });
        potassium.setInteractive()


        const calcium = this.add.text(
            177, 445, elements[19], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 20, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(125, 255-2*count[19])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            if (count[19] >= 1)
                console.log(info[19])
            else
                console.log("You haven't found this element")
        });
        calcium.setInteractive()

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

