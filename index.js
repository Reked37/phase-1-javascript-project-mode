//fetch db.json
fetch('http://localhost:3000/quotes')
.then(res => res.json())
.then(data => data.forEach(quote => createQuote(quote)))

//Puts all the quotes onto the html
function createQuote(quote) {
    const creatediv = document.createElement('li')
    const quoteContainer = document.querySelector('#quote-container-list')
    // console.log(quoteContainer)
    creatediv.innerHTML = `
            ${quote.quote}<br>
            -${quote.author}<br>
            <i>${quote.source}</i><br>
            <br>
        `
    quoteContainer.appendChild(creatediv)
}

//Highlight a word
document.querySelector('#quote-container-list').addEventListener('click', (e) => {
    e.preventDefault
    const clickedElement = e.target
    if (clickedElement.nodeName === 'SPAN') {
        console.log('highlighted')
        return clickedElement.classList.toggle('highlight')
    }
    else{
        const selectedText = window.getSelection().toString()
        console.log(selectedText)
        if(selectedText !==""){
            const highlightText= "<span class='highlight'>"+selectedText+"</span>"
            const newHTML = document.querySelector('#quote-container-list').innerHTML.replace(selectedText, highlightText)
            return document.querySelector('#quote-container-list').innerHTML=newHTML
        }
    }

})
    


//Add a quote to the Top 5 List
document.addEventListener('keydown', (event) => {
    const keyChar= event.key
    if (keyChar === '1') {
        const valueOfOne = mouseOver()
        console.log(1)
    } else if (keyChar === '2') {
        mouseOver()
        console.log(2)
    } else if (keyChar === '3') {
        mouseOver()
        console.log(3)
    } else if (keyChar === '4') {
        mouseOver()
        console.log(4)
    } else if (keyChar === '5') {
        mouseOver()
        console.log(5)
    }
})

function mouseOver() {
    document.querySelector('#quote-container-list').addEventListener('mouseover', (e) => {
        let arr=[e.target.textContent]
        for(i=0; i<arr.length;i++){
            const words = arr[i]
            console.log('Words:', words)
            return words
        }
    })
}

//Add a quote to the list
document.querySelector('.quote-form').addEventListener('submit',handleQuote)

function handleQuote(e){
    e.preventDefault()
    let quoteObj = {
        quote: document.querySelector('#addQuote').value,
        author: document.querySelector('#addAuthor').value,
        source: document.querySelector('#addSource').value
    }
    console.log(quoteObj)
    createQuote(quoteObj)
    //postNewQuote(quoteObj)
    document.querySelector('#addQuote').value= ""
    document.querySelector('#addAuthor').value = ""
    document.querySelector('#addSource').value = ""
}

function postNewQuote(quoteObj){
    fetch('http://localhost:3000/quotes',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(quoteObj)
    })
    .then((res=>res.json()))
    .then((data)=>createQuote(data))
}


