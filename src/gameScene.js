
var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var size   = cc.director.getWinSize();
        
       
        bgLayer = new BackgroundLayer();
        bgLayer.init();
        this.addChild(bgLayer);
    }
});


var BackgroundLayer = cc.Layer.extend({
    init:function(){
        var size   = cc.director.getWinSize();
        
        var backgroundNode = cc.LayerColor.create(new cc.Color(40,40,40,255), 800, 450);
        this.addChild(backgroundNode);
        
    }
});



var listener =  cc.EventListener.create({
    event : cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan:function(touch, event) {
        
    }
});

