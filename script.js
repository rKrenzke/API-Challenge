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

searchBtn.addEventListener('click', fetchResults);


function fetchResults(e){
    e.preventDefault();
    //console.log('clicked');
    if(stateCode.value !== ''){
        url = baseURL + "/campgrounds?stateCode=" + stateCode + "&limit=10&api_key=" + key;
    }
    
    fetch(url)
        .then(result => {return result.json()})
        .then(json => {
            console.log(json)
            displayResults(json);
        });
}

function displayResults(json){
    //console.log(json.data[3].campsites.totalSites);
    parkName.innerText = json.data[3].name;
    totalSites.innerText = json.data[3].campsites.totalSites;
    contact.innerText = json.data[3].contacts.emailAddresses[0].emailAddress;
    description.innerText = json.data[3].description;
}