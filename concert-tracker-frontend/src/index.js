const BASE_URL = 'http://localhost:3000'
const VENUES_URL = `${BASE_URL}/venues/`
const CONCERTS_URL = `${BASE_URL}/concerts/`
const main = document.querySelector('#main')

window.addEventListener('load', () => {
    getVenues()
})

function attachClickToLinks() {
    let venueLinks = document.querySelectorAll('div li a')
    let concertLinks = document.querySelectorAll('div ul li a')
    venueLinks.forEach(li => {
        li.addEventListener('click', displayVenue)
    })
    concertLinks.forEach(li => {
        li.addEventListener('click', displayConcert)
    })
    document.getElementById('venue-Form').addEventListener('click', displayCreateForm)
    document.getElementById('venues').addEventListener('click', getVenues)
    document.querySelectorAll('#delete').forEach(venue => venue.addEventListener('click', removeVenue))
    document.querySelectorAll('#update-venue').forEach(venue => venue.addEventListener('click', editVenue))
    document.querySelectorAll('#add-concert').forEach(concert => concert.addEventListener('click', addConcertForm))
    document.querySelectorAll('#update-concert').forEach(concert => concert.addEventListener('click', editConcert))
}

function getVenues() {
    clearForm()
    main.innerHTML = ""
    fetch(VENUES_URL)
    .then(resp => resp.json())
    .then(venues => {
        venues.forEach(venue => {
            let concertString = ""
            venue.concerts.forEach(concert => {
                let newConcert = new Concert(concert)
                newConcert.renderConcert()
                // concertString += `
                // <li>
                // <a href='#' data-id='${concert.id}'>${concert.artist}</a>
                // <button id="delete" data-id="${concert.id}">Delete</button>
                // <button id="update-concert" data-concert-id='${concert.id}'>Edit</button>
                // </li>
                // `
            })
            main.innerHTML += `
            <li>
                <a href='#' data-id='${venue.id}'>${venue.name}</a>
                <button id="delete" data-id='${venue.id}'>Delete</button>
                <button id="update-venue" data-id='${venue.id}'>Edit</button>
                <button id="add-concert" data-id="${venue.id}">Add Concert</button>
            </li>
            <ul>${concertString}</ul>
            `
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

function displayConcert() {
    clearForm()
    let id = event.target.dataset.id
    main.innerHTML = ""
    fetch(CONCERTS_URL+id)
    .then(resp => resp.json())
    .then(concert => {
        main.innerHTML += `
        <h3>${concert.artist}</h3>
        <p><strong>Date:</strong> ${concert.date}</p>
        <p><strong>Time</strong>: ${concert.time}</p>
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
    fetch(VENUES_URL, {
        method: "POST",
        body: JSON.stringify(venue),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }) 
    .then(resp => resp.json())
    .then(venue => {
        document.querySelector('#main').innerHTML += `
        <li>
            <a href='#' data-id='${venue.id}'>${venue.name}</a>
            <button id="delete" data-id='${venue.id}'>Delete</button>
            <button id="update-venue" data-id='${venue.id}'>Edit</button>
        </li>
        `
    attachClickToLinks()
    clearForm()
    })
}

function addConcertForm() {
    let id = event.target.dataset.id
    let concertFormDiv = document.querySelector(`#add-concert[data-id="${id}"]`)
    let html = `
        <form>
            <label>Artist</label>
            <input type="text" id="artist">
            <label>Date:</label>
            <input type="date" id="date">
            <label>Time:</label>
            <input type="time" id="time">
            <input type="submit">
        </form>
    `
    concertFormDiv.innerHTML = html 
    document.querySelector('form').addEventListener('submit', createConcert)
}

function clearConcertForm() {
    let concertFormDiv = document.getElementById('add-concert')
    concertFormDiv.innerHTML = ""
}

function createConcert() {
    event.preventDefault()
    let concert = {
        artist: document.getElementById('artist').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value 
    }
    fetch(CONCERTS_URL, {
        method: "POST",
        body: JSON.stringify(concert),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }) 
    .then(resp => resp.json())
    .then(concert => {
        document.querySelector('#main').innerHTML += `
        <ul>
            <a href='#' data-id='${concert.id}'>${concert.artist}</a>
            <button id="delete" data-id='${concert.id}'>Delete</button>
            <button id="update-venue" data-id='${concert.id}'>Edit</button>
        </ul>
        `
    attachClickToLinks()
    clearForm()
    })
}

function removeVenue() {
    event.preventDefault()
    clearForm()
    let id = event.target.dataset.id
    fetch(VENUES_URL+id, {
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
    .then(venue => {
        document.querySelector(`li a[data-id="${id}"]`).parentElement.innerHTML= `
            <a href='#' data-id='${venue.id}'>${venue.name}</a>
            <button id="delete" data-id='${venue.id}'>Delete</button>
            <button id="update-venue" data-id='${venue.id}'>Edit</button>
        `
        attachClickToLinks()
        clearForm()
    })
}