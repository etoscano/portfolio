import * as THREE from 'three'
import Experience from '../Experience.js'
import gsap from 'gsap'

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
        this.raycaster()
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

    // setMaterial()
    // {
    //     this.material = new THREE.MeshStandardMaterial({
    //         map: this.textures.color,
    //         normalMap: this.textures.normal,
    //         side: THREE.DoubleSide
    //     })
    // }


    setMaterial(i)
    {
        // Material
        return new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            transparent: true,
            vertexShader: this.resources.items.cardVertexShader,
            fragmentShader: this.resources.items.cardFragmentShader,
            uniforms:
            {
                uTexture: {value: this.resources.items['projectTexture_' + i]},
                uMask: {value: this.resources.items.mask}
            }
        });
    }

    setMesh()
    {
        var num = 11
        var radius = 3.5
        this.cards = new THREE.Group()
        
        for(let i = 0; i< num; i++){
            var mesh = new THREE.Mesh(this.geometry, this.setMaterial(i+1))
            mesh.receiveShadow = true
            mesh.position.x = Math.sin(Math.PI * 2 / num * i ) * radius
            mesh.position.z = Math.cos(Math.PI * 2 / num * i ) * radius
            
            mesh.lookAt(new THREE.Vector3(0,0,0))
            mesh.position.y = this.width
            
            mesh.scale.set(1,1,1)
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

    raycaster(){
        /**
         * Raycaster
         */
        this.raycaster = new THREE.Raycaster()
        this.currentIntersect = null
        const rayOrigin = new THREE.Vector3(- 3, 0, 0)
        const rayDirection = new THREE.Vector3(10, 0, 0)
        rayDirection.normalize()
    }

    update(){
        // Cast a ray from the mouse and handle events
        this.raycaster.setFromCamera(this.experience.mouse, this.experience.camera.instance)

        const intersects = this.raycaster.intersectObjects(this.cards)
        console.log(this.cards)
        
        if(intersects.length)
        {
            if(!this.currentIntersect)
            {
                console.log('mouse enter')
            }

            this.currentIntersect = intersects[0]
        }
        else
        {
            if(this.currentIntersect)
            {
                console.log('mouse leave')
            }
            
            this.currentIntersect = null
        }

    }

}