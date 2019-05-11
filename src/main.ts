// import 'core-js'; // <- at the top of your entry point

import Asteroids from "./asteroids";
let myGame = new Asteroids("renderCanvas");


window.addEventListener("DOMContentLoaded", () => {
    // Create the game using the 'renderCanvas'

    // Create the scene
    myGame.createScene();

    // start animation
    myGame.animate();
});
