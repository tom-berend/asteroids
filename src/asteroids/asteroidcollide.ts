


import { Engine } from '../../../src/Engines/engine'
import { Mesh } from "../../../src/Meshes/mesh"
import { UniversalCamera } from '../../../src/Cameras/universalCamera';
import { Camera } from "../../../src/Cameras/camera"
import { Vector3 } from "../../../src/Maths/math"
import { Color3 } from "../../../src/Maths/math"
import { HemisphericLight } from "../../../src/Lights/hemisphericLight"
import { Scene } from '../../../src/scene'
import { MeshBuilder } from '../../../src/Meshes/meshBuilder'
import { PhysicsImpostor } from '../../../src/Physics/physicsImpostor'
import { StandardMaterial } from '../../../src/Materials/standardMaterial'

import { assert } from './assert';

export class AsteroidCollide {

    // private asteroidGridMaterial: GridMaterial;
    // private skyMaterial: GridMaterial;

    //var asteroidGridMaterial = new BABYLON.StandardMaterial("myMaterial", scene);

    private b1: any;
    private b2: any;
    private c1: any;
    private c2: any;

    constructor() { }

    test() { }


    createScene(engine: Engine, canvas: HTMLCanvasElement): Scene {


        console.log('in collide createScene');
        let scene = new Scene(engine);


        let gravityVector = new Vector3(0, 0, 0); // initially no gravity
        //let physicsPlugin = new AmmoJSPlugin();
        // @ ts-ignore
        //scene.enablePhysics(gravityVector, physicsPlugin);

        let camera = new UniversalCamera("camera1", new Vector3(0, 0, -50), scene);
        camera.attachControl(canvas, true);
        camera.setTarget(Vector3.Zero());

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        let light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

        // // this seems to have necessary side-effects
        let standardMaterial = new StandardMaterial('', scene);


        let size, position, linearV, angularV;
        console.log(4);

        size = new Vector3(2, 4, 10);
        linearV = new Vector3(0.5, 0, 0)
        angularV = new Vector3(0, -1, 0)

        this.b1 = MeshBuilder.CreateSphere("", {
            diameterX: size.x,
            diameterY: size.y,
            diameterZ: size.z
        }, scene);

        position = new Vector3(-8, 8, 0)

        this.b1.position = position

        // b1.physicsImpostor = new PhysicsImpostor(b1, PhysicsImpostor.MeshImpostor, {
        //     mass: 1,
        //     restitution: 1.0
        // }, scene);

        // b1.physicsImpostor.setLinearVelocity(linearV);
        // b1.physicsImpostor.setAngularVelocity(angularV);


        this.c1 = MeshBuilder.CreateBox("", {
            width: size.x,
            height: size.y,
            depth: size.z
        }, scene);

        position = new Vector3(-8, -8, 0)
        this.c1.position = position;

        // c1.physicsImpostor = new PhysicsImpostor(c1, PhysicsImpostor.BoxImpostor, {
        //     mass: 1,
        //     restitution: 1.0
        // }, scene);

        // c1.physicsImpostor.setLinearVelocity(linearV);
        // c1.physicsImpostor.setAngularVelocity(angularV);





        linearV = new Vector3(-0.5, 0, 0)


        this.b2 = MeshBuilder.CreateSphere("", {
            diameterX: size.x,
            diameterY: size.y,
            diameterZ: size.z
        }, scene);

        this.b2.position = new Vector3(8, 8, 0)

        // b2.physicsImpostor = new PhysicsImpostor(b2, PhysicsImpostor.MeshImpostor, {
        //     mass: 1,
        //     restitution: 1.0
        // }, scene);

        // b2.physicsImpostor.setLinearVelocity(linearV);
        // b2.physicsImpostor.setAngularVelocity(angularV);



        this.c2 = MeshBuilder.CreateBox("", {
            width: size.x,
            height: size.y,
            depth: size.z
        }, scene);

        position = new Vector3(8, -8, 0)
        this.c2.position = position;

        // c2.physicsImpostor = new PhysicsImpostor(c2, PhysicsImpostor.BoxImpostor, {
        //     mass: 1,
        //     restitution: 1.0
        // }, scene);

        // c2.physicsImpostor.setLinearVelocity(linearV);
        // c2.physicsImpostor.setAngularVelocity(angularV);

        return (scene)
    }

    update() {
        this.b1.rotation.y += 0.01
        this.b2.rotation.y += 0.01
        this.c1.rotation.y += 0.01
        this.c2.rotation.y += 0.01
        //
    }



}