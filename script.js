const baseURL = 'https://developer.nps.gov/api/v1';
const key = 'aVaKQGdwfxUJg0jYUsfle3uPmoLi5w7qgKVfB5ZD';
//Example request using authentication key: https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=aVaKQGdwfxUJg0jYUsfle3uPmoLi5w7qgKVfB5ZD
let url;

// Search Form
const stateCode = document.getElementById('stateCode');
const userZip = document.getElementById('userZip');
const searchBtn = document.getElementById('find-site');
const wrapper = document.querySelector('.wrapper');

// Results Form
const parkName = document.getElementById('parkName');
const openDates = document.getElementById('openDates');
const contact = document.getElementById('contact');
const fees = document.getElementById('fees');
const totalSites = document.getElementById('totalSites');
const description = document.getElementById('description');
const siteImage = document.querySelector('.siteImage');
const nav = document.querySelector('nav');
const lastBtn = document.getElementById('lastSite');
const nextBtn = document.getElementById('nextSite');
const reserveBtn = document.getElementById('reserveLink');
const reservation = document.querySelector('.reserve');
const results = document.querySelector('.results');

searchBtn.addEventListener('click', fetchResults);
lastBtn.addEventListener('click', lastSite);
nextBtn.addEventListener('click', nextSite);

let pageNumber = 1;

reservation.style.display = 'none';
results.style.display = 'none';

function fetchResults(e){
    e.preventDefault();
    //console.log('test');
    let state_Code = stateCode.value;
    if(stateCode.value !== ''){
        url = baseURL + "/campgrounds?stateCode=" + state_Code + "&start=" + pageNumber + "&limit=1&api_key=" + key;
    }
    
    fetch(url)
        .then(result => {return result.json()})
        .then(json => {
            console.log(json)
            displayResults(json);
        });
}

function displayResults(json){
    while(siteImage.firstChild){
        siteImage.removeChild(siteImage.firstChild);
    }

    let allSites = json.data;

    for(let i = 0; i < allSites.length; i++){
    let current = allSites[i];
    parkName.innerText = current.name;
    openDates.innerText = current.operatingHours[0].description;
    totalSites.innerText = current.campsites.totalSites;
    contact.innerText = current.contacts.emailAddresses[0].emailAddress;
    
    if(current.fees.length == 0){
        fees.innerText = 'Site fee information not available';
    } else{
        let totalFee = current.fees[0].cost;
        fees.innerText = '$' + parseFloat(totalFee);
    }

    description.innerText = current.description;
    
    if(current.reservationUrl !== '' || current.reservationUrl !== null){
    reserveBtn.href = current.reservationUrl;
    reserveBtn.innerText = 'Plan Your Visit!';
    reservation.style.display = '';
    } else{
        reservation.style.display = 'none';
        reserveBtn.style.display = 'none';
    };

    let siteImg = document.createElement('img');

    
    if(current.images.length == 0){
        siteImg.src = './assets/imageNotFound.png';
        siteImg.style.width = '250px';
        siteImg.style.height = '230px';
    } else{
        siteImg.src = current.images[0].url;
    }

    wrapper.style.width = '1000px';
    nav.style.display = '';
    results.style.display = '';
    
    siteImage.appendChild(siteImg);
    }
};



function nextSite(e){
    pageNumber++;
    fetchResults(e);
};

function lastSite(e){
    if(pageNumber > 0){
        pageNumber--;
    } else{
        return;
    }
    fetchResults(e);
};