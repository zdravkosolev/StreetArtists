
import { itemTypes } from "../../data/data.js";
import { visitorHeader } from "../globals.js"
import { initAItemsPage } from "../pages/artistItemsPage.js"
import { getLocalStorageItems, editLocalStorageItems } from "../globals.js";
let items = getLocalStorageItems()
export function onLoadVisitorListingPage(){
  visitorHeader()

  document.querySelector("body").style.backgroundColor = "#EDD5BB"
document.querySelector("#hammerIcon").style.display = "block"
document.querySelector("#NavLogoImg").style.display = "block"
  const publishedItems = items.filter(item => item.isPublished)
  const itemsContainer = document.querySelector('#loadVisitorListingContainer')

  const title = ''
  const artist = ''
  const minPrice = ''
  const maxPrice = ''
  const type = ''


  const filtered = publishedItems.filter(
      (item) =>
          (title ? item.title.includes(title) : true) &&
          (artist ? item.artist === artist : true) &&
          (minPrice ? item.price >= minPrice : true) &&
          (maxPrice ? item.price <= maxPrice : true) &&
          (type ? item.type === type : true)
  )

  itemsContainer.innerHTML = ''
  filtered.forEach(({ image, title, description, price, artist }) => {

      itemsContainer.innerHTML += `<div class="card">
      <img src="${image}" class="card-img-top" alt="...">
      <div class="card-body">
      <p class="card-text card-artist">${artist}</p>
        <h5 class="card-title card-title-styles">${title}</h5>
        <p class="card-text card-text-style">${description}</p>
        <a href="#" class="btn btn-primary btn-properties"><span class="btn-text">$${price}</span></a>
      </div>
    </div>`
  })
}

window.addEventListener('load', onLoadVisitorListingPage)


export function initVisitorListingPage() {

document.querySelector("body").style.backgroundColor = "#EDD5BB"
document.querySelector("#hammerIcon").style.display = "block"
document.querySelector("#NavLogoImg").style.display = "block"
const publishedItems = items.filter(item => item.isPublished)
const itemsContainer = document.querySelector('#visitorListingContainer')

const filterBtn = document.querySelector("#filterBtn")
filterBtn.addEventListener('click', ()=>{
   document.querySelector("#visitorListingContainer").style.display = "none";
   document.querySelector("#filterBtn").style.display = "none"
   document.querySelector("#loadVisitorListingContainer").style.display = "none"
   document.querySelector("#filterPage").classList.add('show');
})
const xBtn = document.querySelector(".fa-x")
xBtn.addEventListener("click", function(){
  document.querySelector("#visitorListingContainer").style.display = "block";
  document.querySelector("#filterBtn").style.display = "block"
  document.querySelector("#filterPage").classList.remove("show")
})
const filterBtnChecked = document.querySelector("#filterBtnChecked");
filterBtnChecked.addEventListener('click', () => {

  document.querySelector("#visitorListingContainer").style.display = "block";
  document.querySelector("#filterBtn").style.display = "block"
  document.querySelector("#filterPage").classList.remove("show")

})


let formArtistselect = function selectArtist(){
  fetch('https://jsonplaceholder.typicode.com/users')
  .then(res => res.json())
  .then(data => {
    const selectedArtist = document.querySelector("#selectArtist")
    selectedArtist.innerHTML = ''
    selectedArtist.innerHTML = '<option  value="">Select Artist</option>'
    
    data.forEach(user => {
      selectedArtist.innerHTML += `<option  value="${user.name}">${user.name}</option>`
    })
  })
}
formArtistselect()

const formType = document.querySelector("#selectType")


formType.innerHTML = ''
formType.innerHTML = '<option  value="">Select Type</option>'
itemTypes.forEach((el) => {
  formType.innerHTML +=`<option>${el}</option>`
})

filterBtnChecked.addEventListener('click',()=>{

  const titleInfo = document.querySelector("#itemTitle")
  const artistInfo = document.querySelector("#selectArtist")
  const minPriceEntered = document.querySelector("#minPrice")
  const maxPriceEntered = document.querySelector("#maxPrice")
  const selectedType = document.querySelector("#selectType")
  


const title = titleInfo.value
const artist = artistInfo.value
const minPrice = minPriceEntered.value
const maxPrice = maxPriceEntered.value
const type = selectedType.value



const filtered = publishedItems.filter(
  (item) =>
      (title ? item.title.includes(title) : true) &&
      (artist ? item.artist === artist : true) &&
      (minPrice ? item.price >= minPrice : true) &&
      (maxPrice ? item.price <= maxPrice : true) &&
      (type ? item.type === type : true)
)


itemsContainer.innerHTML = ''
filtered.forEach(({ image, title, description, price, artist }) => {
    itemsContainer.innerHTML += `<div class="card">
    <img src="${image}" class="card-img-top" alt="...">
    <div class="card-body">
    <p class="card-text card-artist">${artist}</p>
      <h5 class="card-title card-title-styles">${title}</h5>
      <p class="card-text card-text-style">${description}</p>
      <a href="#" class="btn btn-primary btn-properties"><span class="btn-text">$${price}</span></a>
    </div>
  </div>`
 
})
})  
}


