class Concert {
    constructor(concert) {
        this.artist = concert.artist
        this.date = concert.date 
        this.time = concert.time 
    }

    renderConcert() {
        return `
                <li>
                <a href='#' data-id='${this.id}'>${this.artist}</a>
                <button id="delete" data-id="${this.id}">Delete</button>
                <button id="update-concert" data-concert-id='${this.id}'>Edit</button>
                </li>
                `
    }

}


