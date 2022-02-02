import * as THREE from 'three'
import Experience from '../Experience.js'

import gsap from 'gsap'
export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        
        // Debug
        this.debugObject = {}

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('environment')
        }

        this.setSunLight()
        this.setEnvironmentMap()
        // this.setFog() TODO FOR PERFORMANCE
    }

    setSunLight()
    {
            this.debugObject.h_color_1 = '#ffffff'
            this.debugObject.h_color_2 = '#b2b63a'
            this.hemisphereLight = new THREE.HemisphereLight(this.debugObject.h_color_1, this.debugObject.h_color_2 , 0.6)
            this.scene.add(this.hemisphereLight)

            if(this.debug.active)
        {
            this.debugFolder.addColor(this.debugObject, 'h_color_1').onChange(() => { 
                this.hemisphereLight.color.set(this.debugObject.h_color_1)
             })
            this.debugFolder.addColor(this.debugObject, 'h_color_2').onChange(() => { 
                this.hemisphereLight.groundColor.set(this.debugObject.h_color_2)
             })
        }

            // this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
            // this.scene.add(this.ambientLight)


    //     this.sunLight = new THREE.DirectionalLight('#ffffff', 1.4)
    //     this.sunLight.castShadow = true
    //     this.sunLight.shadow.camera.far = 15
    //     this.sunLight.shadow.mapSize.set(1024, 1024)
    //     this.sunLight.shadow.normalBias = 0.05
    //     this.sunLight.position.set(3.5, 2, - 1.25)
    //     this.scene.add(this.sunLight)

    //     // Debug
    //     if(this.debug.active)
    //     {
    //         this.debugFolder
    //             .add(this.sunLight, 'intensity')
    //             .name('sunLightIntensity')
    //             .min(0)
    //             .max(10)
    //             .step(0.001)
            
    //         this.debugFolder
    //             .add(this.sunLight.position, 'x')
    //             .name('sunLightX')
    //             .min(- 5)
    //             .max(5)
    //             .step(0.001)
            
    //         this.debugFolder
    //             .add(this.sunLight.position, 'y')
    //             .name('sunLightY')
    //             .min(- 5)
    //             .max(5)
    //             .step(0.001)
            
    //         this.debugFolder
    //             .add(this.sunLight.position, 'z')
    //             .name('sunLightZ')
    //             .min(- 5)
    //             .max(5)
    //             .step(0.001)
    //     }
    }

    setEnvironmentMap()
    {
        this.environmentMap = {}
        this.environmentMap.intensity = 1.8
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.texture.encoding = THREE.sRGBEncoding
        
        this.scene.environment = this.environmentMap.texture

        this.environmentMap.updateMaterials = () =>
        {
            this.scene.traverse((child) =>
            {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
                {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }
        this.environmentMap.updateMaterials()

        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.environmentMap, 'intensity')
                .name('envMapIntensity')
                .min(0)
                .max(4)
                .step(0.001)
                .onChange(this.environmentMap.updateMaterials)
        }
    }

    setFog(){        
        this.debugObject.fogDensity = 0.1
        this.debugObject.noFogDensity = 0.007

        this.fog = new THREE.FogExp2(this.experience.debug, this.debugObject.fogDensity, this.debugObject.fogNear, this.debugObject.fogFar)
        this.debugObject.fog_color = '#211d20'
        this.fog.color.set(this.debugObject.fog_color)
        this.scene.fog = this.fog

        // Debug
        if(this.debug.active)
        {
            this.debugFolder.add(this.fog, 'density').min(0).max(1).step(0.00005)

            this.debugFolder.addColor(this.debugObject, 'fog_color').name("Fog").onChange(() => { 
                this.fog.color.set(this.debugObject.fog_color)
             })
        }
    }

    removeFog()
    {
        if(this.fog){
            gsap.to(this.fog, { duration: 5, delay: 0.3, density: this.debugObject.noFogDensity}) 
        }
    }

    restoreFog()
    {
        if(this.fog){
            gsap.to(this.fog, { duration: 5, delay: 0.3, density: this.debugObject.fogDensity}) 
        }
    }


}