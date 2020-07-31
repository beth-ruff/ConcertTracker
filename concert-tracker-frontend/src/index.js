const BASE_URL = 'http://localhost:3000'
const VENUES_URL = `${BASE_URL}/venues/`
const CONCERTS_URL = `${BASE_URL}/concerts/`
const main = document.querySelector('#main')

window.addEventListener('load', () => {
    getVenues()
})

function attachClickToLinks() {
    let venueLinks = document.querySelectorAll('div li a')
    venueLinks.forEach(li => {
        li.addEventListener('click', displayVenue)
    })
    document.getElementById('venue-Form').addEventListener('click', displayCreateForm)
    document.getElementById('venues').addEventListener('click', getVenues)
    document.querySelectorAll('#delete-venue').forEach(venue => venue.addEventListener('click', removeVenue))
    document.querySelectorAll('#update-venue').forEach(venue => venue.addEventListener('click', editVenue))
    document.querySelectorAll('#add-concert').forEach(concert => concert.addEventListener('click', addConcertForm))
    document.querySelectorAll('#delete-concert').forEach(concert => concert.addEventListener('click', removeConcert))
    document.querySelectorAll('#sort-concert').forEach(venue => venue.addEventListener('click', sortConcerts))
}

function sortConcerts() {
    let id = event.target.dataset.id
    let concerts = document.querySelectorAll(`#venueLi-${id} ol li`)
    let concertsOl = document.querySelector(`#venueLi-${id} ol`)
    let concertsArr = Array.from(concerts);
    // concertsArr.sort(function(a, b) {
    //         if (a.innerHTML < b.innerHTML) {
    //             return -1;
    //         }
    //         if (a.innerHTML > b.innerHTML) {
    //             return 1;
    //         }
    // for (i = 0; i < concertsArr.length; ++i) {
    //     venue.appendChild(concertsArr[i]);
    // }
    concertsArr.sort((a, b) => a.innerHTML > b.innerHTML ? 1 : -1 ).forEach(li => concertsOl.appendChild(li))
}

function getVenues() {
    clearForm()
    main.innerHTML = ""
    fetch(BASE_URL+"/venues")
    .then(resp => resp.json())
    .then(venues => {
        venues.forEach(venue => {
            let v = new Venue(venue)
            main.innerHTML += v.renderVenue()
            v.renderConcerts()
        })
        attachClickToLinks()
    })
}

function displayVenue(){
    clearForm()
    let id = event.target.dataset.id 
    main.innerHTML = ""
    fetch(VENUES_URL+id)
    .then(resp => resp.json())
    .then(venue => {
        main.innerHTML += `
        <h3>${venue.name}</h3>
        <p><strong>Address:</strong> ${venue.address}</p>
        <p><strong>Phone Number</strong>: ${venue.phone_number}</p>
        `
    })
}

function displayCreateForm(){
    let venueFormDiv = document.getElementById('venue-form')
    let html = `
        <form>
            <label>Name</label>
            <input type="text" id="name">
            <label>Address:</label>
            <input type="text" id="address">
            <label>Phone Number:</label>
            <input type="text" id="phone_number">
            <input type="submit">
        </form>
    `
    venueFormDiv.innerHTML = html 
    document.querySelector('form').addEventListener('submit', createVenue)
}

function clearForm() {
    let venueFormDiv = document.getElementById('venue-form')
    venueFormDiv.innerHTML = ""
}

function createVenue() {
    event.preventDefault()
    let venue = {
        name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        phone_number: document.getElementById('phone_number').value 
    }
    new Venue(venue)
    fetch(VENUES_URL, {
        method: "POST",
        body: JSON.stringify(venue),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }) 
    .then(resp => resp.json())
    .then(data => getVenues())
    attachClickToLinks()
    clearForm()
}

function addConcertForm() {
    let concertForm = document.getElementById('concert-form')
    let venueId = Number(event.target.dataset.id)
    let html = `
        <form>
            <label>Artist</label>
            <input type="text" id="artist">
            <label>Date:</label>
            <input type="date" id="date">
            <label>Time:</label>
            <input type="time" id="time">
            <input type="hidden" id="venue_id" value="${venueId}">
            <input type="submit">
        </form>
    `
    concertForm.innerHTML = html 
    document.querySelector('form').addEventListener('submit', createConcert)
}

function clearConcertForm() {
    let concertFormDiv = document.getElementById('concert-form')
    concertFormDiv.innerHTML = ""
}

function createConcert() {
    event.preventDefault()
    const concert = {
        artist: document.getElementById('artist').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        venue_id: document.getElementById('venue_id').value,
    }
    fetch(BASE_URL+"/concerts", {
        method: "POST",
        body: JSON.stringify(concert),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }) 
    .then(resp => resp.json())
    .then(concert => {
        let c = new Concert(concert)
        let concertsOl = document.querySelector(`#venueLi-${concert.venue.id} #concerts-ol`)
        concertsOl.innerHTML += c.renderConcert()
    attachClickToLinks()
    clearConcertForm()
    })
}

function removeVenue() {
    event.preventDefault()
    clearForm()
    let id = event.target.dataset.id
    fetch(BASE_URL+`/venues/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(event.target.parentElement.remove())
}

function removeConcert() {
    event.preventDefault()
    clearConcertForm()
    let id = event.target.dataset.id 
    fetch(BASE_URL+`/concerts/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(event.target.parentElement.remove())
}

function editVenue() {
    event.preventDefault()
    clearForm()
    let id = event.target.dataset.id 
    fetch(VENUES_URL+id)
    .then(resp => resp.json())
    .then(venue => {
        let venueFormDiv = document.getElementById('venue-form')
        let html = `
            <form data-id="${id}">
                <label>Name</label>
                <input type="text" id="name" value="${venue.name}">
                <label>Address:</label>
                <input type="text" id="address" value="${venue.address}">
                <label>Phone Number:</label>
                <input type="text" id="phone_number" value="${venue.phone_number}">
                <input type="submit">
            </form>
            `
        venueFormDiv.innerHTML = html 
        document.querySelector('form').addEventListener('submit', updateVenue)
    })
}

function updateVenue() {
    event.preventDefault()
    let id = event.target.dataset.id 
    const venue = {
        name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        phone_number: document.getElementById('phone_number').value
    }
    fetch(VENUES_URL+id, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(venue)
    })
    .then(resp => resp.json())
    .then(data => getVenues());
}