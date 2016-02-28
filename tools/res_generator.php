<?php

$str1 = "";
$str2 = "";
function visit($path) {
    global $str1, $str2;
    
    if(!file_exists($path)){
        return false;
    }
    
    echo "visiting: ". $path . PHP_EOL;
    
    $directory = new \DirectoryIterator($path);
    foreach($directory as $p){/*@var $p \SplFileInfo*/
        if($p->isDir() && !$p->isDot()) {
            visit($path. DIRECTORY_SEPARATOR . $p->getFilename());
        }else if(!$p->isDot()) {
            $str1 .= "  ".str_replace(".", "_", $p->getFilename()) . ' : "' . $path.DIRECTORY_SEPARATOR.$p->getFilename() .'",'. PHP_EOL;
            $str2 .= "  res.".str_replace(".", "_", $p->getFilename()).",". PHP_EOL;
        }
    }
}

if(!visit("../assets")){
    $js = "
var res = {
" . $str1 . "
};    
        
var gameResources = [
".$str2."
];";
    
    file_put_contents("../src/loadassets.js", $js);
}

//file_put_contents("../src/assets.js", $data);


/*

var res = {
    helloWorld_png : "assets/HelloWorld.png",
    Tiles_box_png : "assets/basepack/Tiles/box.png",
    bg_simple: "assets/basepack/bg.png",
};


var gameResources = [
    res.helloWorld_png,
    res.Tiles_box_png
];
 
  
  
 */

