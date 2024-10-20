let books = [
    { id: 1, title: "Біографія Стив Джобс", author: "Стив Джобс", cover: "stevichjobs.jpg", progress: 75, tags: [] },
    { id: 2, title: "Государь", author: "Niccolò Machiavelli", cover: "machiavelli.jpg", progress: 30, tags: [] },
    // ... інші книги
];

const searchInput = document.getElementById('search-query');
const autocompleteResults = document.getElementById('autocomplete-results');

searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const searchType = document.getElementById('search-type').value;
    
    if (query.length < 2) {
        autocompleteResults.innerHTML = '';
        return;
    }

    const filteredBooks = books.filter(book => {
        if (searchType === 'all') {
            return book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query);
        } else if (searchType === 'title') {
            return book.title.toLowerCase().includes(query);
        } else if (searchType === 'author') {
            return book.author.toLowerCase().includes(query);
        }
    });

    displayAutocomplete(filteredBooks);
});

function displayAutocomplete(books) {
    autocompleteResults.innerHTML = '';
    if (books.length === 0) {
        autocompleteResults.style.display = 'none';
        return;
    }

    const ul = document.createElement('ul');
    books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} - ${book.author}`;
        li.addEventListener('click', () => {
            searchInput.value = book.title;
            autocompleteResults.style.display = 'none';
        });
        ul.appendChild(li);
    });

    autocompleteResults.appendChild(ul);
    autocompleteResults.style.display = 'block';
}

// Закриваємо автозаповнення при кліку поза ним
document.addEventListener('click', function(e) {
    if (!autocompleteResults.contains(e.target) && e.target !== searchInput) {
        autocompleteResults.style.display = 'none';
    }
});

document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Ваш існуючий код для обробки подання форми
});