// from playground  https://www.babylonjs-playground.com/#VKBJN#2

// needs to be converted to TS from nested-function JS
// CreatePlane doesn't have a signature


import { Scene } from '../../../Babylon.js/src/scene'
import { Engine } from "../../../Babylon.js/src/Engines/engine"
import { ArcRotateCamera } from "../../../Babylon.js/src/Cameras/arcRotateCamera"
import { DirectionalLight } from "../../../Babylon.js/src/Lights/directionalLight"
import { Mesh } from "../../../Babylon.js/src/Meshes/mesh"
import { Vector3, Color3 } from "../../../Babylon.js/src/Maths/math"
import { VertexData } from "../../../Babylon.js/src/Meshes/mesh.vertexData"
import { StandardMaterial } from '../../../Babylon.js/src/Materials/standardMaterial'
import { DynamicTexture } from "../../../Babylon.js/src/Materials/Textures/dynamicTexture";


export class MeshFromScratch {

    private box: Mesh | undefined;     // don't want to add to scene in the constructor

    constructor() { }

    test() { }

    createScene(engine: Engine, canvas: HTMLCanvasElement): Scene {

        var scene = new Scene(engine);

        var light = new DirectionalLight("hemi", new Vector3(0, 0, 1), scene);

        var camera = new ArcRotateCamera("camera1", 0, 0, 0, new Vector3(0, 0, 0), scene);
        camera.setPosition(new Vector3(0, 5, -30));
        camera.attachControl(canvas, true);

        //Create a custom mesh
        var customMesh = new Mesh("custom", scene);

        //Set arrays for positions and indices
        var positions = [-5, 2, -3, -7, -2, -3, -3, -2, -3, 5, 2, 3, 7, -2, 3, 3, -2, 3];
        var indices = [0, 1, 2, 3, 4, 5];

        //Create a vertexData object
        var vertexData = new VertexData();

        //Assign positions and indices to vertexData
        vertexData.positions = positions;
        vertexData.indices = indices;

        //Apply vertexData to custom mesh
        vertexData.applyToMesh(customMesh);


        /******Display custom mesh in wireframe view to show its creation****************/
        var mat = new StandardMaterial("mat", scene);
        mat.wireframe = true;
        customMesh.material = mat;
        /*******************************************************************************/

        // show axis
        var showAxis = function(size) {
            var makeTextPlane = function(text, color, size) {
                var dynamicTexture = new DynamicTexture("DynamicTexture", 50, scene, true);
                dynamicTexture.hasAlpha = true;
                dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color, "transparent", true);
                var plane = new Mesh.CreatePlane("TextPlane", size, scene, true);
                plane.material = new StandardMaterial("TextPlaneMaterial", scene);
                plane.material.backFaceCulling = false;
                plane.material.specularColor = new Color3(0, 0, 0);
                plane.material.diffuseTexture = dynamicTexture;
                return plane;
            };

            var axisX = Mesh.CreateLines("axisX", [
                new Vector3.Zero(), new Vector3(size, 0, 0), new Vector3(size * 0.95, 0.05 * size, 0),
                new Vector3(size, 0, 0), new Vector3(size * 0.95, -0.05 * size, 0)
            ], scene);
            axisX.color = new Color3(1, 0, 0);
            var xChar = makeTextPlane("X", "red", size / 10);
            xChar.position = new Vector3(0.9 * size, -0.05 * size, 0);
            var axisY = Mesh.CreateLines("axisY", [
                new Vector3.Zero(), new Vector3(0, size, 0), new Vector3(-0.05 * size, size * 0.95, 0),
                new Vector3(0, size, 0), new Vector3(0.05 * size, size * 0.95, 0)
            ], scene);
            axisY.color = new Color3(0, 1, 0);
            var yChar = makeTextPlane("Y", "green", size / 10);
            yChar.position = new Vector3(0, 0.9 * size, -0.05 * size);
            var axisZ = Mesh.CreateLines("axisZ", [
                new Vector3.Zero(), new Vector3(0, 0, size), new Vector3(0, -0.05 * size, size * 0.95),
                new Vector3(0, 0, size), new Vector3(0, 0.05 * size, size * 0.95)
            ], scene);
            axisZ.color = new Color3(0, 0, 1);
            var zChar = makeTextPlane("Z", "blue", size / 10);
            zChar.position = new Vector3(0, 0.05 * size, 0.9 * size);
        };

        showAxis(10);
        return scene;

    }


    update(){}
}