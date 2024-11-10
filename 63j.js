const fs = require('fs');

function findMinDiscomfort(n, H, chairs) {
	let left = 0;
	let currentWidthSum = 0;
	let minDiscomfort = Infinity;

	// Двусторонняя очередь для хранения индексов стульев
	let deque = [];

	// Функция для вычисления максимальной разности высот между соседними элементами в окне
	const getMaxDiscomfort = () => {
		let maxDiscomfort = 0;
		for (let i = 1; i < deque.length; i++) {
			maxDiscomfort = Math.max(maxDiscomfort, Math.abs(chairs[deque[i]].height - chairs[deque[i - 1]].height));
		}
		return maxDiscomfort;
	};

	// Двигаем правый указатель
	for (let right = 0; right < n; right++) {
		currentWidthSum += chairs[right].width;

		// Добавляем индекс текущего стула в deque, поддерживаем порядок
		while (deque.length > 0 && chairs[deque[deque.length - 1]].height > chairs[right].height) {
			deque.pop();
		}
		deque.push(right);

		// Сдвигаем левый указатель, если сумма ширины больше или равна H
		while (currentWidthSum >= H) {
			// Вычисляем максимальное неудобство для текущего окна
			let discomfort = getMaxDiscomfort();
			minDiscomfort = Math.min(minDiscomfort, discomfort);

			// Сдвигаем левый указатель
			currentWidthSum -= chairs[left].width;
			left++;

			// Убираем элементы из deque, которые больше не в окне
			if (deque[0] < left) {
				deque.shift();
			}
		}
	}

	return minDiscomfort;
}


// Чтение данных из файла
const input = fs.readFileSync('input.txt', 'utf8').split('\n');

// Извлекаем количество стульев и рост Васи
const [n, H] = input[0].split(' ').map(Number);

// Извлекаем высоты и ширины стульев
const heights = input[1].split(' ').map(Number);
const widths = input[2].split(' ').map(Number);
// Создаем массив стульев, где каждый элемент - это объект {height, width}
const chairs = heights.map((height, index) => ({
	height,
	width: widths[index]
}));

// Сортируем стулья по высоте
chairs.sort((a, b) => a.height - b.height);

// Вызываем функцию для поиска минимального неудобства
const result = findMinDiscomfort(n, H, chairs);

// Записываем результат в файл
fs.writeFileSync('output.txt', result.toString());
