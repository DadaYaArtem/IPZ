let tags = [];
let selectedBookForTags = null;

const createTagBtn = document.querySelector('.create-tag-btn');
const createTagModal = document.getElementById('create-tag-modal');
const cancelCreateTag = document.getElementById('cancel-create-tag');
const saveTag = document.getElementById('save-tag');
const applyTagsModal = document.getElementById('apply-tags-modal');
const tagSelection = document.getElementById('tag-selection');
const cancelApplyTags = document.getElementById('cancel-apply-tags');
const confirmApplyTags = document.getElementById('confirm-apply-tags');

// Оновіть структуру книг, додавши поле для тегів
let books = [
    { id: 1, title: "Біографія Стив Джобс", author: "Стив Джобс", cover: "stevichjobs.jpg", progress: 75, tags: [] },
    { id: 2, title: "Государь", author: "Niccolò Machiavelli", cover: "machiavelli.jpg", progress: 30, tags: [] },
    // ... інші книги
];


let shelves = [];

// DOM елементи
const createShelfBtn = document.querySelector('.create-shelf-btn');
const addToShelfBtn = document.querySelector('.add-to-shelf-btn');
const modal = document.getElementById('create-shelf-modal');
const addToShelfModal = document.getElementById('add-to-shelf-modal');
const closeModal = document.getElementById('close-modal');
const saveShelf = document.getElementById('save-shelf');
const shelfGrid = document.querySelector('.shelf-grid');
const errorMessage = document.getElementById('error-message');
const noShelvesMessage = document.getElementById('no-shelves-message');
const shelfSelect = document.getElementById('shelf-select');
const bookSelection = document.getElementById('book-selection');
const cancelAddToShelf = document.getElementById('cancel-add-to-shelf');
const confirmAddToShelf = document.getElementById('confirm-add-to-shelf');

// Функції
function showError(message, type = 'error') {
    errorMessage.textContent = message;
    errorMessage.className = type === 'error' ? 'error-message' : 'success-message';
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 3000);
}

function updateBookGrid() {
    const bookGrid = document.querySelector('.book-grid');
    bookGrid.innerHTML = '';
    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'book-item';
        bookElement.innerHTML = `
            <h3>${book.title}</h3>
            <p>${book.author}</p>
        `;
        bookGrid.appendChild(bookElement);
    });
    document.getElementById('no-books-message').style.display = books.length ? 'none' : 'block';
}

function updateShelfOptions() {
    shelfSelect.innerHTML = '<option value="">Виберіть полицю</option>';
    shelves.forEach(shelf => {
        const option = document.createElement('option');
        option.value = shelf.id;
        option.textContent = shelf.name;
        shelfSelect.appendChild(option);
    });
}

function updateBookSelection() {
    const bookSelection = document.getElementById('book-selection');
    bookSelection.innerHTML = '';
    books.forEach(book => {
        const label = document.createElement('label');
        label.className = 'book-select-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = book.id;
        checkbox.id = `book-${book.id}`;
        
        const span = document.createElement('span');
        span.textContent = `${book.title} - ${book.author}`;
        
        label.appendChild(checkbox);
        label.appendChild(span);
        
        bookSelection.appendChild(label);
    });
}

function updateShelfGrid() {
    shelfGrid.innerHTML = '';
    shelves.forEach(shelf => {
        const shelfElement = document.createElement('div');
        shelfElement.className = 'shelf-item';
        shelfElement.innerHTML = `
            <h3>${shelf.name}</h3>
            <p>Книг на полиці: ${shelf.books ? shelf.books.length : 0}</p>
        `;
        shelfGrid.appendChild(shelfElement);
    });
    noShelvesMessage.style.display = shelves.length ? 'none' : 'block';
}

// Обробники подій
createShelfBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

saveShelf.addEventListener('click', () => {
    const shelfName = document.getElementById('shelf-name').value;
    if (shelfName) {
        const newShelf = {
            id: Date.now(),
            name: shelfName,
            books: []
        };
        shelves.push(newShelf);
        updateShelfGrid();
        modal.style.display = 'none';
        document.getElementById('shelf-name').value = '';
    } else {
        showError("Будь ласка, введіть назву полиці");
    }
});

addToShelfBtn.addEventListener('click', () => {
    updateShelfOptions();
    updateBookSelection();
    addToShelfModal.style.display = 'block';
});

cancelAddToShelf.addEventListener('click', () => {
    addToShelfModal.style.display = 'none';
});

confirmAddToShelf.addEventListener('click', () => {
    const selectedShelfId = shelfSelect.value;
    const selectedBooks = Array.from(bookSelection.querySelectorAll('input:checked')).map(input => parseInt(input.value));
    
    if (!selectedShelfId) {
        showError("Будь ласка, виберіть полицю");
        return;
    }
    if (selectedBooks.length === 0) {
        showError("Будь ласка, виберіть хоча б одну книгу");
        return;
    }

    const shelf = shelves.find(s => s.id === parseInt(selectedShelfId));
    shelf.books = shelf.books || [];
    shelf.books.push(...selectedBooks);

    addToShelfModal.style.display = 'none';
    updateShelfGrid();
    showError("Книги успішно додані на полицю", "success");
});

// Закриття модальних вікон при кліку поза ними
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
    if (event.target == addToShelfModal) {
        addToShelfModal.style.display = 'none';
    }
});

function updateBookGrid() {
    const bookGrid = document.querySelector('.book-grid');
    bookGrid.innerHTML = '';
    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'book-card';
        bookElement.innerHTML = `
            <img src="${book.cover}" alt="${book.title}">
            <div class="book-title">${book.title}</div>
            <div class="book-author">${book.author}</div>
            <div class="book-progress">
                <div class="progress-bar" style="width: ${book.progress}%;"></div>
            </div>
            <div>Прогрес: ${book.progress}%</div>
        `;
        bookGrid.appendChild(bookElement);
    });
    document.getElementById('no-books-message').style.display = books.length ? 'none' : 'block';
}

function updateTagSelection() {
    tagSelection.innerHTML = '';
    tags.forEach(tag => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = tag;
        
        const span = document.createElement('span');
        span.textContent = tag;
        
        label.appendChild(checkbox);
        label.appendChild(span);
        
        tagSelection.appendChild(label);
    });
}

function updateBookGrid() {
    const bookGrid = document.querySelector('.book-grid');
    bookGrid.innerHTML = '';
    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'book-card';
        bookElement.innerHTML = `
            <img src="${book.cover}" alt="${book.title}">
            <div class="book-title">${book.title}</div>
            <div class="book-author">${book.author}</div>
            <div class="book-progress">
                <div class="progress-bar" style="width: ${book.progress}%;"></div>
            </div>
            <div>Прогрес: ${book.progress}%</div>
            <div class="book-tags">${book.tags.join(', ')}</div>
            <button class="apply-tags-btn" data-book-id="${book.id}">Застосувати теги</button>
        `;
        bookGrid.appendChild(bookElement);
    });
    document.getElementById('no-books-message').style.display = books.length ? 'none' : 'block';

    // Додаємо обробник подій для кнопок "Застосувати теги"
    const applyTagsBtns = document.querySelectorAll('.apply-tags-btn');
    applyTagsBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            selectedBookForTags = parseInt(e.target.dataset.bookId);
            updateTagSelection();
            applyTagsModal.style.display = 'block';
        });
    });
}

// Додайте ці обробники подій

createTagBtn.addEventListener('click', () => {
    createTagModal.style.display = 'block';
});

cancelCreateTag.addEventListener('click', () => {
    createTagModal.style.display = 'none';
});

saveTag.addEventListener('click', () => {
    const tagName = document.getElementById('tag-name').value.trim();
    if (tagName && !tags.includes(tagName)) {
        tags.push(tagName);
        createTagModal.style.display = 'none';
        document.getElementById('tag-name').value = '';
        showError("Тег успішно створено", "success");
    } else {
        showError("Будь ласка, введіть унікальну назву тегу");
    }
});

cancelApplyTags.addEventListener('click', () => {
    applyTagsModal.style.display = 'none';
});

confirmApplyTags.addEventListener('click', () => {
    const selectedTags = Array.from(tagSelection.querySelectorAll('input:checked')).map(input => input.value);
    const book = books.find(b => b.id === selectedBookForTags);
    if (book) {
        book.tags = selectedTags;
        updateBookGrid();
        applyTagsModal.style.display = 'none';
        showError("Теги успішно застосовано", "success");
    }
});


// Ініціалізація
updateBookGrid();
updateShelfGrid();