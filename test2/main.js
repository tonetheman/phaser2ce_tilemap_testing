
let W = window.innerWidth;
let H = window.innerHeight;
let game = null;

function boot() {}
boot.prototype = {
    init : function() {

    },
    preload : function() {
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
    }
}

function mainline() {
    game = new Phaser.Game(W,H,Phaser.CANVAS);
    game.state.add("boot",boot);
    game.state.start("boot");
}

window.onload = mainline;