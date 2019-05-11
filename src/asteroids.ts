import {
    Engine,
    Scene,
    FreeCamera,
    Light,
    Vector3,
    HemisphericLight
} from "@babylonjs/core";

import { AsteroidBoard } from "./worlds/asteroidboard";

export default class Asteroids {
    private _canvas: HTMLCanvasElement;
    private _engine: Engine;
    private _scene: Scene;
    private _camera: FreeCamera;
    private _light: Light;

    public gameboard: any;

    constructor(canvasElement: string) {
        // Create canvas and engine
        console.log(Engine);
        this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this._engine = new Engine(this._canvas, true);
    }

    public createScene(): void {
        // create a basic BJS Scene object
        this._scene = new Scene(this._engine);

        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        this._camera = new FreeCamera(
            "camera1",
            new Vector3(0, 5, -10),
            this._scene
        );
        this._camera.setTarget(Vector3.Zero());
        this._camera.attachControl(this._canvas, false);

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        this._light = new HemisphericLight(
            "light1",
            new Vector3(0, 1, 0),
            this._scene
        );

        this.gameboard = new AsteroidBoard(this._scene);
        this.gameboard.createAsteroids();
    }

    public animate(): void {
        // run the render loop
        this._engine.runRenderLoop(() => {
            this.gameboard.updateAsteroids();
            this._scene.render();
        });

        // the canvas/window resize event handler
        window.addEventListener("resize", () => {
            this._engine.resize();
        });
    }
}
