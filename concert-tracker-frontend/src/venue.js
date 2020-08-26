class Venue {
    constructor(venue) {
        this.id = venue.id 
        this.name = venue.name
        this.address = venue.address
        this.phone_number = venue.phone_number
        this.concerts = venue.concerts
        Venue.array.push(this)
    }

    renderVenue() {
        return `<div class="card mb-4 shadow-sm" id="venueLi-${this.id}">
                    <div class="card-header">
                        <a href='#' data-id='${this.id}' class="my-0 font-weight-normal">${this.name}</a><br>
                        <button class="btn btn-light btn-sm" id="add-concert" data-id="${this.id}">Add Concert</button>
                        <button class="btn btn-light btn-sm" id="update-venue" data-id='${this.id}'>Edit</button>
                        <button class="btn btn-light btn-sm" id="delete-venue" data-id="${this.id}">Delete</button>
                    </div>
                    <div class="card-body">
                        <ul id="concerts-ol" class="list-unstyled mt-3 mb-4"></ul>
                    </div>
                </div>
                `
    }

    renderConcerts() {
        let ul = document.querySelector(`#venueLi-${this.id} #concerts-ol`)
        this.concerts.forEach(concert => {
            ul.innerHTML += `
                <li id="concert-${concert.id}">
                <small>${concert.artist} - ${concert.date}</small>
                <button class="btn btn-light btn-sm" id="delete-concert" data-id="${concert.id}">X</button>
                </li>
                `
        })
    }

}

Venue.array = [];