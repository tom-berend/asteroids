// about the simplest program that can be run

import { Scene } from '../../../Babylon.js/src/scene'
import { Mesh } from "../../../Babylon.js/src/Meshes/mesh"
import { Engine } from "../../../Babylon.js/src/Engines/engine"
import { UniversalCamera } from "../../../Babylon.js/src/Cameras/universalCamera"
import { HemisphericLight } from "../../../Babylon.js/src/Lights/hemisphericLight"
import { MeshBuilder } from "../../../Babylon.js/src/Meshes/meshBuilder"
import { Vector3 } from "../../../Babylon.js/src/Maths/math"


export class SimpleTest {

    private box: Mesh | undefined;     // don't want to add to scene in the constructor
    // what is the 'nice' TS way to do this?

    constructor() { }

    test() { }

    createScene(engine: Engine, canvas: HTMLCanvasElement): Scene {

        let scene = new Scene(engine);
        let camera = new UniversalCamera("camera1", new Vector3(0, 0, -50), scene);

        // Add lights to the scene
        var light1 = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);

        // This is where you create and manipulate meshes
        this.box = MeshBuilder.CreateBox("box", { height: 5, width: 2, depth: 3 }, scene);

        return(scene)
    }


    update() {
        if (this.box) {     // might be undefined, so Typescript complains (nice!)
            this.box.rotation.x += .01;
            this.box.rotation.y += .01;
        }
    }
}
