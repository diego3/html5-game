
var MyScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var size   = cc.director.getWinSize();
        
        var background = cc.Sprite.create(res.bg_png);
        this.addChild(background);
        
        var box = cc.Sprite.create(res.box_png);
        box.setPosition(size.width / 2, size.height / 2);
        //sprite.setScale(0.8);
        this.addChild(box, 0);
        
        
        
        /*var label = cc.LabelTTF.create("Hello World", "Arial", 40);
        label.setPosition(size.width / 2, size.height / 2);
        this.addChild(label, 1);*/
            

    }
});