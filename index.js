//fetch db.json
let quotes;
fetch('http://localhost:3000/quotes')
.then(res => res.json())
.then(data => data.forEach(quote => {
    quotes= data
    createQuote(quote)
}))


//Puts all the quotes onto the html
function createQuote(quote) {
    const creatediv = document.createElement('div')
    const quoteContainer = document.querySelector('#quote-container')
    creatediv.className = 'quoteList'
    creatediv.id= quote.id
    creatediv.innerHTML = `
            <quote>${quote.quote}</quote><br>
            <author>-${quote.author}</author><br>
            <source><i>${quote.source}</i></source><br>
            <button class='likeBtn'>Like!</button> <like>Likes: ${quote.like}</like>
            <br>
            <br>
        `
    quoteContainer.appendChild(creatediv)

    //Like Button
    const likeBtn = creatediv.querySelector('.likeBtn')
    likeBtn.addEventListener('click',(event)=>{
        quote.like++
        event.target.nextElementSibling.textContent=`Likes: ${quote.like}`
    })
}


//Highlight a word
document.querySelector('#quote-container').addEventListener('contextmenu', (e) => {
    e.preventDefault
    const selectedText = window.getSelection().toString()
    console.log(selectedText)
    if (selectedText !== "") {
        const quoteContainer = document.querySelector('#quote-container')
        const innerHTML = quoteContainer.innerHTML
        const firstIndex= innerHTML.indexOf(selectedText)
        const secondIndex= innerHTML.indexOf(selectedText, firstIndex+1)
        const highlightText = "<span class='highlight'>" + selectedText + "</span>"
        //const newHTML = quoteContainer.innerHTML.replace(new RegExp(selectedText, 'g'), highlightText)
        const newHTML= innerHTML.substring(0, secondIndex)+ innerHTML.substring(secondIndex).replace(selectedText, highlightText)
        return quoteContainer.innerHTML = newHTML
    }
})

//Highlight Off
document.querySelector('#quote-container').addEventListener('click', (e) => {
    e.preventDefault
    const clickedElement = e.target
    if (clickedElement.nodeName === 'SPAN') {
        console.log('highlighted')
        return clickedElement.classList.toggle('highlight')
    }
})


let text=''
//Add a quote to the Top 5 List
document.addEventListener('keydown', (event) => {
    event.preventDefault()
    const keyChar= event.key
    if (keyChar === '1') {
        mouseOver(1)
    } else if (keyChar === '2') {
        mouseOver(2)
    } else if (keyChar === '3') {
        mouseOver(3)
    } else if (keyChar === '4') {
        mouseOver(4)
    } else if (keyChar === '5') {
        mouseOver(5)
    }
})

function mouseOver(place) {
    let quote; 
    document.querySelector('#quote-container').addEventListener('mouseover', function mouseQuote(e) {
        findQuote= quotes.find(quote=> quote.id === parseInt(e.target.id))
        document.querySelector(`#Top${place}`).textContent =findQuote.quote
        document.querySelector('#quote-container').removeEventListener('mouseover', mouseQuote)
    })
    return quote
}


//Add a quote to the list
document.querySelector('.quote-form').addEventListener('submit',handleQuote)

function handleQuote(e){
    e.preventDefault()
    let quoteObj = {
        quote: document.querySelector('#addQuote').value,
        author: document.querySelector('#addAuthor').value,
        source: document.querySelector('#addSource').value,
        like: 0
    }
    console.log(quoteObj)
    //createQuote(quoteObj)
    postNewQuote(quoteObj)
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


