import * as THREE from 'three'

import Debug from './Utils/Debug.js'
import Sizes from './Utils/Sizes.js'
import Mouse from './Utils/Mouse.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'
import Raycaster from './Raycaster.js'
// import ShowSection from './Utils/ShowSection.js'

import sources from './sources.js'

let instance = null

export default class Experience
{
    constructor(_canvas)
    {
        // Singleton
        if(instance)
        {
            return instance
        }
        console.log("Experience");
        instance = this
        
        // Global access
        window.experience = this

        // Options
        this.canvas = _canvas

        // Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.mouse = new Mouse(this.sizes)
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()
        this.raycaster = new Raycaster()
        // this.showSection = new ShowSection()

        // Resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // // Mousemove event
        // this.mouse.on('mousemove', () =>
        // {
        //     this.mousemove()
        // })        

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })


    }



    cameraProjects()
    {
        this.camera.cameraProjects()
        // this.showSection.showProjects()
        // this.world.showFloor()
        // this.world.showCards()
        this.world.moveToCenter()
    }

    cameraUp()
    {
        this.camera.cameraUp()
        // this.showSection.showContacts()
        // this.world.hideFloor()
        // this.world.hideCards()
        this.world.moveToCenter(true)
    }

    cameraDown()
    {
        this.camera.cameraDown()
        // this.showSection.showHome()
        // this.world.hideFloor()
        // this.world.hideCards()
        this.world.putInCircle()
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    // mousemove()
    // {
    //     this.raycaster.update()
    // }

    update()
    {
        this.camera.update()
        this.world.update()
        this.renderer.update()
        this.raycaster.update()
    }

    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child) =>
        {
            // Test if it's a mesh
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                // Loop through the material properties
                for(const key in child.material)
                {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if(this.debug.active)
            this.debug.ui.destroy()
    }
}