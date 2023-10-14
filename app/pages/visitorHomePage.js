
import {visitorHeader} from "../globals.js"
import { getLocalStorageItems, editLocalStorageItems } from "../globals.js";

let items = getLocalStorageItems()
export function visitorHomePage(){

  visitorHeader()
    const scrollPrimary = document.querySelector("#scrollPrimary");

const scrollSecondary = document.querySelector("#scrollSecondary");
const publishedItems = items.filter(item => item.isPublished)
const title = ''
console.log(publishedItems)
   
    const imageFilter = publishedItems.filter(
        (item) =>
            (title ? item.title.includes(title) : true))


scrollPrimary.innerHTML = ""
imageFilter.forEach(({image, title})=>{
    scrollPrimary.innerHTML += `<div class="slide-loop_itemImage "><img src="${image}" class="primary" alt="..." id="myImage"></div>`
})
    scrollSecondary.innerHTML = ""
imageFilter.forEach(({image, title})=>{
    scrollSecondary.innerHTML += `<div class="slide-loop_itemImage "><img src="${image}" class="secondary" alt="..." id="myImage"></div>`
})

const slideImages = document.querySelectorAll('.slide-loop_itemImage');

slideImages.forEach(image => {
  image.addEventListener('mouseover', () => {
    const primaryImg = image.querySelector('.primary');
    primaryImg.style.transform = 'scale(1.1)';
    primaryImg.style.transition = 'transform 0.5s ease-in-out';
  });
  image.addEventListener('mouseout', () => {
    const primaryImg = image.querySelector('.primary');
    primaryImg.style.transform = 'scale(1)';
    primaryImg.style.transition = 'transform 0.5s ease-in-out';
  });
  image.addEventListener('mouseover', () => {
    const secondaryImg = image.querySelector('.secondary');
    secondaryImg.style.transform = 'scale(1.1)';
    secondaryImg.style.transition = 'transform 0.5s ease-in-out';
  });
  image.addEventListener('mouseout', () => {
    const secondaryImg = image.querySelector('.secondary');
    secondaryImg.style.transform = 'scale(1)';
    secondaryImg.style.transition = 'transform 0.5s ease-in-out';
  });

  
image.addEventListener('click', () => {
  window.location.hash = 'visitorListing';
});
});

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove('active');
  }
  slides[index].classList.add('active');
}

function nextSlide() {
  currentSlide++;
    
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }
  showSlide(currentSlide);
}

const nextBtn = document.querySelector('#slide-arrow-prev');
const prevBtn = document.querySelector('#slide-arrow-next');

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);
showSlide(0);


const btnFindMasterpiece = document.querySelector(".btn-masterpiece")

btnFindMasterpiece.addEventListener("click", ()=>{
  window.location.hash = "visitorListing";
})
}


