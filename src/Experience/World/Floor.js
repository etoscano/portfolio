import * as THREE from 'three'
import Experience from '../Experience.js'
import gsap from 'gsap'
export default class Floor
{
    constructor()
    {
        console.log("Floor")
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
        this.setAxis()
    }

    setAxis(){
        const axesHelper = new THREE.AxesHelper( 10 );
        this.scene.add( axesHelper );
    }

    setGeometry()
    {
        this.geometry = new THREE.CircleGeometry(5, 64)
    }

    setTextures()
    {
        this.textures = {}

        this.textures.color = this.resources.items.grassColorTexture
        this.textures.color.encoding = THREE.sRGBEncoding
        this.textures.color.repeat.set(1.5, 1.5)
        this.textures.color.wrapS = THREE.RepeatWrapping
        this.textures.color.wrapT = THREE.RepeatWrapping

        this.textures.normal = this.resources.items.grassNormalTexture
        this.textures.normal.repeat.set(1.5, 1.5)
        this.textures.normal.wrapS = THREE.RepeatWrapping
        this.textures.normal.wrapT = THREE.RepeatWrapping
    }

    setMaterial()
    {
        this.material = new THREE.MeshStandardMaterial({
            map: this.textures.color,
            normalMap: this.textures.normal
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = - Math.PI * 0.5
        this.mesh.receiveShadow = true
        this.mesh.scale.set(0,0,1)
        this.scene.add(this.mesh)
    }

    hideFloor(){
        gsap.to(this.mesh.scale, { duration: 2, delay: 0.3, x: 0, y: 0})  
    }

    showFloor(){
        gsap.to(this.mesh.scale, { duration: 2, delay: 0.3, x: 1, y: 1})  
    }

}