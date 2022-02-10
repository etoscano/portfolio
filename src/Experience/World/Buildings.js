import * as THREE from 'three'
import Experience from '../Experience.js'
import gsap from 'gsap'

export default class Buildings
{
    constructor()
    {
        console.log("Buildings")
        this.experience = new Experience()
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setGeometry()
        this.setMaterial()
        this.setMesh()

    }

    setGeometry()
    {
        this.ratio = 1
        this.width = 1
        this.geometry = new THREE.PlaneGeometry(this.width, this.width * this.ratio, 1, 1)
        this.geometry.scale(2,2,2)
    }


    setMaterial(i)
    {
        // Material
        return new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            transparent: true,
            vertexShader: this.resources.items.buildingVertexShader,
            fragmentShader: this.resources.items.buildingFragmentShader,
            uniforms:
            {
                uTexture: {value: this.resources.items['b_' + i]}
            }
        });
    }

    setMesh()
    {
        var num = 4
        var n = 11
        var radius = 3.5
        this.cards = new THREE.Group()
        
        for(let i = 0; i< num; i++){
            var mesh = new THREE.Mesh(this.geometry, this.setMaterial(i+1))
            mesh.receiveShadow = true
            mesh.position.x = Math.sin(Math.PI * 2 / n * i + Math.PI - Math.PI / n * (num - 1)) * radius
            mesh.position.z = Math.cos(Math.PI * 2 / n * i + Math.PI - Math.PI / n * (num - 1)) * radius
            
            mesh.lookAt(new THREE.Vector3(0,0,0))
            mesh.position.y = this.width
            
            mesh.scale.set(1,1,1)
            this.cards.add(mesh)
        }
        this.scene.add(this.cards)
    }


}