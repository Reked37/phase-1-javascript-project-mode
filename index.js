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
            <button class='likeBtn'>Like!</button> <like >Likes: ${quote.like}</like>
            <br>
            <br>
        `
    quoteContainer.appendChild(creatediv)

    //Like Button
    document.querySelector('.likeBtn').addEventListener('click',()=>{
        quote.like++
        return creatediv.querySelector('like').textContent=`Likes: ${quote.like}`
    })
}



//Highlight a word
document.querySelector('#quote-container').addEventListener('contextmenu', (e) => {
    e.preventDefault
    const clickedElement = e.target
    // if (clickedElement.nodeName === 'SPAN') {
    //     console.log('highlighted')
    //     return clickedElement.classList.toggle('highlight')
    // }
    // else{
    const selectedText = window.getSelection().toString()
    console.log(selectedText)
    if (selectedText !== "") {
        const highlightText = "<span class='highlight'>" + selectedText + "</span>"
        const newHTML = document.querySelector('#quote-container').innerHTML.replace(selectedText, highlightText)
        return document.querySelector('#quote-container').innerHTML = newHTML
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
        text=mouseOver(1)
        console.log(text)
        //document.querySelector('#Top1').appendChild(text)
        return text
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

function mouseOver(place) {
    let quote; 
    document.querySelector('#quote-container').addEventListener('mouseover', function mouseQuote(e) {
        quote= quotes.find(quote=> quote.id === parseInt(e.target.id))
        console.log(quote)
        document.querySelector(`#Top${place}`).textContent =quote.quote
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
    createQuote(quoteObj)

    //postNewQuote(quoteObj)
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


