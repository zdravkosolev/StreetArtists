import { initArtistHomePage } from "./pages/artistHomePage.js"
import { initLandingPage } from "./pages/landingPage.js"
import { initVisitorListingPage } from "./pages/visitorListingPage.js"
import { onLoadVisitorListingPage } from "./pages/visitorListingPage.js"
import { visitorHomePage } from "./pages/visitorHomePage.js"
import { initAItemsPage} from "./pages/artistItemsPage.js"
import {stopStream} from "./pages/artistItemsPage.js"
import { initAuctionPage } from "./pages/auctionPage.js"

function handleRoute() {
    const hash = location.hash === '' ? '#landingPage' : location.hash

    const allPages = document.querySelectorAll('.page')
    allPages.forEach(page => page.style.display = 'none')
    document.querySelector(hash).style.display = 'block'


    if(hash !== '#artistCaptureImage'){
        stopStream()
    }

    switch (hash) {
        case '#landingPage':
            initLandingPage()
            break;

        case '#artist':
            initArtistHomePage()
            
            break;

        case '#visitorListing':
            onLoadVisitorListingPage()
            initVisitorListingPage()
            break;
        
        case '#visitor':
            visitorHomePage()
            break

            case '#artistItemsPage':
                initAItemsPage()
                break
           

        // case '#artistCaptureImage':
        //     initCaptureImage()
        //     break;

         case '#auctionPage':
                initAuctionPage()
                break;

        default:
            break;
    }   

}

// attach event listeners
window.addEventListener('hashchange', handleRoute)
window.addEventListener('load', handleRoute)

