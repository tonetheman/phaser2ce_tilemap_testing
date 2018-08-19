let game = null;
let W = window.innerWidth, H=window.innerHeight;
let SCALEFACTOR = Math.trunc(window.devicePixelRatio);
let realW = W * window.devicePixelRatio;
let realH = H * window.devicePixelRatio;

function boot() {}
boot.prototype = {
    init : function() {
        game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

        // this would make it the same size as no scaling
        game.scale.setUserScale(1,1);

        // this would make it a factor larger based on pixel ratio
        //game.scale.setUserScale(window.devicePixelRatio,window.devicePixelRatio);

        // pixel art stuff
        game.renderer.renderSession.roundPixels = true;
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
    },
    preload : function() {

        // load an extra image to help position things
        game.load.image("dude", "dude.png");

        // phaser key is mapTiles for this image
        game.load.image(
            'mapTiles', 
            'tony_small8x8tilemap.png');
        // phaser key here is level1
        game.load.tilemap('level1', 
        'tiled_map1.json', 
        null, Phaser.Tilemap.TILED_JSON);
    },
    create : function() {
        // the key here must match the tilemap
        // key that you told phaser to load
        let l1 = game.add.tilemap("level1");

        // the first name is what tiled thinks
        // look in json and get name from tileset array
        // the second name must match the image key
        // that phaser knows mapTiles in our case
        let imgs = l1.addTilesetImage("tony_small8x8tilemap", 
            "mapTiles");
        
        // now create layers
        // also these match the layer names
        // in the tiled json export
        this.background = l1.createLayer("background");
        this.levelstuff = l1.createLayer("levelstuff");

        let s = this.add.sprite(0,0,"dude");
    }
}

function mainline() {
    console.log("device pixel ratio",window.devicePixelRatio);
    console.log("scale factor (device pixel trunc'd)", SCALEFACTOR);
    console.log("WxH",`${W}x${H}`);
    console.log(`real WxH - ${realW}x${realH}`);

    // create the game
    game = new Phaser.Game(realW, realH, Phaser.CANVAS,
        "c");
    // add the states
    game.state.add("boot",boot);
    game.state.start("boot");
}

// 
window.onload = mainline;
