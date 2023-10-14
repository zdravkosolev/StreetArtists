
import {visitorHeader,toggleMenu, getLocalStorageItems, editLocalStorageItems} from"../globals.js"
import {artistHeader} from "../globals.js"


export function initArtistHomePage() {
   let items = getLocalStorageItems()
artistHeader()
toggleMenu()
  

const headTitle = document.querySelector("#headTitle")
headTitle.innerHTML = ''
const autorTitle = sessionStorage.getItem('artist')
   
headTitle.innerHTML = autorTitle
headTitle.style.fontSize = "30px"


const currentArtist = autorTitle

 function hideShowMenu (){
   const hammerMenu = document.querySelector("#hammerIcon");
   const hamburgerMenu = document.querySelector("#hamburgerIcon");
   const hash1 = window.location.hash = "artist"
   
   if(hash1 === true){
      hammerMenu.style.display = "none"
      hamburgerMenu.style.display = "block"
   }
   else{
      hammerMenu.style.display = "none"
      hamburgerMenu.style.display = "block"
   }
}
hideShowMenu()


const itemsByArtist = items.filter(item => item.artist === currentArtist)

const soldItems = itemsByArtist.filter(item => Boolean(item.dateSold))


const soldItemsParagraph = document.querySelector("#soldItems")
soldItemsParagraph.innerHTML = `${soldItems.length}/${itemsByArtist.length}`
const sum = soldItems.reduce((acc, item) => acc + item.priceSold, 0)
const totalIncome = document.querySelector("#totalIncome")
totalIncome.innerHTML = `$${sum}`

const liveAuctionDiv = document.querySelector(".live-auction");
let auctionItem = items.find((el) => el.isAuctioning === true);
if(auctionItem === undefined){
   
   liveAuctionDiv.style.display = "none"
}else {
   liveAuctionDiv.style.display = "block";
   const liveAuctionBid = document.querySelector("#liveAuctionBid");
const liveItemPrice = localStorage.getItem("AuctPrice")
liveAuctionBid.innerHTML = `${liveItemPrice}$`
}

editLocalStorageItems(items)


const ctx = document.getElementById('myChart');

const myChart = new Chart(ctx, {
   type: 'bar',
   data: {
      labels: generateLabels(7),
      datasets: [{
         label: 'amount',
         data: [],
         backgroundColor: ['rgba(100, 0, 0, 1)',],
         borderWidth: 1
      }]
   },
   options: {
      indexAxis: 'y',
     
   }
});


const last7 = document.querySelector('#last7')
const last14 = document.querySelector('#last14')
const last30 = document.querySelector('#last30')

last7.addEventListener('click', function () {
   const labels = generateLabels(7)

   myChart.data.labels = labels

   const newDate = labels.map(label => {
      let sum = 0

      soldItems.forEach(item => {
         if (label === formatDate(item.dateSold)) {
            sum = sum + item.priceSold
         }
      })

      return sum
   })

   myChart.data.datasets[0].data = newDate

   myChart.update()

})

last14.addEventListener('click', function () {
   const labels = generateLabels(14)

   myChart.data.labels = labels

   const newDate = labels.map(label => {
      let sum = 0

      soldItems.forEach(item => {
         if (label === formatDate(item.dateSold)) {
            sum = sum + item.priceSold
         }
      })

      return sum
   })

   myChart.data.datasets[0].data = newDate

   myChart.update()

})

last30.addEventListener('click', function () {
   const labels = generateLabels(30)

   myChart.data.labels = labels

   const newDate = labels.map(label => {
      let sum = 0

      soldItems.forEach(item => {
         if (label === formatDate(item.dateSold)) {
            sum = sum + item.priceSold
         }
      })

      return sum
   })

   myChart.data.datasets[0].data = newDate

   myChart.update()

})



function generateLabels(daysAgo) {


const arr = []

for (let i = 0; i < daysAgo; i++) {
   const start = new Date()

   const startDate = start.getDate()

   const currentDate = start.setDate(startDate - i)

   const formattedDate = formatDate(currentDate)

   arr.push(formattedDate)
console.log(formattedDate)
}

return arr
}

function formatDate(date) {
return new Date(date).toLocaleDateString('en-gb')
}




}