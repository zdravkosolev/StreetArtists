let currentArtist

export function setCurrentArtist(artist) {
    currentArtist = artist
}


export function getCurrentArtist() {
    return sessionStorage.getItem('artist')
    
}


export const editLocalStorageItems = (items) => {
    localStorage.removeItem("items");
    localStorage.setItem("items", JSON.stringify(items))
};

export const getLocalStorageItems = () => {
    return JSON.parse(localStorage.getItem("items"))
}

const hamburgerMenu = document.querySelector("#hamburgerIcon"),
        imgLogoTag = document.querySelector("#navLogo"),
        headerTtitle = document.querySelector("#headTitle"),
        hammerIconMain = document.querySelector("#auctionMenuBtn"),
        dropDownMenu = document.querySelector("#dropDownMenu");

        export const visitorHeader = () => {
            if(location.hash[1] === "v"){
                imgLogoTag.href = "";
                imgLogoTag.href += "#visitor"
            }
            hamburgerMenu.style.display = "none";
            imgLogoTag.style.display = "block";
            headerTtitle.innerText = "Street ARTist";
            hammerIconMain.style.display = "block"
        };

        export const artistHeader = () => {
            if(location.hash[1] === "a"){
                imgLogoTag.href = "";
                imgLogoTag.href = "#artist"
            }
            headerTtitle.innerText = getCurrentArtist()
            hamburgerMenu.style.display = "block"

            
        }

        



export const toggleMenu = function() {
  dropDownMenu.classList.toggle("d-block");
};
 

hamburgerMenu.addEventListener("click", toggleMenu);

       