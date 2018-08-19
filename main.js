let game = null;
let W = 600, H=800;
let SCALEFACTOR = Math.trunc(window.devicePixelRatio);

function boot() {}
boot.prototype = {
    preload : function() {
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
        this.background.scale.setTo(SCALEFACTOR,SCALEFACTOR);
        this.levelstuff = l1.createLayer("levelstuff");
        this.levelstuff.scale.setTo(SCALEFACTOR,SCALEFACTOR);
    }
};

function mainline() {
    let realW = W * window.devicePixelRatio;
    let realH = H * window.devicePixelRatio;
    console.log("device pixel ratio",window.devicePixelRatio);
    console.log("scale factor", SCALEFACTOR);
    console.log("WxH",`${W}x${H}`);
    console.log(`real WxH - ${realW}x${realH}`)
    game = new Phaser.Game(realW, realH, Phaser.CANVAS,
        "c");
    game.state.add("boot",boot);
    game.state.start("boot");
}


window.onload = mainline;
