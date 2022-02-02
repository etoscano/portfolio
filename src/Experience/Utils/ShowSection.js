
export default class ShowSection
{
    constructor()
    {
        this.contacts = document.querySelector('.contacts')
        this.home = document.querySelector('.home')
        this.projects = document.querySelector('.projects')

    }
    
    showProjects(){
        // Hide other sections
        if(this.contacts){
            this.contacts.children[0].classList.remove("contacts__card--visible")
        }

        if(this.home){
            this.home.children[0].classList.remove("name--visible")
        }
                
        if(this.projects){
            this.projects.children[0].classList.add("projects__section--visible")
        }

        console.log("projects")
    }    
    showContacts(){
        if(this.contacts){
            this.contacts.children[0].classList.add("contacts__card--visible")
        }

        if(this.home){
            this.home.children[0].classList.remove("name--visible")
        }

        if(this.projects){
            this.projects.children[0].classList.remove("projects__section--visible")
        }

        console.log("contacts")        
    }    
    showHome(){
        // Hide other sections
        if(this.contacts){
            this.contacts.children[0].classList.remove("contacts__card--visible")
        }

        if(this.home){
            this.home.children[0].classList.add("name--visible")
        }

        if(this.projects){
            this.projects.children[0].classList.remove("projects__section--visible")
        }

        console.log("home")        
    }
    
    showSection(section){
    if(section == "#"){
        this.showHome()
        
    }else if(section == "#projects"){
        this.showProjects()

    }else if(section == "#contacts"){
        this.showContacts()
    }

    }
}