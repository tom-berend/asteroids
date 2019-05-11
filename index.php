<?php
// echo $_SERVER['REQUEST_SCHEME'],"<br>";
// echo $_SERVER['HTTP_HOST'],"<br>";
// echo $_SERVER['REQUEST_URI'],"<br>";

$pURL = parse_url($_SERVER['REQUEST_URI']);
// print_r($pURL);

// echo "<br>";
// echo "<br>";
$baseURL = "{$_SERVER['REQUEST_SCHEME']}://{$_SERVER['HTTP_HOST']}{$pURL['path']}";
// echo $baseURL,"<br>";
// echo "-----------";
///////////////////

// if no game specified, then we list all possible games
if (!isset($pURL['query']) or empty($pURL['query'])){
    $files = scandir('./src');

    $HTML = "<table>";
    foreach($files as $file){
        if(substr($file,0,1)=='.') continue;
        //echo $file,"<br>";

        $thisfile = fopen("./src/$file","r");
        $first = htmlspecialchars(fgets($thisfile));
        fclose($thisfile);
        $thatfile = "<a href='{$baseURL}?$file'>$file</a>";
        $HTML .= "<tr><td>$thatfile</td><td>$first</td></tr>";
    }
    $HTML .= "</table>";
    echo $HTML;
    return;
}

// game is specified, run it...    
$game = $pURL['query'];
//echo "running... {$game} <br>";

?>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <title>Babylon Template</title>

        <style>
            html, body {
                overflow: hidden;
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
            }

            #renderCanvas {
                width: 100%;
                height: 100%;
                touch-action: none;
            }
        </style>

        <!--script src="https://cdn.babylonjs.com/babylon.js"></script-->
        <script src="lib/babylon.custom.js"></script>
        <script src="lib/babylonjs.loaders.min.js"></script>
        <script src="lib/babylon.glTFFileLoader.min.js"></script>
        <script src="lib/pep-0.4.3.js"></script>
        <script src="lib/seedrandom.min.js"></script>
        <script src="lib/babylon.gridMaterial.js"></script>
        <script src="lib/cannon.js"></script>
        
        <script src="src/lib/tomlib.js"></script>

    </head>

   <body onload="">

    <canvas id="renderCanvas" touch-action="none"></canvas> //touch-action="none" for best results from PEP
    <script src= <?php echo '"src/'.$game.'"'; ?> ></script>

   </body>

</html>