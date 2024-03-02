// Отримуємо кращий результат з локального сховища браузера при завантаженні сторінки
var bestScore = localStorage.getItem('bestScore') || 0; 

// Оновлюємо відображення кращого результату у HTML
document.querySelector('.best-score-value').textContent = bestScore;

// Функція оновлення кращого результату
function updateBestScore(score) {
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('bestScore', bestScore); // Зберігаємо кращий результат у локальному сховищі браузера
        document.querySelector('.best-score-value').textContent = bestScore; // Оновлюємо відображення кращого результату у HTML
    }
}

// Функція оновлення гри, де score - поточний результат гри
function updateGame(score) {
    // Оновлюємо кращий результат
    updateBestScore(score);
    // Отримуємо поточний результат та оновлюємо його відображення у HTML
    document.getElementById('score-result').textContent = score;
    // Отримуємо рівень гри та оновлюємо його відображення у HTML
    document.getElementById('level-result').textContent = level;
}
