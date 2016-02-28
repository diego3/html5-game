<?php

define("HOST_GAME", "/cocos2dmygame");

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
            $str1 .= "  ".str_replace(".", "_", $p->getFilename()) . ' : "' . HOST_GAME . $path. DIRECTORY_SEPARATOR . $p->getFilename() .'",'. PHP_EOL;
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
    $js = str_replace(array("\\",".."), array("/",""), $js);
    file_put_contents("../src/loadassets.js", $js);
}

