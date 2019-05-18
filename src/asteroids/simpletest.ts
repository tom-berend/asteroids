import {
    Engine,
    Scene,
    Camera,
    FreeCamera,
    ArcRotateCamera,
    Light,
    MeshBuilder,
    Vector3,
    HemisphericLight,
    AmmoJSPlugin,
    Mesh
} from "babylonjs";


export class SimpleTest {

    private box: Mesh;

    constructor() {
        console.log('in SimpleTest constructor');
    }



    create(scene: Scene, camera: Camera) {
        console.log('in SimpleTest:create()')

        // Add lights to the scene
        var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);

        // This is where you create and manipulate meshes
        this.box = BABYLON.MeshBuilder.CreateBox("box", {height: 5, width: 2, depth: 3}, scene);
    }


    update(scene:Scene,camera:Camera) {
        this.box.rotation.x += .01;
        this.box.rotation.y += .01;
    }
}
