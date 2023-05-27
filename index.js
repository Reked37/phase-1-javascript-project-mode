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
 document.querySelector('.quote-container').addEventListener('click',(e)=>{
        e.preventDefault
        const selectQuoteContainer = document.querySelector('.quote-container')
        let sentence = selectQuoteContainer.querySelector('p')
        console.log(sentence)
        return
})

function highlightWord(word){

}

//Highlight a sentence
function highlightASentence(){
    document.addEventListener('click',(e)=>{
        e.preventDefault
        return
    })
}

//Add a quote to the Top 5 List
function addQuoteToTop5List(){
    document.addEventListener('keydown',(e)=>{
        e.preventDefault
        return
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


