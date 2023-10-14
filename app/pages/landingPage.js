import { getCurrentArtist, setCurrentArtist } from "../globals.js"

export function initLandingPage() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => {

        const artistsSelect = document.querySelector('#artists')
    
        artistsSelect.innerHTML = ''
        artistsSelect.innerHTML = '<option  value="">Select Artist</option>'
        
        data.forEach(user => {
            artistsSelect.innerHTML += `<option value="${user.name}">${user.name}</option>`
        })
    
        artistsSelect.addEventListener('change', function (event) {
            let selectedArtist = event.currentTarget.value
            sessionStorage.setItem('artist', selectedArtist)
            setCurrentArtist(selectedArtist)
            location.hash = '#artist'
        })
        
       
          
    })
    

        const joinAsVisitor = document.querySelector('.visitor ')

        joinAsVisitor.addEventListener('click', function () {
            location.hash = '#visitor'
        })
        

}
