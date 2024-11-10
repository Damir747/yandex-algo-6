const fs = require('fs');

// Чтение входных данных
const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');
const [n, H] = input[0].split(' ').map(Number);
const heights = input[1].split(' ').map(Number);
const widths = input[2].split(' ').map(Number);

// Создание массива объектов стульев с высотой и шириной, сортировка по высоте
const chairs = Array.from({ length: n }, (_, i) => ({
	height: heights[i],
	width: widths[i]
})).sort((a, b) => a.height - b.height);

// Переменные для минимальной неудобности
let minInconvenience = Infinity;
let currentWidthSum = 0;
let left = 0;

// Деки для отслеживания минимальных и максимальных высот в текущем окне
const minDeque = [];
const maxDeque = [];

// Проход по массиву стульев с помощью скользящего окна
for (let right = 0; right < n; right++) {
	const { height, width } = chairs[right];
	currentWidthSum += width;

	// Обновляем дека для максимальных значений
	while (maxDeque.length && maxDeque[maxDeque.length - 1].height <= height) {
		maxDeque.pop();
	}
	maxDeque.push({ height, index: right });

	// Обновляем дека для минимальных значений
	while (minDeque.length && minDeque[minDeque.length - 1].height >= height) {
		minDeque.pop();
	}
	minDeque.push({ height, index: right });

	// Проверка, если текущая сумма ширин >= H
	while (currentWidthSum >= H) {
		// Вычисляем неудобность как разность между максимальным и минимальным элементами
		const inconvenience = maxDeque[0].height - minDeque[0].height;
		minInconvenience = Math.min(minInconvenience, inconvenience);

		// Смещаем левую границу окна и уменьшаем сумму ширины
		currentWidthSum -= chairs[left].width;

		// Удаляем старые элементы из дек
		if (maxDeque[0].index === left) maxDeque.shift();
		if (minDeque[0].index === left) minDeque.shift();

		left++;
	}
}

// Запись результата в output.txt
fs.writeFileSync('output.txt', minInconvenience.toString());
