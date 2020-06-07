export default class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseScene' });
    }

    preload() {
        this.load.image("bgImage", "assets/images/main_menu_scene.png");
    }

    create() {
        var elements = [
            "H : ", "He: ",
            "Li: ", "Be: ", "B : ", "C : ", "N : ", "O : ", "F : ", "Ne: ",
            "Na: ", "Mg: ", "Al: ", "Si: ", "P : ", "S : ", "Cl: ", "Ar: ",
            "K : ", "Ca: ",
        ];
        
        var count = this.game.elementAmounts
        // var count = [
        //     0, 0, 
        //     0, 0, 0, 0, 0, 0, 0,
        //     0, 0, 0, 0, 0, 0, 0, 
        //     0, 0,
        // ];

        var info = [
            "Hydrogen\nAtomic Number:1\nAtomic Weight:1.01",
            "Helium\nAtomic Number:2\nAtomic Weight:4.01",
            "Lithium\nAtomic Number:3\nAtomic Weight:6.94",
            "Beryllium\nAtomic Number:4\nAtomic Weight:9.01",
            "Boron\nAtomic Number:5\nAtomic Weight:10.81",
            "Carbon\nAtomic Number:6\nAtomic Weight:12.01",
            "Nitrogen\nAtomic Number:7\nAtomic Mass:14.01",
            "Oxygen\nAtomic Number:8\nAtomic Mass:16.00",
            "Fluorine\nAtomic Number:9nAtomic Mass:19.00",
            "Neon\nAtomic Number:10\nAtomic Mass:20.18",
            "Sodium\nAtomic Number:11\nAtomic Mass:22.99",
            "Magnesium\nAtomic Number:12\nAtomic Mass:24.31",
            "Aluminum\nAtomic Number:13\nAtomic Mass:26.98",
            "Silicon\nAtomic Number:14\nAtomic Mass:28.09",
            "Phosphorus\nAtomic Number:15\nAtomic Mass:30.97",
            "Sulfur\nAtomic Number:16\nAtomic Mass:32.06",
            "Chlorine\nAtomic Number:17\nAtomic Mass:35.45",
            "Argon\nAtomic Number:18\nAtomic Mass:39.95",
            "Potassium\nAtomic Number:19\nAtomic Mass:39.10",
            "Calcium\nAtomic Number:20\nAtomic Mass:40.08",
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

        // Feels bad to hardcode (it was the best alternative for hackathon)
        // Better solution will come in the future
        const hydrogen = this.add.text(
            85, 300, elements[0] + count[0], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 11, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(127, 255-10*count[0])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            console.log(info[0])
        });
        if (count[0] >= 1) 
            hydrogen.setInteractive()


        const helium = this.add.text(
            660, 300, elements[1] + count[1], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 11, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(127, 255-2*count[1])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            console.log(info[1])
        });
        if (count[1] >= 1) 
            helium.setInteractive()


        const lithium = this.add.text(
            85, 360, elements[2] + count[2], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 11, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(127, 255-2*count[2])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            console.log(info[2])
        });
        if (count[2] >= 1) 
            lithium.setInteractive()


        const beryllium = this.add.text(
            85, 360, elements[2] + count[2], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 11, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (Math.max(127, 255-2*count[2])).toString(16) + (255).toString(16)
        })
        .on('pointerdown', () => {
            console.log(info[2])
        });
        if (count[2] >= 1) 
            beryllium.setInteractive()



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
        //             100+65*m, 300 + c*60, elements[i] + +count[i], {
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
        //             100+65*m, 300 + c*60, "     ", {
        //                 padding: { x: 11, y: 20 },
        //                 // backgroundColor: "#" + (255).toString(16) + (225-10*i).toString(16) + (255).toString(16)
        //         });
        //     }
        // }
    }
}

