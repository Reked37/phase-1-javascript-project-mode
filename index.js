//fetch db.json
fetch('http://localhost:3000/quotes')
.then(res => res.json())
.then(data => data.forEach(quote => createQuote(quote)))

//Puts all the quotes onto the html
function createQuote(quote){
    const creatediv = document.createElement('div')
    const quoteContainer = document.querySelector('.quote-container')
    creatediv.innerHTML = `
        <p>
            ${quote.quote}<br>
            -${quote.author}<br>
            <i>${quote.source}</i><br>
       <p>
    `
    quoteContainer.appendChild(creatediv)
}

//Highlight a word
document.querySelector('.quote-container').addEventListener('click', (e) => {
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
            const newHTML = document.querySelector('.quote-container').innerHTML.replace(selectedText, highlightText)
            return document.querySelector('.quote-container').innerHTML=newHTML
        }
    }

})
    


//Add a quote to the Top 5 List
document.addEventListener('keydown',addQuoteToTop5List)
function addQuoteToTop5List(){
    //console.log('keydown')
    const quoteContainer= document.querySelector('.quote-form')
    quoteContainer.addEventListener('mouseover',mouseOver())
    //  if(keydown === 1){

//  }else if(keydown === 2){

//  }else if(keydown ===3){

//  }else if(keydown === 4){

//  }else if(keydown ===5){

//  }
}
function mouseOver(){

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
    document.querySelector('#addAuthor').value = " "
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


