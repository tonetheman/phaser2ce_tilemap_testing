let game = null;
let W = window.innerWidth, H=window.innerHeight;
let SCALEFACTOR = Math.trunc(window.devicePixelRatio);
let realW = W * window.devicePixelRatio;
let realH = H * window.devicePixelRatio;
let USERSCALE = 16;

function boot() {}
boot.prototype = {
    init : function() {
        game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

        // this would make it the same size as no scaling
        game.scale.setUserScale(USERSCALE);

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
        console.log("tilemap object");
        console.log(l1);

        // the first name is what tiled thinks
        // look in json and get name from tileset array
        // the second name must match the image key
        // that phaser knows mapTiles in our case
        let imgs = l1.addTilesetImage("tony_small8x8tilemap", 
            "mapTiles");
        console.log("tilset image object");
        console.log(imgs);

        // now create layers
        // also these match the layer names
        // in the tiled json export
        let background = l1.createLayer("background");
        
        let levelstuff = l1.createLayer("levelstuff");

        // this is the width in pixels no matter what the device pixel ratio
        // it seems
        console.log("window.innerWidth", window.innerWidth);
        
        // this does not seem to figure into anything so far
        console.log("realW",realW);

        // window.innerWidth/8 is how many dudes can fit on the screen
        // then I am scaling up
        // so if i am scaling by 2 then you can fit half as many
        // if i am scaling up by 4 then 1/4 as many can fit on the screen
        let shouldFit = window.innerWidth/8/USERSCALE;
        console.log("should fit",shouldFit);
        for(let i=0;i<shouldFit;i++) {
            // draw an entire row across the bottom
            let s = this.add.sprite(i*8,80,"dude");
        }
        
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
