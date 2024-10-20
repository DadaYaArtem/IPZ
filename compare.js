// Імітація даних користувачів
const users = {
    'current': {
        name: 'Ви',
        books: [
            { id: 1, title: "1984", author: "Джордж Орвелл" },
            { id: 2, title: "Гаррі Поттер і філософський камінь", author: "Дж. К. Ролінґ" },
            { id: 3, title: "Кобзар", author: "Тарас Шевченко" },
            { id: 4, title: "Майстер і Маргарита", author: "Михайло Булгаков" }
        ]
    },
    'user1': {
        name: 'Користувач 1',
        books: [
            { id: 2, title: "Гаррі Поттер і філософський камінь", author: "Дж. К. Ролінґ" },
            { id: 3, title: "Кобзар", author: "Тарас Шевченко" },
            { id: 5, title: "Злочин і кара", author: "Федір Достоєвський" }
        ]
    },
    'user2': {
        name: 'Користувач 2',
        books: [
            { id: 1, title: "1984", author: "Джордж Орвелл" },
            { id: 4, title: "Майстер і Маргарита", author: "Михайло Булгаков" },
            { id: 6, title: "Гордість і упередження", author: "Джейн Остін" }
        ]
    },
    'user3': {
        name: 'Користувач 3',
        books: [
            { id: 7, title: "Три мушкетери", author: "Александр Дюма" },
            { id: 8, title: "Війна і мир", author: "Лев Толстой" },
            { id: 9, title: "Маленький принц", author: "Антуан де Сент-Екзюпері" }
        ]
    }
};

function displayBooks(books, elementId) {
    const bookList = document.getElementById(elementId);
    bookList.innerHTML = '';
    books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} - ${book.author}`;
        bookList.appendChild(li);
    });
}

function compareCollections() {
    const selectedUser = document.getElementById('other-user-select').value;
    if (!selectedUser) return;

    const yourBooks = users.current.books;
    const otherBooks = users[selectedUser].books;

    displayBooks(yourBooks, 'your-books');
    displayBooks(otherBooks, 'other-books');

    const commonBooks = yourBooks.filter(book => 
        otherBooks.some(otherBook => otherBook.id === book.id)
    );

    displayBooks(commonBooks, 'common-books-list');

    // Відображення статистики
    const statsElement = document.getElementById('comparison-stats');
    const commonCount = commonBooks.length;
    const totalUnique = new Set([...yourBooks, ...otherBooks].map(book => book.id)).size;
    const similarity = (commonCount / totalUnique * 100).toFixed(2);

    statsElement.innerHTML = `
        <p>Спільних книг: ${commonCount}</p>
        <p>Унікальних книг загалом: ${totalUnique}</p>
        <p>Схожість колекцій: ${similarity}%</p>
    `;
}

document.getElementById('other-user-select').addEventListener('change', compareCollections);

// Початкове відображення вашої колекції
displayBooks(users.current.books, 'your-books');