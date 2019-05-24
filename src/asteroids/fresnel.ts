// from https://www.babylonjs-playground.com/#AQZJ4C
//



import { Engine } from '../../../src/Engines/engine'
import { Mesh } from "../../../src/Meshes/mesh"
import { UniversalCamera } from '../../../src/Cameras/universalCamera';
import { ArcRotateCamera } from '../../../src/Cameras/arcRotateCamera'
import { Camera } from "../../../src/Cameras/camera"
import { Vector3, Color3 } from "../../../src/Maths/math"
import { HemisphericLight } from "../../../src/Lights/hemisphericLight"
import { Scene } from '../../../src/scene'
import { MeshBuilder } from '../../../src/Meshes/meshBuilder'
import { PhysicsImpostor } from '../../../src/Physics/physicsImpostor'
import { StandardMaterial } from '../../../src/Materials/standardMaterial'
import { PointLight } from '../../../src/Lights/pointLight'
import {Texture} from '../../../src/Materials/Textures/texture'

import { CubeTexture } from '../../../src/Materials/Textures/cubeTexture'
import { FresnelParameters } from '../../../src/Materials/fresnelParameters'

import { assert } from './assert';
import { Material } from '../../../src/Materials/material';



export class Fresnel {

    constructor() { }

    test() { }

    createScene(engine: Engine, canvas: HTMLCanvasElement): Scene {

        var scene = new Scene(engine);
        var camera = new ArcRotateCamera("Camera", 0, 0, 10, Vector3.Zero(), scene);
        var material = new StandardMaterial("kosh", scene);
        var sphere1 = Mesh.CreateSphere("Sphere1", 32, 3, scene);
        var sphere2 = Mesh.CreateSphere("Sphere2", 32, 3, scene);
        var sphere3 = Mesh.CreateSphere("Sphere3", 32, 3, scene);
        var sphere4 = Mesh.CreateSphere("Sphere4", 32, 3, scene);
        var sphere5 = Mesh.CreateSphere("Sphere5", 32, 3, scene);
        var light = new PointLight("Omni0", new Vector3(-17.6, 18.8, -49.9), scene);

        camera.setPosition(new Vector3(-15, 3, 0));
        camera.attachControl(canvas, true);

        sphere2.position.z -= 5;
        sphere3.position.z += 5;
        sphere4.position.x += 5;
        sphere5.position.x -= 5;

        // Sphere1 material
        material.reflectionTexture = new CubeTexture("assets/TropicalSunnyDay", scene);
        material.diffuseColor = new Color3(0, 0, 0);
        material.emissiveColor = new Color3(0.5, 0.5, 0.5);
        material.alpha = 0.2;
        material.specularPower = 16;

        // Fresnel**
        material.reflectionFresnelParameters = new FresnelParameters();
        material.reflectionFresnelParameters.bias = 0.1;

        material.emissiveFresnelParameters = new FresnelParameters();
        material.emissiveFresnelParameters.bias = 0.6;
        material.emissiveFresnelParameters.power = 4;
        material.emissiveFresnelParameters.leftColor = Color3.White();
        material.emissiveFresnelParameters.rightColor = Color3.Black();

        material.opacityFresnelParameters = new FresnelParameters();
        material.opacityFresnelParameters.leftColor = Color3.White();
        material.opacityFresnelParameters.rightColor = Color3.Black();

        sphere1.material = material;

        // Sphere2 material
        material = new StandardMaterial("kosh2", scene);
        material.reflectionTexture = new CubeTexture("assets/TropicalSunnyDay", scene);
        material.diffuseColor = new Color3(0, 0, 0);
        material.emissiveColor = new Color3(0.5, 0.5, 0.5);
        material.specularPower = 32;

        // Fresnel
        material.reflectionFresnelParameters = new FresnelParameters();
        material.reflectionFresnelParameters.bias = 0.1;

        material.emissiveFresnelParameters = new FresnelParameters();
        material.emissiveFresnelParameters.bias = 0.5;
        material.emissiveFresnelParameters.power = 4;
        material.emissiveFresnelParameters.leftColor = Color3.White();
        material.emissiveFresnelParameters.rightColor = Color3.Black();

        sphere2.material = material;

        // Sphere3 material
        material = new StandardMaterial("kosh3", scene);
        material.diffuseColor = new Color3(0, 0, 0);
        material.emissiveColor = Color3.White();
        material.specularPower = 64;
        material.alpha = 0.2;

        // Fresnel
        material.emissiveFresnelParameters = new FresnelParameters();
        material.emissiveFresnelParameters.bias = 0.2;
        material.emissiveFresnelParameters.leftColor = Color3.White();
        material.emissiveFresnelParameters.rightColor = Color3.Black();

        material.opacityFresnelParameters = new FresnelParameters();
        material.opacityFresnelParameters.power = 4;
        material.opacityFresnelParameters.leftColor = Color3.White();
        material.opacityFresnelParameters.rightColor = Color3.Black();

        sphere3.material = material;

        // Sphere4 material
        material = new StandardMaterial("kosh4", scene);
        material.diffuseColor = new Color3(0, 0, 0);
        material.emissiveColor = Color3.White();
        material.specularPower = 64;

        // Fresnel
        material.emissiveFresnelParameters = new FresnelParameters();
        material.emissiveFresnelParameters.power = 4;
        material.emissiveFresnelParameters.bias = 0.5;
        material.emissiveFresnelParameters.leftColor = Color3.White();
        material.emissiveFresnelParameters.rightColor = Color3.Black();

        sphere4.material = material;

        // Sphere5 material
        material = new StandardMaterial("kosh5", scene);
        material.diffuseColor = new Color3(0, 0, 0);
        material.reflectionTexture = new CubeTexture("assets/TropicalSunnyDay", scene);
        material.reflectionTexture.level = 0.5;
        material.specularPower = 64;
        material.emissiveColor = new Color3(0.2, 0.2, 0.2);

        // Fresnel
        material.emissiveFresnelParameters = new FresnelParameters();
        material.emissiveFresnelParameters.bias = 0.4;
        material.emissiveFresnelParameters.power = 2;
        material.emissiveFresnelParameters.leftColor = Color3.Black();
        material.emissiveFresnelParameters.rightColor = Color3.White();

        sphere5.material = material;

        // Skybox
        var skybox = Mesh.CreateBox("skyBox", 100.0, scene);
        var skyboxMaterial = new StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new CubeTexture("assets/TropicalSunnyDay", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
        skyboxMaterial.specularColor = new Color3(0, 0, 0);
        skyboxMaterial.disableLighting = true;
        skybox.material = skyboxMaterial;

        return scene;
    }

    update() { }

}