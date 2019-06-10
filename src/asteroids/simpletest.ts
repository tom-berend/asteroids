// about the simplest program that can be run


import { Scene } from '../../../Babylon.js/src/scene'
import { Mesh } from "../../../Babylon.js/src/Meshes/mesh"
import { Engine } from "../../../Babylon.js/src/Engines/engine"
import { UniversalCamera } from "../../../Babylon.js/src/Cameras/universalCamera"
import { HemisphericLight } from "../../../Babylon.js/src/Lights/hemisphericLight"
import { MeshBuilder } from "../../../Babylon.js/src/Meshes/meshBuilder"
import { Vector3 } from "../../../Babylon.js/src/Maths/math"
import { StandardMaterial } from '../../../Babylon.js/src/Materials/standardMaterial'

import { PhysicsImpostor } from '../../../Babylon.js/src/Physics/physicsImpostor'
import { AmmoJSPlugin } from '../../../Babylon.js/src/Physics/Plugins/ammoJSPlugin'



export class SimpleTest {

    private box: Mesh | undefined;     // don't want to add to scene in the constructor
    // what is the 'nice' TS way to do this?

    constructor() { }

    test() { }

    createScene(engine: Engine, canvas: HTMLCanvasElement): Scene {

        let scene = new Scene(engine);
        let camera = new UniversalCamera("camera1", new Vector3(0, 0, -50), scene);

        var light1 = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);

        let standardMaterial = new StandardMaterial('', scene);  // needed for something ??

        this.box = MeshBuilder.CreateBox("box", { height: 5, width: 2, depth: 3 }, scene);


        // let gravityVector = new Vector3(0, 0, 0); // initially no gravity
        // let physicsPlugin = new AmmoJSPlugin();
        // scene.enablePhysics(gravityVector, physicsPlugin);

        // this.box.physicsImpostor = new PhysicsImpostor(this.box, PhysicsImpostor.BoxImpostor, {
        //     mass: 1,
        //     restitution: 1.0
        // }, scene);

        // let angularV = new Vector3(.5, .5, .5)
        // this.box.physicsImpostor.setAngularVelocity(angularV);

        return (scene)
    }


    update() {
    }
}



``

// // Abstract base class
// abstract class MyBaseClass {

//     // Abstract properties to be set in subclass
//     // Use getter syntax
//     protected abstract get string1(): string;
//     protected abstract get string2(): string;


//     constructor() {
//         // Set string3 so it is available for rest of class
//         this.string3 = this.buildString3();
//     }

//     protected buildString3(): string {
//         return this.string1 + " " + this.string2;
//     }
// }

// // Concrete subclass
// class MySubClass extends MyBaseClass {

//     // Abstract properties must be set or
//     //  transpiler error will occur
//     // Getter syntax must be used in subclass as well
//     protected get string1() { return "Hello"; }
//     protected get string2() { return "World!"; }
// }

// // Create object and display string3
// var myObject = new MySubClass();
// alert(myObject.string3);