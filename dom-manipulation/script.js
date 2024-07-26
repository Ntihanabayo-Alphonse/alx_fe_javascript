// Element selection
const newQuoteTextInput = document.getElementById('newQuoteText');
const newQuoteCategoryInput = document.getElementById('newQuoteCategory');
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');

// Empty object
const quoteObjects = [
    { quote: "Life isn't about finding yourself. Life is about creating yourself.", category: "Life" },
    { quote: "We do not remember days, we remember moments.", category: "Life" },
    { quote: "Without music, life would be a mistake.", category: "Music" },
    { quote: "Music is very spiritual, it has the power to bring people together.", category: "Music" },
    { quote: "Let us sacrifice our today so that our children can have a better tomorrow.", category: "Inspirational" },
    { quote: "Give light and people will find the way.", category: "Inspirational" },
    { quote: "It is better to learn late than never.", category: "Education" },
    { quote: "Education is the movement from darkness to light.", category: "Education" },
    { quote: "Change is the end result of all true learning.", category: "Education" },
];

// create Elements
const quotePara = document.createElement("p");
const categoryPara = document.createElement("p");

// Show Random Quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quoteObjects.length);
    const randomQuote = quoteObjects[randomIndex];

    // Add content
    quotePara.textContent = randomQuote["quote"];
    categoryPara.textContent = randomQuote["category"];

    // Style
    quotePara.style.fontStyle = "italic";
    categoryPara.style.fontWeight = "bold";

    // append
    quoteDisplay.appendChild(quotePara);
    quoteDisplay.appendChild(categoryPara);
}

showRandomQuote();

// Add New Quote
const addQuote = () => {
    if (newQuoteTextInput.value !== "" && newQuoteCategoryInput.value !== "") {
        const newQuoteText = newQuoteTextInput.value;
        const newQuoteCategory = newQuoteCategoryInput.value;

        newQuotes = [
            { quote: newQuoteText, category: newQuoteCategory },
        ]
        newQuotes.forEach(newQuote => {
            // Add to the object array
            quoteObjects.push(newQuote);

            // Show new quote when button is clicked
            newQuoteBtn.addEventListener('click', () => {
                quotePara.textContent = newQuote.quote;
                categoryPara.textContent = newQuote.category;
            });
        });
    } else {
        alert("Fill both quote and category fields!");
    }
}