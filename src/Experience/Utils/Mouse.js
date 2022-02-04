import * as THREE from 'three'
import EventEmitter from './EventEmitter.js'

export default class Mouse extends EventEmitter
{
    constructor(sizes)
    {
        super()

        // Setup
        this.instance = new THREE.Vector2()

        window.addEventListener('mousemove', (event) =>
        {
            this.instance.x = event.clientX / sizes.width * 2 - 1
            this.instance.y = - (event.clientY / sizes.height) * 2 + 1

            this.trigger('mousemove')
        })
    }
}