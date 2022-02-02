import * as THREE from 'three'
import Experience from '../Experience.js'
import gsap from 'gsap'

// import waterVertexShader from './shaders/water/vertex.glsl'
// import waterFragmentShader from './shaders/water/fragment.glsl'

export default class People
{
    constructor()
    {
        this.experience = new Experience()
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('people')
        }

        // Resource
        this.resource = this.resources.items.peopleModel
        this.model = this.resource.scene.children[0].children[0].children[0].children[0]

        this.num = 100

        this.setModel()
        // this.setMaterial()
        // this.setMesh()
    }

    setModel()
    {
        this.people = new THREE.Group()
        this.people.position.set(0,0,0)

        this.putInCircle(true)

        this.scene.add(this.people)
    }

    moveToCenter(moveAround= false){
        console.log("moveToCenter: moveAround " + moveAround)
        var i = 0 
        // var num = 100 //281 same as above
        var radius = 3.5

        this.people.traverse((child) =>
        {
            var moveAroundRadius = 1
            var outer = moveAround ? moveAroundRadius: 0
            if(child instanceof THREE.Mesh)
            {
                var angle = Math.PI * 2 / this.num * i
                var rX = Math.sin(angle) * radius * (Math.random() + outer)
                var rZ = Math.cos(angle) * radius * (Math.random() + outer)
                gsap.to(child.position, { duration: 2, delay: 0.3, x: rX, y: 0, z: rZ})
                i++
            }
        })
    }

    putInCircle( addToGroup = false){
        console.log("putInCircle: addToGroup " + addToGroup)
        var i = 0 
        // var num = 100 //281 same as above
        var radius = 4

        var group = addToGroup ? this.model : this.people
        group.traverse((child) =>
        {
            if(child instanceof THREE.Mesh ){
                var vX = Math.sin(Math.PI * 2 / this.num * i) * radius
                var vZ = Math.cos(Math.PI * 2 / this.num * i) * radius

                // ADDED THE FIRST TIME
                if(addToGroup){
                    if( i < this.num && child.name != "Plane_Material_0"){
                        child.rotation.x = - Math.PI * 0.5
                        child.position.x = vX
                        child.position.z = vZ
                        this.people.add(child)
                        i++
                    }
                }
                // JUST MOVED
                else{
                    gsap.to(child.position, { duration: 2, delay: 0.3, x: vX, y: 0, z: vZ})
                    i++
                }
            }
        })
    }

    // setMaterial()
    // {
    //     // Material
    //     this.material = new THREE.ShaderMaterial({
    //         vertexShader: this.resources.items.waterVertexShader,
    //         fragmentShader: this.resources.items.waterFragmentShader,
    //         uniforms:
    //         {
    //             uTime: { value: 0 },
                
    //             uBigWavesElevation: { value: 0.2 },
    //             uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
    //             uBigWavesSpeed: { value: 0.75 },

    //             uSmallWavesElevation: { value: 0.15 },
    //             uSmallWavesFrequency: { value: 3 },
    //             uSmallWavesSpeed: { value: 0.2 },
    //             uSmallIterations: { value: 4 },

    //             uDepthColor: { value: new THREE.Color(this.debugObject.depthColor) },
    //             uSurfaceColor: { value: new THREE.Color(this.debugObject.surfaceColor) },
    //             uColorOffset: { value: 0.08 },
    //             uColorMultiplier: { value: 5 }
    //         }
    //     })

    //     if(this.debug.active)
    //     {
    //         this.debugFolder.add(this.material.uniforms.uBigWavesElevation, 'value').min(0).max(1).step(0.001).name('uBigWavesElevation')
    //         this.debugFolder.add(this.material.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.001).name('uBigWavesFrequencyX')
    //         this.debugFolder.add(this.material.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.001).name('uBigWavesFrequencyY')
    //         this.debugFolder.add(this.material.uniforms.uBigWavesSpeed, 'value').min(0).max(4).step(0.001).name('uBigWavesSpeed')

    //         this.debugFolder.add(this.material.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name('uSmallWavesElevation')
    //         this.debugFolder.add(this.material.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.001).name('uSmallWavesFrequency')
    //         this.debugFolder.add(this.material.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed')
    //         this.debugFolder.add(this.material.uniforms.uSmallIterations, 'value').min(0).max(5).step(1).name('uSmallIterations')

    //         this.debugFolder.add(this.material.uniforms.uColorOffset, 'value').min(0).max(1).step(0.001).name('uColorOffset')
    //         this.debugFolder.add(this.material.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.001).name('uColorMultiplier')
    //     }
    // }

    // setMesh()
    // {
    //     this.mesh = new THREE.Mesh(this.geometry, this.material)
    //     this.mesh.rotation.x = - Math.PI * 0.5
    //     // this.mesh.receiveShadow = true
    //     this.scene.add(this.mesh)
    // }


    update(){
        // Water
        // this.material.uniforms.uTime.value = this.time.elapsed * 0.001
    }
}