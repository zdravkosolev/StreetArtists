
import { getLocalStorageItems, editLocalStorageItems } from "../globals.js";





let items = getLocalStorageItems()
const auctionNoLiveCardDiv = document.querySelector("#auctionNoLiveCardDiv");
const auctionLiveContainerDiv = document.querySelector("#auctionLiveContainerDiv");


const auctionCard = document.querySelector("#auctionCard")
const auctionBidBtn = document.querySelector("#auctionBidBtn");
const auctionLivePrice = document.querySelector("#auctionLivePrice");
const auctionHistoryUl = document.querySelector("#auctionHistoryUl");
const auctionBidDiv = document.querySelector("#auctionBidDiv")

let auctionInput = document.querySelector("#biddingInput");
let timerTag = document.querySelector("#timer")
let livePrice = localStorage.getItem("AuctPrice")


const auctCardMaker = (parent, el) => {
  parent.innerHTML = `<div id="auctionCardDiv">
                <div>
                <img src=${el?.image}/>
                </div>
    <div  id="auctionCardInfoDiv">
          <div>
            <h2>${el?.artist}</h2>
            <p>${el?.dateCreated}</p>
          </div>
          <h3 id="aucTitle">${el?.title}</h3>
          <p>${el?.description}</p>
    </div>
  </div>`
};

const timerConverter = (sec)=> {
  const seconds = sec;
  const minutes = Math.floor(seconds/60);
  const remainingSeconds = seconds % 60;
  const timeString = `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`

  return timeString
}
let timeConverted = localStorage?.getItem("auctTimer")





export function initAuctionPage(){

let auctionItem = items.find((el) => el.isAuctioning === true);
  if(auctionItem === undefined){
    auctionLiveContainerDiv.style.display = "none"
    auctionNoLiveCardDiv.style.display = "block"
  }
  else{
    auctionLiveContainerDiv.style.display = "block"
    auctionNoLiveCardDiv.style.display = "none"

    auctionLivePrice.innerText = `Current Price is: ${livePrice}$`;
    auctionInput.min = livePrice;
    auctionInput.value = livePrice;


    let auctTimerInterval = setInterval(() => {
      if(timeConverted <= 1){
        auctionItem.isAuctioning = false;
        auctionItem.dateSold = new Date().toLocaleDateString();
        auctionItem.priceSold = +livePrice;
        editLocalStorageItems(items);
        location.reload();
        auctionHistoryUl.innerHTML = "";
        clearInterval(auctTimerInterval)
      }
      timeConverted -= 1;
      localStorage.setItem("auctTimer", timeConverted);
      timerTag.innerText = timerConverter(timeConverted) + "s"
    }, 1000);

    auctCardMaker(auctionCard, auctionItem)
  }
  
  auctionBidBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if(+auctionInput.value <= livePrice || +auctionInput.value === ""){
      return
    }
    livePrice = auctionInput.value;
    timeConverted += 10;
    localStorage.setItem("AuctPrice", livePrice);
    auctionHistoryUl.innerHTML += `<li>My Price is: $${livePrice}</li>`;
    const formData = new FormData();
    formData.set("amount", auctionInput.value);
    fetch("https://projects.brainster.tech/bidding/api", {
      method: "POST",
      body: formData
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.bidAmount !== null){
        localStorage.setItem("AuctPrice", data.bidAmount);
        auctionLivePrice.textContent = ` Current Price is: ${data.bidAmount}$` ;
        auctionHistoryUl.innerHTML +=`<li>Guest Price is: $${data.bidAmount}</li>`;
        livePrice = data.bidAmount;
        auctionInput.min = livePrice
      }
      if(data.isBidding === false){
        auctionBidBtn.setAttribute("disabled", true);
        auctionBidBtn.style.opacity = "0.5";
        auctionInput.placeholder = "You won the Auction!!!";
      }
    })
    auctionLivePrice.innerText = `Item is sold for: $${livePrice}`;
    auctionInput.min = livePrice;
    auctionInput.value = ""
  })
}