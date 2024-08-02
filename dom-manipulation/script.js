// Elements selection
const newQuoteTextInput = document.getElementById('newQuoteText');
const newQuoteCategoryInput = document.getElementById('newQuoteCategory');
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const exportQuotesBtn = document.getElementById('exportQuotes');
const categoryFilter = document.getElementById('categoryFilter');

// Initial quotes object
let quoteObjects = [
    { quote: "We do not remember days, we remember moments.", category: "Life" },
    { quote: "Without music, life would be a mistake.", category: "Music" },
    { quote: "Give light and people will find the way.", category: "Inspirational" },
    { quote: "It is better to learn late than never.", category: "Education" },
];

// Function to display quotes
function displayQuote(quote) {
    const quotePara = document.createElement("p");
    const categoryPara = document.createElement("p");

    // Add content
    quotePara.innerHTML = quote["quote"];
    categoryPara.innerHTML = quote["category"];

    // Style
    quotePara.style.fontStyle = "italic";
    categoryPara.style.fontWeight = "bold";

    // append
    quoteDisplay.innerHTML = '';
    quoteDisplay.appendChild(quotePara);
    quoteDisplay.appendChild(categoryPara);
}

// Show Random Quote
function showRandomQuote() {
    const storedQuotes = JSON.parse(localStorage.getItem("Quotes")) || [];
    const quotesToShow = storedQuotes.length ? storedQuotes : quoteObjects;
    const randomIndex = Math.floor(Math.random() * quotesToShow.length);
    const randomQuote = quotesToShow[randomIndex];
    displayQuote(randomQuote);
}

// Populate categories dynamically
function populateCategories() {
    const storedQuotes = JSON.parse(localStorage.getItem("Quotes")) || quoteObjects;
    const categories = new Set(storedQuotes.map(quote => quote.category));
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = categoryFilter.value;
    localStorage.setItem("selectedCategory", selectedCategory);

    const storedQuotes = JSON.parse(localStorage.getItem("Quotes")) || [];
    const filteredQuotes = storedQuotes.filter(quote => selectedCategory === 'all' || quote.category === selectedCategory);
    if (filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const randomQuote = filteredQuotes[randomIndex];
        displayQuote(randomQuote);
    } else {
        quoteDisplay.innerHTML = 'No quotes, Add.';
    }
}

// Remember the last selected filter
function rememberSelectedFilter() {
    const selectedCategory = localStorage.getItem("selectedCategory") || 'all';
    categoryFilter.value = selectedCategory;
    filterQuotes();
}

// Add New Quote
const createAddQuoteForm = () => {
    if (newQuoteTextInput.value !== "" && newQuoteCategoryInput.value !== "") {
        const newQuoteText = newQuoteTextInput.value;
        const newQuoteCategory = newQuoteCategoryInput.value;

        const newQuote = { quote: newQuoteText, category: newQuoteCategory };

        // Add to the object array
        quoteObjects.push(newQuote);

        // Save to local storage
        saveQuotes();

        // Populate categories again
        populateCategories();

        // Show new quote
        newQuoteBtn.addEventListener('click', () => {
            displayQuote(newQuote);
        });

        newQuoteTextInput.value = "";
        newQuoteCategoryInput.value = "";
    } else {
        alert("Fill both quote and category fields!");
    }
}

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem("Quotes", JSON.stringify(quoteObjects));
}

// Load quotes from local storage
function loadQuotes() {
    const storedQuotes = JSON.parse(localStorage.getItem("Quotes")) || [];
    quoteObjects = storedQuotes.length ? storedQuotes : quoteObjects;
    populateCategories();
    rememberSelectedFilter();
}

loadQuotes();

// Export quotes to JSON file
exportQuotesBtn.addEventListener('click', () => {
    const dataStr = JSON.stringify(quoteObjects, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();
    URL.revokeObjectURL(url);
});

// Import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
        const importedQuotes = JSON.parse(event.target.result);
        quoteObjects.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

document.addEventListener("DOMContentLoaded", () => {
    loadQuotes();
});
