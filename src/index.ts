// import 'core-js'; // <- at the top of your entry point

import Asteroids from "./asteroids";


window.addEventListener("DOMContentLoaded", () => {
    // Create the game using the 'renderCanvas'
    let asteroids = new Asteroids("renderCanvas");

    // Create the scene
    asteroids.createScene();

    // start animation
    asteroids.animate();
});
