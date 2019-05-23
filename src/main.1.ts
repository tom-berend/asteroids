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

//import { Assert } from './utils/assert'



export class Asteroids {

    constructor(canvasElement: string) {

        console.log('main1')
        // Create canvas and engine
        let canvas:HTMLCanvasElement = document.getElementById(canvasElement) as HTMLCanvasElement;
        var engine = new Engine(canvas, true);

        window.addEventListener("DOMContentLoaded", () => {

            console.log('main2')
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
//                    assert.true(false, new Error('not a valid gameboard choice: ' + whichGame.toString()));
                    gameboard = new AsteroidCollide();
            }

            console.log('main3')

            gameboard.test();   // always run the test script first

            let scene:Scene = gameboard.createScene(engine,canvas);


            engine.runRenderLoop(() => {
                gameboard.update();
                scene.render();
            });
        });

    }
}

// let assert = new Assert();
// assert.true(true, new Error('Test Passes'));
// // assert.true(false, new Error('Test Fails'));



let myGame = new Asteroids("renderCanvas");

