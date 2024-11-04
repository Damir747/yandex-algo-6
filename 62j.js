const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');
const lines = fileContent.trim().split('\n');

// Чтение данных
const n = parseInt(lines[0]);
const arr = lines[1].split(' ').map(Number);
const [m, k] = lines[2].split(' ').map(Number);
const b = lines[3].split(' ').map(x => parseInt(x) - 1); // Приведение к 0-индексации

const pref = new Array(n).fill(0);
for (let i = 1; i < n; i++) {
	if (arr[i] > arr[i - 1]) {
		pref[i] = pref[i - 1];
	} else {
		pref[i] = i;
	}
}

const result = new Array(arr.length).fill(0);

// Обработка каждого запроса
for (let j = 0; j < arr.length; j++) {
	let currentIndex = pref[j];
	let remainingK = k;
	// Переход по ссылкам, если элементы равны
	while (currentIndex > 0 && remainingK > 0 && arr[currentIndex] === arr[currentIndex - 1]) {
		currentIndex = currentIndex - 1;
		remainingK--; // Уменьшаем количество переходов
		currentIndex = pref[currentIndex]; // Переходим к следующему элементу
	}
	result[j] = currentIndex + 1;
}

// Вывод результатов
const selectedResults = b.map(index => result[index]);
fs.writeFileSync('output.txt', selectedResults.join(' '));