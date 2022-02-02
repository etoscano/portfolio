import * as THREE from 'three'
import { BufferGeometry, Material, MeshStandardMaterial } from 'three'
import Experience from '../Experience.js'

export default class Lime
{
    constructor()
    {
        console.log("Lime")
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('lime')
        }

        // Resource
        this.resource = this.resources.items.limeModel

        this.setModel()

        this.customUniforms = {
            uTime: { value: 0 }
        }
        this.editMaterial()

        this.createLime()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(20,20,20)

        // Get geometry and material
        var child = this.model.children[0]
        this.geometry = child.geometry
        this.material = child.material
    }

    createLime(){

        // var mesh = new THREE.Mesh(this.geometry, this.material)
        // mesh.scale.set(20,20,20)
        // this.scene.add(mesh)

        this.num = 12

        const mesh = new THREE.InstancedMesh(this.geometry, this.material, this.num)
        mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
        mesh.scale.set(15,15,15)
        this.scene.add(mesh)
            
        for(let i = 0; i < this.num; i++)
        {
            const position = new THREE.Vector3(
                // (Math.random() - 0.5) * 0.4,
                (Math.sin(i * 0.5) ) * 0.15,
                // (Math.random() - 0.5) * 0.4,                
                // Math.sin(i * 5),
                (Math.cos(i * 16) ) * 0.1,
                

                // (Math.random() - 0.5) * 1
                0
            )

            const quaternion = new THREE.Quaternion()
            quaternion.setFromEuler(new THREE.Euler(
                (Math.sin(i * 0.5) - 0.5) * Math.PI * 2,
                (Math.cos(i * 0.5) - 0.5) * Math.PI * 2,
                0
            ))

            const matrix = new THREE.Matrix4()
            matrix.makeRotationFromQuaternion(quaternion)
            matrix.setPosition(position)
            mesh.setMatrixAt(i, matrix)
        }


        // if(child instanceof THREE.Mesh)
        // {
        //     child.castShadow = true
        // }
    }

    editMaterial(){

        this.material.onBeforeCompile = (shader) =>
        {
            shader.uniforms.uTime = this.customUniforms.uTime

            shader.vertexShader = shader.vertexShader.replace(
                '#include <common>',
                `
                    #include <common>

                    uniform float uTime;

                    mat2 get2dRotateMatrix(float _angle)
                    {
                        return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
                    }
                `
            )

            shader.vertexShader = shader.vertexShader.replace(
                '#include <beginnormal_vertex>',
                `
                    #include <beginnormal_vertex>

                    float angle = (position.y + uTime) * 0.4;
                    mat2 rotateMatrix = get2dRotateMatrix(angle);

                    objectNormal.xz = rotateMatrix * objectNormal.xz;
                `
            )
            shader.vertexShader = shader.vertexShader.replace(
                '#include <begin_vertex>',
                `
                    #include <begin_vertex>

                    transformed.xz = rotateMatrix * transformed.xz;
                `
            )
        }

    }


    update()
    {
        // Update material
        this.customUniforms.uTime.value = this.experience.time.elapsed * 0.001
    }
}