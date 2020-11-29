const weatherForm = document.querySelector('form');
const searchLocation = document.querySelector('input');
const locationDisplay = document.querySelector('.location')
const temperature = document.querySelector('.temp')
const weatherStatus = document.querySelector('.weatherStatus')
const dateDisplay = document.querySelector('.date')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchLocation.value;

    locationDisplay.textContent = 'Loading...'
    weatherStatus.textContent = ''

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            locationDisplay.textContent = data.error
        } else {
            locationDisplay.textContent = data.location
            temperature.textContent = data.temperature
            weatherStatus.textContent = data.weatherStatus
        }

        dateBuilder = () => {
            let d = new Date();
            let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      
            let date = d.getDate();
            let day = days[d.getDay()];
            let month = months[d.getMonth()];
            let year = d.getFullYear();
      
            return `${day} ${date} ${month}, ${year}`;
      
        }
        dateDisplay.textContent = dateBuilder()
    })
})

})