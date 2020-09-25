const baseURL = 'https://developer.nps.gov/api/v1';
const key = 'aVaKQGdwfxUJg0jYUsfle3uPmoLi5w7qgKVfB5ZD';
//Example request using authentication key: https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=aVaKQGdwfxUJg0jYUsfle3uPmoLi5w7qgKVfB5ZD
let url;

// Search Form
const stateCode = document.getElementById('stateCode');
const userZip = document.getElementById('userZip');
const searchBtn = document.getElementById('find-site');

// Results Form
const parkName = document.getElementById('parkName');
//const parkAddress = document.getElementById('parkAddress');
const openDates = document.getElementById('openDates');
const contact = document.getElementById('contact');
const fees = document.getElementById('fees');
const totalSites = document.getElementById('totalSites');
const description = document.getElementById('description');
const siteImage = document.querySelector('.siteImage');
const nav = document.querySelector('nav');
const lastBtn = document.getElementById('lastSite');
const nextBtn = document.getElementById('nextSite');

searchBtn.addEventListener('click', fetchResults);
lastBtn.addEventListener('click', lastSite);
nextBtn.addEventListener('click', nextSite);

let pageNumber = 1;

nav.style.display = 'none';

function fetchResults(e){
    e.preventDefault();
    //console.log('clicked');
    if(stateCode.value !== ''){
        url = baseURL + "/campgrounds?stateCode=" + stateCode + "&start=" + pageNumber + "&limit=1&api_key=" + key;
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
    totalSites.innerText = current.campsites.totalSites
    contact.innerText = current.contacts.emailAddresses[0].emailAddress;
    description.innerText = current.description;
    let siteImg = document.createElement('img');
    siteImg.src = current.images[0].url;
    
    nav.style.display = '';
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