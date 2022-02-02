import * as THREE from 'three'
import Experience from '../Experience.js'
import gsap from 'gsap'

// import waterVertexShader from './shaders/water/vertex.glsl'
// import waterFragmentShader from './shaders/water/fragment.glsl'

export default class Cards
{
    constructor()
    {
        console.log("Cards")
        this.experience = new Experience()
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.ratio = 1.5
        this.width = 1
        this.geometry = new THREE.PlaneGeometry(this.width, this.width * this.ratio, 1, 1)
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
            normalMap: this.textures.normal,
            side: THREE.DoubleSide
        })
    }

    setMesh()
    {
        var num = 11
        var radius = 4
        this.cards = new THREE.Group()
        
        for(let i = 0; i< num; i++){
            var mesh = new THREE.Mesh(this.geometry, this.material)
            mesh.receiveShadow = true
            mesh.position.x = Math.sin(Math.PI * 2 / num * i ) * radius
            mesh.position.z = Math.cos(Math.PI * 2 / num * i ) * radius
            
            mesh.lookAt(new THREE.Vector3(0,0,0))
            mesh.position.y = this.width
            
            mesh.scale.set(0,0,0)
            this.cards.add(mesh)
        }
        this.scene.add(this.cards)
    }

    hideCards(){
        this.cards.traverse((child) =>
        {
            gsap.to(child.scale, { duration: 2, delay: 0.3, x: 0, y: 0, z: 0})
        })
    }

    showCards(){
        this.cards.traverse((child) =>
        {
            gsap.to(child.scale, { duration: 2, delay: 0.6, x: 1, y: 1, z: 1})
        })
    }

}