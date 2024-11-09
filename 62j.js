const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');
const lines = fileContent.trim().split('\n');

// Чтение данных
const n = parseInt(lines[0]);
const arr = lines[1].split(' ').map(Number);
const [m, k] = lines[2].split(' ').map(Number);
const b = lines[3].split(' ').map(x => parseInt(x) - 1); // Приведение к 0-индексации

// Префиксный массив
const pref = new Array(n).fill(0);
for (let i = 1; i < n; i++) {
	if (arr[i] > arr[i - 1]) {
		pref[i] = pref[i - 1];
	} else {
		pref[i] = i;
	}
}

// Массив для хранения только необходимых результатов
const result = new Array(m);
const computed = new Map(); // Используем Map для кэширования

// Функция для получения результата с кэшированием
const getResult = (index) => {
	if (computed.has(index)) {
		return computed.get(index); // Возвращаем кэшированное значение
	}

	let currentIndex = pref[index];
	let remainingK = k;

	// Переход по ссылкам, если элементы равны
	while (currentIndex > 0 && remainingK > 0 && arr[currentIndex] === arr[currentIndex - 1]) {
		remainingK--; // Уменьшаем количество переходов
		currentIndex = pref[currentIndex - 1]; // Переходим к следующему элементу
	}

	// Сохраняем результат в кэш
	const finalResult = currentIndex + 1; // +1 для 1-индексации
	computed.set(index, finalResult);
	return finalResult;
};

// Вычисление только для нужных индексов
for (let j = 0; j < m; j++) {
	result[j] = getResult(b[j]); // Получаем результат для текущего запроса
}

// Вывод результатов
fs.writeFileSync('output.txt', result.join(' '));