const fs = require('fs');

function findMinDiscomfort(n, H, chairs) {
	// Если только один стул, неудобства нет
	if (n === 1) return 0;

	let left = 0;
	let currentWidthSum = 0;
	let minDiscomfort = Infinity;

	// Сортируем стулья по высоте
	chairs.sort((a, b) => a.height - b.height);

	// Массив для хранения разностей высот соседних стульев
	const discomforts = Array(n).fill(0);
	for (let i = 0; i < n - 1; i++) {
		discomforts[i] = Math.abs(chairs[i + 1].height - chairs[i].height);
	}

	// Двусторонняя очередь для хранения индексов в массиве discomforts
	let maxDeque = [];

	// Двигаем правый указатель по массиву discomforts
	for (let right = 0; right < n; right++) {
		currentWidthSum += chairs[right].width;

		// Обновляем maxDeque: добавляем новый элемент в конец, поддерживаем порядок убывания
		while (maxDeque.length > 0 && discomforts[maxDeque[maxDeque.length - 1]] <= discomforts[right]) {
			maxDeque.pop();
		}
		maxDeque.push(right);

		// Сдвигаем левый указатель, если сумма ширины больше или равна H
		while (currentWidthSum >= H) {

			// Максимальный дискомфорт для текущего окна
			minDiscomfort = Math.min(minDiscomfort, discomforts[maxDeque[0]]);

			// Сдвигаем левый указатель
			currentWidthSum -= chairs[left].width;
			left++;

			// Убираем элементы из maxDeque, которые больше не в окне
			if (maxDeque[0] < left) {
				maxDeque.shift();
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

// Вызываем функцию для поиска минимального неудобства
const result = findMinDiscomfort(n, H, chairs);

// Записываем результат в файл
fs.writeFileSync('output.txt', result.toString());
