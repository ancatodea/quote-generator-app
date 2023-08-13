const quoteContainer = document.getElementById('qoute-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];
// Show loader 
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loader 
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Show new quotes
function newQuote() {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if author field is blank and change it to 'Unknown';
  if(!quote.author) {
    authorText.textContent = 'Unknown author';
  } else {
    authorText.textContent = quote.author;
  }
  // Check quote length to detrmine styling
  if(quote.text.length > 100) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  // set quote, hide loader
  quoteText.textContent = quote.text;
  complete();
}



// Get Quotes From API
async function getQuotes() {
  loading();
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
  }
}

// Tweet quote 
function tweetQuote() {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(tweetUrl, '_blank');
}

// Event Listeners 
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();