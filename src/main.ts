// import 'core-js'; // <- at the top of your entry point


////////////////////////////////////////////////////
// theses are different 'games'.  Don't want to recreate the
// whole environment just to test or develop a feature.
// the production game is 0

const whichGame: number = 1;

/* 0 */ import { Asteroids } from "./asteroids/asteroids";
/* 1 */ import { AsteroidCollide } from "./asteroids/asteroidcollide";
/* 2 */ import { Icosahedron } from "./asteroids/icosahedron";
/* 3 */ import { SimpleTest } from "./asteroids/simpletest";

////////////////////////////////////////////////////




import {
    Engine,
    Scene,
    Camera,
    FreeCamera,
    ArcRotateCamera,
    Light,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    AmmoJSPlugin
} from "@babylonjs/core";


export class Assert {

    // use asserts to check and document boundary conditions, and stuff that
    // TypeScript's types won't find.

    // Asserts document that you designed your code so that some condition is
    // always (meant to) be true at that time, taking into account the interactions
    // between components.

    // let assert = new Assert();
    // assert.true(true, new Error('Test Passes'));
    // assert.true(false, new Error('Test Fails'));

    public true(outcome: Boolean, description: Error): void {
        if (!outcome) {
            // outdiv and output might be null
            const assertdiv = document.getElementById("assertdiv");
            const output = document.getElementById('output');

            if (assertdiv && output) {  // either HTMLElement or null
                assertdiv.style.display = "block";
                assertdiv.style.backgroundColor = "yellow";
                var li = document.createElement('li');
                li.innerHTML = "<span style='color:red;font-weight:bold;'>FAIL</span> " +
                    description;

                output.appendChild(li);
            }
            // we also print to the console in error colours so we can get the line number
            // hide the display warnings in production by removing the <div>, will still get console errors
            console.log('%c' + description, 'background: yellow; color: red')
        }
    };

}

class SomeGame {
    private canvas: HTMLCanvasElement;
    //private engine: Engine;

    // public scene: Scene;
    // public camera: ArcRotateCamera;

    public gameboard: any;

    constructor(canvasElement: string) {

        let assert = new Assert();
        assert.true(true, new Error('Test Passes'));
        // assert.true(false, new Error('Test Fails'));

        // Create canvas and engine
        this.canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        console.log(this.canvas)
        var engine = new Engine(this.canvas, true);


        // this.camera = new FreeCamera("camera0", new Vector3(0, 5, -10), this.scene);

        // this.camera.setTarget(Vector3.Zero());
        // this.camera.attachControl(this.canvas, false);

        window.addEventListener("DOMContentLoaded", () => {

            let scene = new Scene(this.engine);
            let gravityVector = new Vector3(0, 0, 0); // initially no gravity
            let physicsPlugin = new AmmoJSPlugin();
            scene.enablePhysics(gravityVector, physicsPlugin);

            // default is a FreeCamera, position set to (x:0, y:0, z:-50)
            let camera = new FreeCamera("camera1", new Vector3(0, 0, -50), scene);
            camera.setTarget(Vector3.Zero());

            // // Add a camera to the scene and attach it to the canvas
            // let camera:Camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);


            var gameboard;

            switch (whichGame) {
                case 0:
                    gameboard = new Asteroids();
                    break;
                case 1:
                    gameboard = new AsteroidCollide();
                    break;
                case 2:
                    gameboard = new Icosahedron(1, 2, 3);
                    break;
                case 3:
                    gameboard = new SimpleTest();
                    break;
                default:
            }

            gameboard.create(scene, camera);
            camera.attachControl(this.canvas, true);

            // Create the game using the 'renderCanvas' Create the scene
            //myGame.createScene();

            //            this.gameboard.create(this.canvas, this.scene);

            engine.runRenderLoop(() => {
                gameboard.update();
                scene.render();
            });
        });

    }



    // public animate(): void {
    //     // run the render loop

    //     console.log('loop')
    //     // // the canvas/window resize event handler
    //     // window.addEventListener("resize", () => {
    //     //     this.engine.resize();
    //     // });
    // }
}

let myGame = new SomeGame("renderCanvas");

