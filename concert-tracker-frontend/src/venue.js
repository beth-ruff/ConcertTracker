class Venue {
    constructor(venue) {
        this.id = venue.id 
        this.name = venue.name
        this.address = venue.address
        this.phone_number = venue.phone_number
        this.concerts = venue.concerts
        // array.push(this)
    }

    // static array = []

    renderVenue() {
        return `
                <li id="venueLi-${this.id}">
                <a href='#' data-id='${this.id}'>${this.name}</a>
                <button id="add-concert" data-id="${this.id}">Add Concert</button>
                <button id="update-venue" data-id='${this.id}'>Edit</button>
                <button id="delete-venue" data-id="${this.id}">Delete</button>
                <button id="sort-concert" data-id="${this.id}">Sort Concerts</button>
                <ol id="concerts-ol"></ol>
                </li>
                `
    }

    renderConcerts() {
        let ol = document.querySelector(`#venueLi-${this.id} #concerts-ol`)
        // let btn = document.createElement("BUTTON");
        // ol.appendChild(btn);
        // btn.innerHTML = "Sort Concerts";
        // btn.id = "sort-concert";
        // btn.dataset.id=`${this.id}`;
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