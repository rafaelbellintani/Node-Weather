window.onload = function() {
    const searchForm = document.querySelector('form')
    const searchValue = document.querySelector('input')
    const messageOne = document.querySelector('#message-1')
    const messageTwo = document.querySelector('#message-2')

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault()   
        messageOne.textContent = "Loading weather..."
        messageTwo.textContent = ''
        fetch('/weather?address='+searchValue.value).then((response)=>{
            response.json().then((data)=>{
                console.log(data)
            if(data.error){
                messageOne.textContent = ''
                messageTwo.textContent = data.error
            }else{
                messageOne.textContent = ''
                messageTwo.textContent = data.forecast + ' on ' + data.location + ". The temperature is " + data.temperature + "ºC"
            }
            })
        })
    })
}
