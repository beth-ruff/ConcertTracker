class Venue {
    constructor(venue) {
        this.id = venue.id 
        this.name = venue.name
        this.address = venue.address
        this.phone_number = venue.phone_number
        this.concerts = venue.concerts
    }

    renderVenue() {
        return `
                <li id="venueLi-${this.id}">
                <a href='#' data-id='${this.id}'>${this.name}</a>
                <button id="add-concert" data-id="${this.id}">Add Concert</button>
                <button id="update-venue" data-id='${this.id}'>Edit</button>
                <button id="delete-venue" data-id="${this.id}">Delete</button>
                <ol id="concerts-ol"></ol>
                </li>
                `
    }

    renderConcerts() {
        let ol = document.querySelector(`#venueLi-${this.id} #concerts-ol`)
        this.concerts.forEach(concert => {
            ol.innerHTML += `
                <li id="concert-${concert.id}">
                ${concert.artist} - ${concert.date}
                <button id="delete-concert" data-id="${concert.id}">Delete</button>
                </li>
                `
        })
    }

}