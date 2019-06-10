import 'core-js'; // <- at the top of your entry point

////////////////////////////////////////////////////
// test harness for working on Ammo interfaces


////////////////////////////////////////////////////
// below are different tests ('games').  Don't want to recreate the
// whole environment just to test or develop a feature.

import { SimpleTest } from "./asteroids/simpletest";

////////////////////////////////////////////////////
//

import { Engine } from '../../Babylon.js/src/Engines/engine';
import { Scene } from '../../Babylon.js/src/scene';


export class Asteroids {

    public canvasElement: HTMLCanvasElement;

    constructor(canvasElement: HTMLCanvasElement, x?: boolean) {
        this.canvasElement = canvasElement

        let engine = new Engine(this.canvasElement);
        let gameboard = new SimpleTest();

        // don't really care about scene, just making this consistant with BABYLON
        let scene: Scene = gameboard.createScene(engine, this.canvasElement);


        ///////////////////////
        //  keep it running...

        engine.runRenderLoop(() => {
            gameboard.update();
            scene.render();
        });
    }

}



window.addEventListener("DOMContentLoaded", () => {
    let canvas: any = document.getElementById("renderCanvas"); // Get the canvas element
    if (canvas) {
        let bjs = new Asteroids(canvas, true); // Generate the BABYLON 3D engine
    } else {
        console.log('Did not find element \'renderCanvas\'')
    }
})