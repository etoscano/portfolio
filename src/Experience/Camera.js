import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import gsap from 'gsap'
export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug

        this.debugObject = {}

        this.setInstance()
        this.setControls()
        // this.setAnimation()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 40)
        this.instance.position.set(0 , 0.6, 6)

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('camera')
            this.debugFolder.add(this.instance, 'near').min(0).max(10).step(0.001)
            this.debugFolder.add(this.instance, 'far').min(1).max(200).step(0.001)

            this.debugFolder.add(this.instance.position, 'x').min(-10).max(20).step(0.001)
            this.debugFolder.add(this.instance.position, 'y').min(-10).max(40).step(0.001)
            this.debugFolder.add(this.instance.position, 'z').min(-10).max(10).step(0.001)
            // this.debugObject = {
            //     1: () => {
            //         this.instance.position.set(13.1, 0.7, 0)
            //         this.experience.world.restoreFog()
            //     },
            //     2: () => {
            //         this.instance.position.set(0, 40, 0)
            //         this.experience.world.removeFog()            
            //     },
            //     moveCameraUp: () => {
            //         gsap.to(this.instance.position, { duration: 5, delay: 0.3, y : 40})   
            //         this.experience.world.removeFog()    
            //     },
            //     moveCameraDown: () => {
            //         gsap.to(this.instance.position, { duration: 5, delay: 0.3, x: 13.1, y : 0.7, z: 0 })   
            //         this.experience.world.restoreFog()    
            //     }
            // }
            // this.debugFolder.add(this.debugObject, '1')
            // this.debugFolder.add(this.debugObject, '2')
            // this.debugFolder.add(this.debugObject, 'moveCameraUp')
            // this.debugFolder.add(this.debugObject, 'moveCameraDown')
        }

        this.scene.add(this.instance)
    }

    cameraProjects()
    {
        // this.controls.autoRotate = true
        gsap.to(this.instance.position, { duration: 5, delay: 0.3, x: 0 , y: 2.5, z: 9}) 
        this.experience.world.restoreFog()  // TODO remove fog everywhere
        this.controls.enableZoom = true  
    }

    cameraUp()
    {
        // this.controls.autoRotate = true
        gsap.to(this.instance.position, { duration: 5, delay: 0.3, x: 0, y : 20, z: 0})   
        this.experience.world.removeFog()    
        this.controls.enableZoom = false
    }

    cameraDown()
    {
        // this.controls.autoRotate = true
        gsap.to(this.instance.position, { duration: 5, delay: 0.3, x: 0, y : 0.6, z: 6 })   
        this.experience.world.restoreFog()    
        this.controls.enableZoom = false
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.enableZoom = false
        this.controls.enabled = false
        this.controls.autoRotate = false
        this.controls.autoRotateSpeed = 0.2

        this.controls.target.set(0,0.5,0)

        if(this.debug.active)
        {
            this.debugFolder.add(this.controls, 'autoRotateSpeed').min(0).max(1).step(0.001)
            this.debugFolder.add(this.controls.target, 'x').min(-10).max(10).step(0.001)
            this.debugFolder.add(this.controls.target, 'y').min(-10).max(10).step(0.001)
            this.debugFolder.add(this.controls.target, 'z').min(-10).max(10).step(0.001)
        }
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    // setAnimation(){

    //     this.cursor = {}
    //     this.cursor.x = 0
    //     this.cursor.y = 0
        
    //     window.addEventListener('mousemove', (event) =>
    //     {
    //         this.cursor.x = event.clientX / this.sizes.width - 0.5
    //         this.cursor.y = event.clientY / this.sizes.height - 0.5
    //     })
    // }

    update()
    {
        this.controls.update()

        // Animate camera
        this.parallaxX = this.experience.mouse.x * 0.5
        this.parallaxY = - this.experience.mouse.y * 0.5
        this.instance.position.x += 0.01 * (this.parallaxX)
        this.instance.position.y += 0.1 * (this.parallaxY)
        this.instance.position.z += 0.01 * (this.parallaxX)

        // console.log(this.cursor.x)

    }

}