const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgError = document.querySelector('#message-1')
const msgTemperature = document.querySelector('#message-2')
const msgAddress = document.querySelector('#message-3')
const msgTimezone = document.querySelector('#message-4')

const url = '/weather?address='

weatherForm.addEventListener('submit' ,(e)=>{
    e.preventDefault()

    const location = search.value

    // console.log(location)
    // console.log(url)

    msgError.textContent = 'Loading...'
    msgTemperature.textContent = ''
    msgAddress.textContent = ''
    msgTimezone.textContent = ''

    fetch(url+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
                msgError.textContent = data.error
            }else{
                msgTemperature.textContent = data.forecast + " " + data.temperature + ". Highest Temperature on this day is " + data.highTemperature + " : Low Temperature on this day is " + data.lowTemperature
                msgTimezone.textContent = data.timezone  
                msgAddress.textContent = data.address
                msgError.textContent = ''
                
                // console.log(data.forecast)
                // console.log(data.timezone)
                // console.log(data.address)
                // console.log(data.temperature)
            }
        })
    })
})