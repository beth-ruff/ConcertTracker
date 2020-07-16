const BASE_URL = 'http://localhost:3000'
const main = document.querySelector('#main')

window.addEventListener('load', () => {
    getVenues()
})

function getVenues() {
    clearForm()
    main.innerHTML = ""
    fetch(BASE_URL+'/venues')
    .then(resp => resp.json())
    .then(venues => {
        main.innerHTML += venues.map(venue => `
            <li>
                <a href='#' data-id='${venue.id}'>${venue.name}</a>
                <button id="delete" data-id='${venue.id}'>Delete</button>
                <button id="update-venue" data-id='${venue.id}'>Edit</button>
            </li>
        `).join('')

        attachClickToLinks()
    })
}

function clearForm() {
    let venueFormDiv = document.getElementById('venue-form')
    venueFormDiv.innerHTML = ""
}

function attachClickToLinks() {
    let links = document.querySelectorAll('li a')
    links.forEach(li => {
        li.addEventListener('click', displayVenue)
    })
    document.getElementById('venue-Form').addEventListener('click', displayCreateForm)
    document.getElementById('venues').addEventListener('click', getVenues)
    document.querySelectorAll('#delete').forEach(venue => venue.addEventListener('click', removeVenue))
    document.querySelectorAll('#update-venue').forEach(venue => venue.addEventListener('click', editVenue))
}

function displayVenue(){
    clearForm()
    let id = event.target.dataset.id 
    main.innerHTML = ""
    fetch(BASE_URL+'/venues/'+id)
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

function createVenue() {
    event.preventDefault()
    let venue = {
        name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        phone_number: document.getElementById('phone_number').value 
    }
    fetch(BASE_URL+'/venues', {
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
        <a href='*' data-id='${venue.id}'>${venue.name}</a>
        </li>
        `
    attachClickToLinks()
    clearForm()
    })
}

function removeVenue() {
    event.preventDefault()
    clearForm()
    let id = event.target.dataset.id
    fetch(BASE_URL+'/venues/'+id, {
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
}