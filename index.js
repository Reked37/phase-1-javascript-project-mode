//Puts all the quotes onto the html
function createQuote(quotes){
    const creatediv = document.createElement('div')
    const quoteContainer = document.querySelector('#quote-container')
    creatediv.innerHTML = `
        <div>${quotes.quote}<div>
        <div>${quotes.author}<div>
        <div>${quotes.source}<div>
    `
    quoteContainer.appendChild(creatediv)
}

//Highlight a word
function highlightAWord(){
    document.addEventListener('click',(e)=>{
        e.preventDefault
        const selectQuoteContainer = document.querySelector('#quote-container')

        return
    })
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
document.querySelector('.quote-container').addEventListener('submit',handleQuote)
function handleQuote(){
    e.preventDefault()
    let quoteObj = {
        quote: e.target.quote.value,
        author: e.target.author.value,
        source: e.target.source.value
    }
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

//Gets the selected text by the user
const selection = document.getSelection()
function testSelection(){
    document.addEventListener('click',(e)=>{
        console.log(selection)
    })
}

//fetch db.json
fetch('http://localhost:3000/quotes')
.then(res => res.json())
.then(data => data.forEach(quote => createQuote(quote)))
