import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'
import Sea from './Sea.js'
import People from './People.js'
import Door from './Door.js'
import Cards from './Cards.js'
import Buildings from './Buildings.js'
import Lime from './Lime.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.sea = new Sea()
            // this.people = new People()
            // this.cards = new Cards()
            this.Buildings = new Buildings()
            // this.door = new Door()
            // this.floor = new Floor()
            // this.lime = new Lime()
            // this.fox = new Fox()
            this.environment = new Environment()
        })
    }

    removeFog()
    {
        if(this.environment)
            this.environment.removeFog()
    }

    restoreFog()
    {
        if(this.environment)
            this.environment.restoreFog()
    }

    hideFloor(){
        if(this.floor){
            this.floor.hideFloor()
        }
    }

    showFloor(){
        if(this.floor){
            this.floor.showFloor()
        }
    }

    moveToCenter(flag = false){
        if(this.people){
            this.people.moveToCenter(flag)
        }
    }
    putInCircle(){
        if(this.people){
            this.people.putInCircle()
        }
    }


    hideCards(){
        if(this.cards){
            this.cards.hideCards()
        }
    }

    showCards(){
        if(this.cards){
            this.cards.showCards()
        }
    }

    update()
    {
        if(this.fox)
            this.fox.update()

        if(this.sea)
            this.sea.update()

        if(this.lime)
            this.lime.update()

        if(this.cards)
            this.cards.update()
    }
}