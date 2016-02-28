
//This is our entry point to the game :)

//console.log(cc);

window.onload = function(){
    cc.game.onStart = function(){
        //cc.view.setDesignResolutionSize(320, 480, cc.ResolutionPolicy.SHOW_ALL);
        //load resources
        cc.LoaderScene.preload(gameResources, function () {
            
            cc.director.runScene(new GameScene());
        }, this);
    };
    cc.game.run("gameCanvas");
};
