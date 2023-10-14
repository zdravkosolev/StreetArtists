import { itemTypes} from "../../data/data.js";
import{initLandingPage} from"../pages/landingPage.js";
import {artistHeader, editLocalStorageItems, getLocalStorageItems, toggleMenu} from"../globals.js";




artistHeader()
toggleMenu()

let items = getLocalStorageItems()

class ArtistNewItem {
  constructor(
    title,
    type, 
    isPublished,
    price,
    image, 
    description,
    isAuctioning,
    dateSold,
    priceSold
  )
  {
    this.id = new Date().valueOf();
    this.artist = sessionStorage.getItem("artist");
    this.dateCreated = new Date().toLocaleDateString();
    this.title = title;
    this.type = type;
    this.isPublished = isPublished;
    this.price = +price;
    this.image = image;
    this.description = description;
    this.isAuctioning = isAuctioning;
    this.dateSold = dateSold;
    this.priceSold = priceSold;
  }
  setAuctioning(Boolean){
    this.isAuctioning = Boolean
  }
  setDateSold(dateSold){
    this.dateSold = dateSold
  }
  setPriceSold(priceSold){
    this.priceSold = +priceSold
  }
}
const addNewItemForm = document.querySelector("#addNewItemForm"),
addNewItemTitle = document.querySelector("#addInputTitle"),
addNewItemDesc = document.querySelector("#addNewItemDesc"),
addNewItemType = document.querySelector("#addInputType"),
addNewItemImageUrl = document.querySelector("#addInputImageUrl"),
addNewItemPrice = document.querySelector("#addInputPrice"),
addNewCameraDivOuter = document.querySelector(".addNewItemCameraDivOuter"),
addNewItemCloseBtn = document.querySelector("#addNewItemCloseBtn"),
captureImageBtn = document.querySelector("#captureImageBtn"),
liveStream = document.querySelector("#liveStream"),
liveCaptureCanvas = document.querySelector("#liveCaptureCanvas"),
addNewCheckBox = document.querySelector("#checkBoxPublished"),
addImageToItemPage = document.querySelector("#addImageToItemPage");
let capturedImageImg = document.querySelector("#capturedImage"),
addNewItemBtn = document.querySelector("#addNewItemBtn"),
allErrorFields = document.querySelectorAll(".error"),
NewCameraDiv = document.querySelector("#NewCameraDiv");



const itemMaker = (parent, el) =>{
  el.dateCreated = el.dateCreated.substring(0, 10);

  parent.innerHTML += `<div id="item-${el.id}" class="artistItemCard ">
      <div class="artistItemCardImg">
        <img src=${el.image} class="card-img-top">
      </div>
      <div class="artistItemCardTitleDiv px-3 pt-1">
        <div class="pb-0 mt-2">
          <h4 class="card-title card-title-styles">${el.title}</h4>
          <p class="artistItemDate">${el.dateCreated}</p>
          <span class="artistItemCardPrice">$${el.price}</span>
        </div>
        
        
        
      </div>
      <div class="artistItemCardDesc">
      <p class="card-text card-text-style px-3 pb-3">${el.description}</p>
      </div>
      <div class="artistItemCardBtnDiv">
        <button class="artistItemCardAuctBtn sendToAuctionBtn">Send to Auction</button>
        <button class="artistItemCardUnpublishBtn"></button>
        <button type="button" class="artistItemCardRemoveBtn" data-toggle="modal" data-target="#aItem${el.id}">Remove</button>
        <div class="modal fade" id="aItem${el.id}" tabindex="-1" role="dialog"  aria-labelledby="aItem${el.id}" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header text-center">
                <p class="modal-title" id="aItem${el.id}">Are you sure to remove this item ??</p>
               
              </div>
              <div class="modal-body d-flex justify-content-between">
                <button type="button" class ="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" data-dismiss="modal" class="btn btn-danger aModalDeleteItemBtn">Remove</button>
              </div>
            </div>
          </div>
        </div>
        <button class="artistItemCardEditBtn">Edit</button>
      </div>
  </div>`
}
const inputValidation = (
  input,
  message = "Please fill out the field above"
)=>{
  input.value = input.value.trim();
  if(input.value === ""){
    input.nextElementSibling.innerText = message;
    return false
  }else{
    return true;
  }
}


export const initAItemsPage = () => {
 
  const addNewInnerDiv = document.querySelector("#addNewInnerDiv"),
        allItemsContainer = document.querySelector("#allItemsContainer"),
        addNewItemContainer = document.querySelector("#addNewItemContainer"),
        addNewItemCameraDiv = document.querySelector("#addNewItemCameraDiv"),
        addNewItemDiv = document.querySelector("#addNewItemDiv"),
        artist = sessionStorage.getItem("artist");
  
        addNewInnerDiv.addEventListener("click", ()=>{
          addNewItemBtn.innerText = "Add new item";
          addNewItemContainer.style.display = "none";
          allItemsContainer.style.display = "none";
          addNewItemDiv.style.display = "block";
          addNewItemDiv.style.backgroundColor = "#A26A5E"
        });
  
          
  
          addNewItemType.innerHTML = "";
          addNewItemType.innerHTML = '<option value="">Select</option>';
  
          itemTypes.forEach((el) => {
            addNewItemType.innerHTML += `<option value="${el}">${el}</option>`;
          });
          let findedEl;
          const populateItemsInContainer = () => {
            let allArtistItems = items.filter((el) => el.artist === artist);
            console.log(allArtistItems)
            allArtistItems.forEach((el,index) => {
              itemMaker(allItemsContainer, el);
             
              const artistItemCardAuctBtnAll = document.querySelectorAll(".artistItemCardAuctBtn"),
                  artistItemCardPublishBtnAll = document.querySelectorAll(".artistItemCardUnpublishBtn");
  
  
                  if(el.isAuctioning){
                    artistItemCardAuctBtnAll[index].setAttribute("disabled", true);
                    artistItemCardAuctBtnAll[index].style.opacity = "0.5";
                  }
                  if(el.isPublished){
                    artistItemCardPublishBtnAll[index].innerText = "Unpublish";
                  } else {
                    artistItemCardPublishBtnAll[index].innerText = "Publish";
                    artistItemCardPublishBtnAll[index].style.backgroundColor = "white";
                    artistItemCardPublishBtnAll[index].style.color = "black"
                  }
            });
            const artistItemCardAuctBtnAll = document.querySelectorAll(".artistItemCardAuctBtn"),
                artistItemCardPublishBtnAll = document.querySelectorAll(".artistItemCardUnpublishBtn"),
                artistItemCardEditBtn = document.querySelectorAll(".artistItemCardEditBtn"),
                artistItemCardRemoveBtn = document.querySelectorAll(".artistItemCardRemoveBtn");
  

                artistItemCardAuctBtnAll.forEach((el) => {
                  el.addEventListener("click", (e) => {
                    const artistItemCardAuctBtnAll = document.querySelectorAll(".artistItemCardAuctBtn");

                    const takenClickedItemId = e.target.closest(`[id]`).id,
                          splitedId = +takenClickedItemId.split("-")[1],
                          findedEl = allArtistItems.find((el) => splitedId === el.id);
                    
                    findedEl.isAuctioning = true;
                    editLocalStorageItems(items);
                    localStorage.setItem("AuctPrice", Math.ceil(findedEl.price / 2));
                    localStorage.setItem("auctTimer", 120);
                    artistItemCardAuctBtnAll.forEach((el) => {
                      el.setAttribute("disabled", true);
                      el.style.opacity = "0.5"
                    });
                      location.hash = "auctionPage";
                      location.reload()
                  })
                })
               
  
                artistItemCardPublishBtnAll.forEach((el, index) => {
                  el.addEventListener("click", (e) => {
                    let buttonTextUn = e.target.innerText === "Unpublish";
                    const takenClickedItemId = e.target.closest('[id]').id,
                        splitedId = +takenClickedItemId.split("-")[1];                        
                        const findedEl = allArtistItems.find((el) => splitedId === el.id);
                        console.log(findedEl)
                        if(buttonTextUn){
                          findedEl.isPublished = false;
                          e.target.innerText = "Publish";
                          artistItemCardPublishBtnAll[index].style.backgroundColor = "white";
                          artistItemCardPublishBtnAll[index].style.color = "black"
                        }else {
                          findedEl.isPublished = true;
                          e.target.innerText = "Unpublish";
                          artistItemCardPublishBtnAll[index].style.backgroundColor = "#1bac6f";
                          artistItemCardPublishBtnAll[index].style.color = "white";
                        }
                        editLocalStorageItems(items)
                  });
                });
  
                const aModalDeleteItemBtn = document.querySelectorAll(".aModalDeleteItemBtn");
              
  
                let clickedDeleteId;
                artistItemCardRemoveBtn.forEach((el) => {
                  el.addEventListener("click", (e) => {
                    clickedDeleteId = e.target.closest('[id]').id
                      console.log(clickedDeleteId)
                  });
                });
                let artistItemCard = document.querySelectorAll(".artistItemCard");
                aModalDeleteItemBtn.forEach((el) => {
                  el.addEventListener("click", () => {
                    let splitedId = +clickedDeleteId.split("-")[1];
                    let findedEl = items.find((el) => splitedId === el.id);
                    let index = items.indexOf(findedEl);
                    items.splice(index, 1);
                    let findedItemDom = Array.from(artistItemCard).find((el) => el.id === clickedDeleteId);
                    findedItemDom.remove()
                    editLocalStorageItems(items)
                  });
                });
  
              
                  
                artistItemCardEditBtn.forEach((el) => {
                  el.addEventListener("click", (e) => {
                    let clickedParentId = e.target.closest(`[id]`).id,
                      numberIdTaken = +clickedParentId.split("-")[1];                      
                    
                      addNewItemContainer.style.display = "none";
                      allItemsContainer.style.display = "none";
                      addNewItemDiv.style.display = "block";
                      findedEl = allArtistItems.find((el) => el.id ===numberIdTaken);
                      addNewItemTitle.value = findedEl.title;
                      addNewItemDesc.value = findedEl.description;
                      addNewItemType.value = findedEl.type;
                      addNewItemImageUrl.value = findedEl.image;
                      addNewItemPrice.value = findedEl.price;
                     
                      addNewItemBtn.innerText = "Edit Item"
                     
                  });
                  editLocalStorageItems(items)
                });
          };
  
          populateItemsInContainer();
  
          addNewItemBtn.addEventListener("click", (e)=>{
            e.preventDefault();
            
            allErrorFields.forEach((el) => {
              initLandingPage.innerText = ""
            });
            if(
              !inputValidation(addNewItemType) ||
              !inputValidation(addNewItemPrice) ||
              !inputValidation(addNewItemTitle)
            ){
              return;
            }
            const hasimageUrl = addNewItemImageUrl.value !== "";
            const hasLiveImage = capturedImageImg.src.length > 50;
  
            if(!hasimageUrl && !hasLiveImage){
              addNewItemImageUrl.nextElementSibling.innerText = "Please enter a URL or take a picture";
              return;
            }
            if(e.target.innerText == "Edit Item"){
              findedEl.title = addNewItemTitle.value;
              findedEl.description = addNewItemDesc.value;
              findedEl.type = addNewItemType.value;
              findedEl.image = addNewItemImageUrl.value || capturedImageImg.scr;
              findedEl.price = addNewItemPrice.value;
              findedEl.isPublished = addNewCheckBox.checked;
                      }else{
                        let newItemCurrentlyCreated = new ArtistNewItem(
                          addNewItemTitle.value,
                          addNewItemType.value,
                          addNewCheckBox.checked,
                          addNewItemPrice.value,
                          addNewItemImageUrl.value || capturedImageImg.src,
                          addNewItemDesc.value
                        );
                        items.push(newItemCurrentlyCreated);
                        addNewItemForm.reset();
                        capturedImageImg.src = "";
                       
  
                      }
  
                      allItemsContainer.innerHTML = "";
                      populateItemsInContainer();
                      addNewItemDiv.style.display = "none";
                      addNewItemContainer.style.display = "block";
                      allItemsContainer.style.display = "block";
                      
                    
                      capturedImageImg.src = "";
          });

                    editLocalStorageItems(items)

          addNewItemCloseBtn.addEventListener("click", () => {
            addNewItemContainer.style.display = "block";
            allItemsContainer.style.display = "block";
            addNewItemDiv.style.display = "none";
            addNewItemForm.reset();
            capturedImageImg.src = "";
            
            
          })
           
          
          const trashCan = document.querySelector(".fa-trash-can")
  addNewCameraDivOuter.addEventListener("click", (e)=>{
   
    addNewItemContainer.style.display = "none";
    addNewItemDiv.style.display= "none";
    NewCameraDiv.style.display = "block";

    navigator
      .mediaDevices
      .getUserMedia({
        video: {
          facingMode: { ideal: "environment"},
        },
      })
      .then(stream =>{
          liveStream.srcObject = stream

        
      })

   })

   liveStream.addEventListener("canplay", function(){
               liveCaptureCanvas.width = liveStream.videoWidth
            liveCaptureCanvas.height = liveStream.videoHeight
             })


   captureImageBtn.addEventListener("click", function(){
    captureImageBtn.style.display = "none";
    liveStream.style.display = "none";
    addImageToItemPage.style.display = "none";
    liveCaptureCanvas.style.display = "block";
    addImageToItemPage.style.display = "block"
    const ctx = liveCaptureCanvas.getContext("2d")

    ctx.drawImage(liveStream, 0, 0)



    const imageDataUrl = liveCaptureCanvas.toDataURL("image/png")

    addImageToItemPage.addEventListener("click", function(){
      capturedImageImg.src = imageDataUrl
      const cameraIcon = document.querySelector(".fa-camera");
      const takeSnapshotParagraph =document.querySelector("#takeSnapshotParagraph")
      cameraIcon.style.display="none";
      trashCan.style.display = "none";
      addImageToItemPage.style.display = "none";
      takeSnapshotParagraph.style.display = "none";
      addNewItemContainer.style.display = "none";
      addNewItemDiv.style.display= "block";
      addNewCameraDivOuter.style.display = "none";
       NewCameraDiv.style.display = "none";
       stopStream()
    })

   

  })
  trashCan.addEventListener("click", function(){
    liveStream.style.display = "block";
    liveCaptureCanvas.style.display = "none";
    captureImageBtn.style.display = "block";
    addImageToItemPage.style.display = "none"
  })

  
  }
 
  
 export function stopStream() {
    const stream = liveStream.srcObject
    const allTracks = stream?.getTracks()
    allTracks?.forEach((track) => {
      track.stop()
    })
  }
  
  
  
