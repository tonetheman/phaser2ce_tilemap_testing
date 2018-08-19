let game = null;
let W = window.innerWidth, H=window.innerHeight;
let SCALEFACTOR = Math.trunc(window.devicePixelRatio);
let realW = W * window.devicePixelRatio;
let realH = H * window.devicePixelRatio;

function boot() {}
boot.prototype = {
    init : function() {
    },
    preload : function() {

        //game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

        //game.scale.setUserScale(SCALEFACTOR, SCALEFACTOR);
        game.scale.setUserScale((realW*0.8)/80);
        
        game.renderer.renderSession.roundPixels = true;
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

        // load an extra image to help position things
        game.load.image("dude", "dude.png");

        game.load.image(
            'mapTiles', 
            'tony_small8x8tilemap.png');
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

        console.log(this.background);

        // now for some math :(
        // orig tile map is 10 tiles width * 8 pixels = 80 pixels
        // the W is really unknown at runtime
        // i want my map to take 80% of the screen
        // W * 0.8 = how many pixels I want to take up
        // so 80 is natural and W * 0.8 is desired
        // 80 * ? = W * 0.8
        // ? = (W*0.8)/80
        //this.background.scale.setTo((W*0.8)/80);
        //this.levelstuff.scale.setTo((W*0.8/80));
        
        // one way
        //this.background.scale.setTo(SCALEFACTOR);
        //this.levelstuff.scale.setTo(SCALEFACTOR);

        // with realW
        //this.background.scale.setTo((realW*0.8)/80);
        //this.levelstuff.scale.setTo((realW*0.8/80));

        let s = this.add.sprite(0,0,"dude");
    }
}

function mainline() {
    console.log("device pixel ratio",window.devicePixelRatio);
    console.log("scale factor", SCALEFACTOR);
    console.log("WxH",`${W}x${H}`);
    console.log(`real WxH - ${realW}x${realH}`);
    console.log("Need to take up 80% of W:", 0.8 * realW);
    console.log("scale factor is",(realW*0.8)/80)
    game = new Phaser.Game(realW, realH, Phaser.CANVAS,
        "c");
    game.state.add("boot",boot);
    game.state.start("boot");
}


window.onload = mainline;
