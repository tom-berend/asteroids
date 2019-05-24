import 'core-js'; // <- at the top of your entry point

////////////////////////////////////////////////////
// test harness for working on Ammo interfaces


////////////////////////////////////////////////////
// below are different tests ('games').  Don't want to recreate the
// whole environment just to test or develop a feature.

const whichGame: number = 1;

///* 0 */ import { Asteroids } from "./asteroids/asteroids";
/* 1 */ import { AsteroidCollide } from "./asteroids/asteroidcollide";
///* 2 */ import { MeshFromScratch } from "./asteroids/meshfromscratch";
/* 3 */ import { SimpleTest } from "./asteroids/simpletest";
/* 4 */ import { Fresnel } from "./asteroids/fresnel";


////////////////////////////////////////////////////
//

import { Engine } from '../../Babylon.js/src/Engines/engine'
import { Scene } from '../../Babylon.js/src/scene'

import { assert } from './asteroids/assert'


export class BJS {

    public canvasElement: HTMLCanvasElement;

    constructor(canvasElement: HTMLCanvasElement, x?: boolean) {
        this.canvasElement = canvasElement

        assert(true, 'Test Passes');
        // assert(false, 'Test Fails');


        let engine = new Engine(this.canvasElement);

        let gameboard: any;

        // todo:  write a carousel to rotate through these tests

        switch (whichGame) {
            case 0:
                //                  gameboard = new Asteroids();
                break;
            case 1:
                gameboard = new AsteroidCollide();
                break;
            case 2:
 // doesn't compile yet
 //                gameboard = new MeshFromScratch();
                break;
            case 3:
                gameboard = new SimpleTest();
                break;
            case 4:
                gameboard = new Fresnel();
                break;
            default:
             assert(false, 'not a valid gameboard choice: ' + whichGame.toString());
        }


        gameboard.test();   // always run the test script first

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
        let bjs = new BJS(canvas, true); // Generate the BABYLON 3D engine
    } else {
        assert(false, 'did not find canvas "renderCanvas"')
    }
})