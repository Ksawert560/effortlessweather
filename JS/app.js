const weatherCardSpace = document.querySelector('.weather-space')



let weather = {
    apiKey: "b171478e631f236f8a5be26c1db4a521",
}
async function fetchWeather(weatherLocation, number){
    await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${weatherLocation}&units=metric&appid=${weather.apiKey}`
        ).then((res) => res.json()).then((data) => displayWeather(data, number))
}
async function displayWeather(data, number){
    const {name} = data;
    const {description, icon} = data.weather[0]
    const {temp, humidity, feels_like, temp_min, temp_max, pressure} = data.main
    const {speed} = data.wind
    createElement(name, description, icon, temp, humidity, feels_like, temp_max, temp_min, pressure, speed, number)
    
}

function createElement(name, description, icon, temp, humidity, feels_like, temp_max, temp_min, pressure, speed, number){
    const card = document.createElement('div')
    card.className = 'card weatherCard';
    const cardHeader = document.createElement('div');
    cardHeader.className = 'divHeader'
    const cardHeaderIcons = document.createElement('div')
    const cardMain = document.createElement('div');
    cardMain.className = 'divMain'
        const cardMainOne = document.createElement('div')
        cardMainOne.classList = 'cardMainOne'
        const cardMainTwo = document.createElement('div')
        cardMainTwo.classList = 'cardMainTwo'
    const cardFooter = document.createElement('div');
    cardFooter.className = 'divFooter'

    
    const weatherIcon = document.createElement('img');
    weatherIcon.src = `https://openweathermap.org/img/wn/${icon}.png`;
    
    const locationTemp = document.createElement('span')
    locationTemp.className = 'temp'
    locationTemp.innerText = `${temp}℃`
    
    const locationFeelsLike = document.createElement('span')
    locationFeelsLike.className = 'feelsLike'
    locationFeelsLike.innerText = `Feels like: ${feels_like}℃`
    
    const locationTempMin = document.createElement('span')
    locationTempMin.className = 'tempMin'
    locationTempMin.innerText = `Temp min: ${temp_min}℃`
    
    const locationTempMax = document.createElement('span')
    locationTempMax.className = 'tempMax'
    locationTempMax.innerText = `Temp max: ${temp_max}℃`
    
    const locationDescription = document.createElement('span')
    locationDescription.innerText = description
    
    const locationName = document.createElement('span')
    locationName.id = 'locationName'
    locationName.innerText = name

    const locationHumidity = document.createElement('span')
    locationHumidity.innerHTML = `<i class="fa-solid fa-droplet"></i> ${humidity}%`
    
    const locationWindSpeed = document.createElement('span')
    locationWindSpeed.innerHTML = `<i class="fa-solid fa-wind"></i> ${speed} km/h`
    
    const locationPressure = document.createElement('span')
    locationPressure.innerHTML = `<i class="fa-solid fa-temperature-three-quarters"></i> ${pressure} mbar`

    const trashIcon = document.createElement('i')
    trashIcon.className="fa-solid fa-trash";
    trashIcon.id = number;
    trash(trashIcon);

    
    const gripIcon = document.createElement('i')
    gripIcon.className='fa-solid fa-grip-vertical';
    const starIcon = document.createElement('i')
    starIcon.className='fa-regular fa-star'
    starIcon.id=number;
    important(starIcon, card, name, number)
    
    cardHeader.appendChild(locationName)
    cardHeaderIcons.appendChild(starIcon)
    cardHeaderIcons.appendChild(trashIcon)
    cardHeaderIcons.appendChild(gripIcon)
    cardHeader.appendChild(cardHeaderIcons)
    cardMainOne.appendChild(weatherIcon)
    cardMainOne.appendChild(locationDescription)
    cardMainTwo.appendChild(locationTemp)
    cardMainTwo.appendChild(locationFeelsLike)
    cardMainTwo.appendChild(locationTempMin)
    cardMainTwo.appendChild(locationTempMax)
    cardMain.appendChild(cardMainOne)
    cardMain.appendChild(cardMainTwo)
    cardFooter.appendChild(locationHumidity)
    cardFooter.appendChild(locationWindSpeed)
    cardFooter.appendChild(locationPressure)
    
    card.appendChild(cardHeader)
    card.appendChild(cardMain)
    card.appendChild(cardFooter)
    
    
    weatherCardSpace.appendChild(card)

    
}

let locations = [];
let locationsDel = false;
let weatherLocation = {
    location: '',
    id: '',
    important: false,
}
let counter = 0


if(localStorage.getItem('locations')==null){
    localStorage.clear()
    locations=[];
    counter=0
    locationsDel="false"
}else{
    locations = JSON.parse(localStorage.getItem('locations'));
    locationsDel = localStorage.getItem('delete')
}

if(locationsDel=="true"){
    let helpVar = locations[locations.length-1][1]
    counter=helpVar+1
}else if(locationsDel=="med"){
    counter=locations.length+1
}
else{
    counter=locations.length
}

for(let i=0; i<locations.length; i++){
    fetchWeather(locations[i][0], locations[i][1])

}


function trash(icon){
    icon.addEventListener('click', function(){
        let target = 0
        for(let i=0; i<locations.length; i++){
            for(let j=0; j<locations[i].length; j++){
                if(locations[i][1]==icon.id){
                    target=i
                }
            }
        }
        locations.splice(target, 1)
        localStorage.setItem('locations', JSON.stringify(locations))

        if(locations.length>1){
            locationsDel = true;
            localStorage.setItem('delete', locationsDel);
        }
        else if(locations.length==1){
            locationsDel = "med";
            localStorage.setItem('delete', locationsDel);
        }
        else{
            locationsDel = false;
            localStorage.setItem('delete', locationsDel);
        }
        
        location.reload()
    })
}

function important(icon, card, name, number){
    let target = icon.id
    for(let i=0; i<locations.length; i++){
        if(locations[i][1]==target && locations[i][2]==true){
            icon.className='fa-solid fa-star'
            card.style.color='var(--background)'
            card.style.background = 'var(--accentColor)'
        }
    }
    icon.addEventListener('click', function(){
        if(icon.className=='fa-regular fa-star'){
            for(let i=0; i<locations.length; i++){
                if(locations[i][1]==icon.id){
                    locations[i][2]=true;
                }   
            }
        }else{
            for(let i=0; i<locations.length; i++){
                for(let j=0; j<locations[i].length; j++){
                    if(locations[i][1]==icon.id){
                        locations[i][2]=false;
                    }
                }
            }
        }

        localStorage.setItem('locations', JSON.stringify(locations))
        location.reload()
    })
}


const addLocationBtn = document.querySelector('#addLocation');

const locationInputDiv = document.querySelector('#locationInputDiv'),
        cancelBtn = locationInputDiv.querySelector('#cancelBtn'),
        addBtn = locationInputDiv.querySelector('#addLocationBtn'),
        locationName = locationInputDiv.querySelector('#locationName');

addLocationBtn.addEventListener('click', function(){
    locationInputDiv.style.visibility= "visible"
})
cancelBtn.addEventListener('click', function(){
    locationInputDiv.style.visibility= "hidden"
})
addBtn.addEventListener('click', function(){
    let name = locationName.value;
    let firstLetter = name.charAt(0)
    let firstLetterCap = firstLetter.toUpperCase()
    let remainingLetters = name.slice(1).toLowerCase()
    let word = firstLetterCap+remainingLetters
    weatherLocation.location = word
    weatherLocation.id = counter

    locations.push(Object.values(weatherLocation));
    localStorage.setItem('locations', JSON.stringify(locations))
    locationInputDiv.style.visibility= "hidden";
    locationName.value = ''
    fetchWeather(weatherLocation.location)
    counter++;
    location.reload()
})
