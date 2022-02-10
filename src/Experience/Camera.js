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

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('camera')
            this.debugFolder.add(this.instance, 'near').min(0).max(10).step(0.001)
            this.debugFolder.add(this.instance, 'far').min(1).max(200).step(0.001)

            this.debugFolder.add(this.instance.position, 'x').min(-10).max(20).step(0.001)
            this.debugFolder.add(this.instance.position, 'y').min(-10).max(40).step(0.001)
            this.debugFolder.add(this.instance.position, 'z').min(-10).max(10).step(0.001)
        }

        this.positions = {
            about: {
                x: 0,
                y: 0.5,
                z: -1
            },
            home: {
                x: 0,
                y: 0.5,
                z: 3,
                minY: 0.3,
                maxY: 0.8
            }
        }
        this.instance.position.set(this.positions.home.x, this.positions.home.y, this.positions.home.z)
        this.scene.add(this.instance)
    }

    cameraProjects()
    {
        // this.controls.autoRotate = true
        gsap.to(this.instance.position, { duration: 5, delay: 0.3, x: 0 , y: 2.5, z: 9}) 
        this.experience.world.restoreFog()  // TODO remove fog everywhere
        this.controls.enableZoom = true  
    }

    cameraAbout()
    {
        // this.controls.autoRotate = true
        gsap.to(this.instance.position, { duration: 5, delay: 0.3, x: this.positions.about.x, y : this.positions.about.y, z: this.positions.about.z})   
        this.experience.world.removeFog()    
        this.controls.enableZoom = false
    }

    cameraDown()
    {
        // this.controls.autoRotate = true
        gsap.to(this.instance.position, { duration: 5, delay: 0.3, x: this.positions.home.x, y: this.positions.home.y, z: this.positions.home.z })   
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

        this.controls.target.set(0,0.5,-10)

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
        this.parallaxX = this.experience.mouse.instance.x * 0.5
        this.parallaxY = - this.experience.mouse.instance.y * 0.5
        this.instance.position.x += 0.01 * (this.parallaxX)
        // console.log(THREE.MathUtils.clamp(0.01 * (this.parallaxY), this.positions.home.y - this.positions.home.minY, this.positions.home.y + this.positions.home.maxY))
        this.instance.position.y = THREE.MathUtils.clamp(
            this.instance.position.y + 0.01 * (this.parallaxY),
            this.positions.home.y - this.positions.home.minY,
            this.positions.home.y + this.positions.home.maxY
        ) 
        this.instance.position.z += 0.01 * (this.parallaxX)

        // console.log(this.cursor.x)

    }

}