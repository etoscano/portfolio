import * as THREE from 'three'
import Experience from './Experience.js'

export default class Raycaster
{
    constructor()
    {
        this.experience = new Experience()
        this.mouse = this.experience.mouse
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.setRaycaster()
    }

    setRaycaster(){
        this.dir = new THREE.Vector3( this.mouse.x, this.mouse.y, 0 );
        this.origin = new THREE.Vector3( this.camera.instance.position.x, this.camera.instance.position.y, this.camera.instance.position.z );
        this.instance = new THREE.Raycaster(this.dir, this.origin,0, 300 )

        this.currentIntersect = null
    }

    update(){
        
        this.instance.setFromCamera(this.mouse.instance, this.camera.instance)

        // const objectsToTest = [object1, object2, object3]
        this.intersects = this.instance.intersectObjects(this.scene.children)
        

        if(this.intersects.length)
        {
            if(!this.currentIntersect)
            {
                console.log('mouse enter')
            }

            this.currentIntersect = this.intersects[0]
        }
        else
        {
            if(this.currentIntersect)
            {
                console.log('mouse leave')
            }
            
            this.currentIntersect = null
        }
        // for(const intersect of this.intersects)
        // {
        //     // intersect.object.material.color.set('#0000ff')
        //     console.log("intersect")
        // }
    
        // for(const object of this.scene.children)
        // {
        //     if(!this.intersects.find(intersect => intersect.object === object))
        //     {
        //         // object.material.color.set('#ff0000')
        //     }
        // }
    }

}