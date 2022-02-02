import EventEmitter from './EventEmitter.js'

export default class PageManager extends EventEmitter
{
    constructor()
    {
        super()
        
        this.currentPage = ""
        console.log("PageManager")

        document.getElementById("header").addEventListener("click", manageSections);

        var self = this
        function manageSections(event) {
            if(event.target.href){
                var hash = event.target.href.split("#")[1];

                if(! (self.currentPage === hash) ){
                    switch (hash) {
                        case 'projects':
                            self.trigger('cameraProjects')
                            break;
                        case 'contacts':
                            self.trigger('cameraUp')
                            break;
                        case '':
                            self.trigger('cameraDown')
                            break;
                    }
                    self.currentPage = hash
                }
            }
        }
        

    }


    setCurrentPage(page){
        this.currentPage = page
    }
}