const genres = ['Фантастика', 'Детектив', 'Романтика', 'Історія', 'Наука', 'Пригоди', 'Фентезі'];
const userPreferences = {
    'Фантастика': 0.8,
    'Детектив': 0.6,
    'Романтика': 0.3,
    'Історія': 0.5,
    'Наука': 0.7,
    'Пригоди': 0.9,
    'Фентезі': 0.7
};

function initializeLiteraryCompass() {
    const genreTree = document.getElementById('genre-tree');
    genres.forEach(genre => {
        const branch = document.createElement('div');
        branch.className = 'genre-branch';
        branch.textContent = genre;
        branch.style.fontSize = `${14 + userPreferences[genre] * 6}px`;
        branch.addEventListener('click', () => generateRecommendations(genre));
        genreTree.appendChild(branch);
    });
}

function generateRecommendations(selectedGenre) {
    const recommendationsContainer = document.getElementById('book-recommendations');
    recommendationsContainer.innerHTML = '<h3>Рекомендовані книги:</h3>';

    const relevance = userPreferences[selectedGenre];
    const numberOfRecommendations = Math.floor(relevance * 5); // Максимум 5 рекомендацій

    for (let i = 0; i < numberOfRecommendations; i++) {
        const book = createRecommendedBook(`${selectedGenre}: Книга ${i + 1}`, `/api/placeholder/100/150`);
        recommendationsContainer.appendChild(book);
    }

    document.querySelectorAll('.genre-branch').forEach(branch => {
        branch.classList.remove('active');
        if (branch.textContent === selectedGenre) {
            branch.classList.add('active');
        }
    });
}

function createRecommendedBook(title, coverUrl) {
    const bookElement = document.createElement('div');
    bookElement.className = 'recommended-book';
    bookElement.innerHTML = `
        <img src="${coverUrl}" alt="${title}">
        <h4>${title}</h4>
        <p>Рейтинг: ${(Math.random() * 2 + 3).toFixed(1)}/5</p>
    `;
    return bookElement;
}

window.addEventListener('load', initializeLiteraryCompass);