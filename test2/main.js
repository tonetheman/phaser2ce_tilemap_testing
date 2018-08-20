
let W = window.innerWidth;
let H = window.innerHeight;
let game = null;

function boot() {}
boot.prototype = {
    init : function() {
        game.renderer.renderSession.roundPixels = true;
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
        
    },
    preload : function() {
        game.load.image("red","red16x16.png");

        // phaser key is mapTiles for this image
        game.load.image(
            'mapTiles', 
            'dungeon_tiles.png');
        // phaser key here is level1
        game.load.tilemap('level1', 
        'testmap2.json', 
        null, Phaser.Tilemap.TILED_JSON);

    },
    create : function() {
        let l1 = game.add.tilemap("level1");
        let imgs = l1.addTilesetImage("dungeon_tiles", 
        "mapTiles");
        let back = l1.createLayer("back");
        
        // this will work to fill move of the screen
        back.scale.setTo(6,6);

        /*
        for (let i=0;i<(W/16)-2;i++) {
            let s = game.add.sprite(i*16,0,"red");
        }
        */

       let SF = 6;
       for (let i=0;i<10;i++) {
        let a = game.add.sprite(SF*i*16,SF*i*16,"red");
        a.scale.setTo(6,6); 
       }
        
    }
}

function mainline() {
    game = new Phaser.Game(W,H,Phaser.CANVAS);
    game.state.add("boot",boot);
    game.state.start("boot");

    console.log("W and H",W,H);
    let tileWidth = 16;
    let tileCount = W/tileWidth;
    console.log("should have this many",tileCount);
    console.log("W/H ratio",W/H)
    console.log("H/W rato",H/W)
}

window.onload = mainline;