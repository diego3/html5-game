
var gameArray = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7];
var moves =0;
var scoreText;
var pickedTiles = [];
var bgLayer;

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var size   = cc.director.getWinSize();
        
        gameArray = shuffle(gameArray);
        bgLayer = new BackgroundLayer();
        bgLayer.init();
        this.addChild(bgLayer);
    }
});


var BackgroundLayer = cc.Layer.extend({
    init:function(){
        var size   = cc.director.getWinSize();
        //var backgroundNode = cc.Sprite.create(res.HelloWorld_png);
        //backgroundNode.setPosition(size.width / 2, size.height / 2);
        
        var backgroundNode = cc.LayerColor.create(new cc.Color(40,40,40,255), 800, 450);
        this.addChild(backgroundNode);
        
        scoreText = cc.LabelTTF.create("Moves: 0", "Arial", "32", cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(scoreText);
        scoreText.setPosition(450,400);
        
        for(i=0; i < 16; i++){
            var tile = new BoxSprite();
            tile.pictureValue = gameArray[i];
            this.addChild(tile,0);
            tile.setPosition(49+i%4*74, 400-Math.floor(i/4)*74);
        }
    }
});

var BoxSprite = cc.Sprite.extend({
    pictureValue:0,
    ctor:function(){
        this._super();
        this.initWithFile(res.cover_png);
        cc.eventManager.addListener(listener.clone(), this);
    }
});

var listener =  cc.EventListener.create({
    event : cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan:function(touch, event) {
        if(pickedTiles.length < 2) {
            var target = event.getCurrentTarget();
            var location = target.convertToNodeSpace(touch.getLocation());
            var targetSize = target.getContentSize();
            var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
            if (cc.rectContainsPoint(targetRectangle, location)) {
                target.initWithFile("assets/book/tile_"+target.pictureValue+".png");
                pickedTiles.push(target);
                if(pickedTiles.length == 2) {
                    checkTiles();
                }
            }
        }
    }
});

function checkTiles(){
    moves++;
    scoreText.setString("Moves: "+moves);
    setTimeout(function(){
        if(pickedTiles[0].pictureValue == pickedTiles[1].pictureValue) {
            bgLayer.removeChild(pickedTiles[0]);
            bgLayer.removeChild(pickedTiles[1]);
        }
        else{
            pickedTiles[0].initWithFile(res.cover_png);
            pickedTiles[1].initWithFile(res.cover_png);
        }
        pickedTiles = [];
    },2000);
}

var GameOverLayer = cc.Layer.extend({
    onEnter:function(){
        
    }
});

/**
 * 
 * @param {array} array
 * @returns {array}
 * @see http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

/**
 * i don't use this 'couse initially the var names isn't clear to me
 * 
 * @param {array} v
 * @returns {array}
 * @see  http://jsfromhell.com/array/shuffle
 */
var shuffle__USED_IN_BOOK = function(v){
  for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
  return v;
};