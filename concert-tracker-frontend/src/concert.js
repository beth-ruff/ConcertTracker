class Concert {
    constructor(concert) {
        this.id = concert.id
        this.artist = concert.artist
        this.date = concert.date 
        this.time = concert.time 
        this.venue_id = concert.venue.id
    }

    renderConcert() {
         return `
                <li id="concert-${this.id}">
                ${this.artist} - ${this.date}
                <button id="delete-concert" data-id="${this.id}">Delete</button>
                </li>
                `
    }

}


