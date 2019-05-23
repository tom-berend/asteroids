import 'core-js'; // <- at the top of your entry point

////////////////////////////////////////////////////
// test harness for working on Ammo interfaces


////////////////////////////////////////////////////
// below are different tests ('games').  Don't want to recreate the
// whole environment just to test or develop a feature.

const whichGame: number = 1;

///* 0 */ import { Asteroids } from "./asteroids/asteroids";
/* 1 */ import { AsteroidCollide } from "./asteroids/asteroidcollide";
///* 2 */ import { Icosahedron } from "./asteroids/icosahedron";
///* 3 */ import { SimpleTest } from "./asteroids/simpletest";


////////////////////////////////////////////////////
//

import { Engine } from '../../src/Engines/engine'
import { Scene } from '../../src/scene'
import { MeshBuilder } from '../../src/Meshes/meshBuilder'
import { StandardMaterial } from '../../src/Materials/standardMaterial'

import { Assert } from './utils/assert'


export class BJS {

    public canvasElement: HTMLCanvasElement;

    constructor(canvasElement: HTMLCanvasElement, x?: boolean) {
        this.canvasElement = canvasElement
    }

    createScene(): void {

        let assert = new Assert();
        assert.true(false, new Error('assert false works'));

        let engine = new Engine(this.canvasElement);

        let gameboard: any;

        switch (whichGame) {
            case 0:
                //                  gameboard = new Asteroids();
                break;
            case 1:
                gameboard = new AsteroidCollide();
                break;
            case 2:
                //                    gameboard = new Icosahedron(1, 2, 3);
                break;
            case 3:
                //                    gameboard = new SimpleTest();
                break;
            default:
                assert = new Assert()
                assert.true(false, new Error('not a valid gameboard choice: ' + whichGame.toString()));
        }


        gameboard = new AsteroidCollide();
        gameboard.test();   // always run the test script first

        // don't really care about scene, just making this consistant with BABYLON
        let scene: Scene = gameboard.createScene(engine, this.canvasElement);

        engine.runRenderLoop(() => {
            gameboard.update();
            scene.render();
        });


    }

}

// let assert = new Assert();
// assert.true(true, new Error('Test Passes'));
// // assert.true(false, new Error('Test Fails'));



window.addEventListener("DOMContentLoaded", () => {
    let canvas: any = document.getElementById("renderCanvas"); // Get the canvas element
    if (canvas) {
        let bjs = new BJS(canvas, true); // Generate the BABYLON 3D engine
        bjs.createScene();
    } else {
        let assert = new Assert();
        assert.true(false, new Error('did not find canvas "renderCanvas"'))
    }
})