import * as BABYLON from 'babylonjs';
import {
    GridMaterial
} from '@babylonjs/materials';

export class AsteroidBoard {

    private scene: BABYLON.Scene;
    private asteroidGridMaterial: GridMaterial;
    private skyRadius: number;
    private skyMaterial: BABYLON.Material;

    public asteroids: Array < BABYLON.Mesh > ;

    constructor(scene: BABYLON.Scene) {

        this.asteroids = [];
        this.scene = scene;

        this.asteroidGridMaterial = new GridMaterial("", this.scene);
        this.asteroidGridMaterial.majorUnitFrequency = 3;
        this.asteroidGridMaterial.gridRatio = 0.5;

        this.skyMaterial = new GridMaterial("skyMaterial", this.scene);
        this.skyMaterial.majorUnitFrequency = 6;
        this.skyMaterial.minorUnitVisibility = 0.3;
        this.skyMaterial.gridRatio = 0.5;
        this.skyMaterial.mainColor = new BABYLON.Color3(0, 0.05, 0.2);
        this.skyMaterial.lineColor = new BABYLON.Color3(0, 1.0, 1.0);
        this.skyMaterial.backFaceCulling = false;

        this.skyRadius = 50;
        var skySphere = BABYLON.Mesh.CreateSphere("skySphere", this.skyRadius * 2, this.skyRadius * 2, this.scene);
        skySphere.material = this.skyMaterial;

        // create the asteroids
        this.createAsteroids();
        console.log(this.asteroids)
    }

    createOneAsteroid() {
        let mesh = BABYLON.MeshBuilder.CreateSphere("mySphere", {
            diameterX: Math.random() * 5 + 2,
            diameterY: Math.random() * 5 + 2,
            diameterZ: Math.random() * 5 + 2,
        }, this.scene);

        mesh.material = this.asteroidGridMaterial;

        mesh.motion = new BABYLON.Vector3(this.randomMotion(), this.randomMotion(), this.randomMotion());
        mesh.rotate = new BABYLON.Vector3(this.randomMotion(), this.randomMotion(), this.randomMotion());
        return (mesh);
    }


    createAsteroids() {


        /////// this pattern puts a wall of asteroids across the xy plane
        let pattern = [
            [18, 0.9, 6], // 30 asteroids at 90% of the sphere radius, 7 in x direction
            [12, 0.6, 8], // 20              60%
            [8, 0.35, 12], // 10              30%
            [4, 0.15, 15], // 10              30
        ];

        pattern.forEach(ring => {
            let pi = 3.14;
            for (let i = 0; i < ring[0]; i++) {


                let x = (ring[1] * this.skyRadius) * Math.cos(2 * pi * i / ring[0])
                let y = (ring[1] * this.skyRadius) * Math.sin(2 * pi * i / ring[0])

                // the i loop puts asteroids in a series of rings on the x-y axis of the sphere
                // the j loop spreads them out along the z axis

                for (let j = 0; j < ring[2]; j++) {

                    let z = this.skyRadius * (j / ring[2]) * ((j % 2 == 0) ? -1 : 1)
                    // second part simply alternates between positive and negative values

                    if ((x * x + y * y + z * z) < (this.skyRadius * this.skyRadius)) {
                        let mesh = this.createOneAsteroid();
                        mesh.position = new BABYLON.Vector3(x, y, z);
                        this.asteroids.push(mesh);
                    }
                }
            }
        })

    }

    randomMotion() {
        return (Math.random() - 0.5) / 100;
    }

    updateAsteroids() {
        // move EACH asteroid and check for collisions (so can have jostling)
        this.asteroids.forEach(element => {
            // save old position
            let oldRotation = element.rotation;
            let oldPosition = element.position;
            // try out new position
            element.rotation.addInPlace(element.rotate);
            element.position.addInPlace(element.motion);

        });


    }

}