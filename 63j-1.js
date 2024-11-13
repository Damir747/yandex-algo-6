const fs = require('fs');

function findMinDiscomfort(n, H, chairs) {
	if (n === 1) return 0;

	// Сортируем стулья по высоте
	chairs.sort((a, b) => a.height - b.height);
	let left = 0, minDiscomfort = Infinity, currentWidthSum = 0;

	// Двусторонняя очередь для хранения индексов разностей высот соседних стульев
	const discomforts = Array(n - 1).fill(0);
	for (let i = 0; i < n - 1; i++) {
		discomforts[i] = Math.abs(chairs[i + 1].height - chairs[i].height);
	}

	let maxDeque = [];

	for (let right = 0; right < n; right++) {
		currentWidthSum += chairs[right].width;

		// Удаляем устаревшие элементы из maxDeque
		while (maxDeque.length > 0 && discomforts[maxDeque[maxDeque.length - 1]] <= discomforts[right - 1]) {
			maxDeque.pop();
		}
		if (right > 0) {
			maxDeque.push(right - 1);
		}

		while (currentWidthSum >= H) {
			// Вычисляем максимальный дискомфорт в текущем окне
			const currentDiscomfort = maxDeque.length > 0 ? discomforts[maxDeque[0]] : 0;
			minDiscomfort = Math.min(minDiscomfort, currentDiscomfort);
			currentWidthSum -= chairs[left].width;
			left++;

			// Удаляем элементы, выходящие за пределы окна
			if (maxDeque[0] < left) {
				maxDeque.shift();
			}
		}
		if (left > right) {
			return 0;
		}
	}

	return minDiscomfort === Infinity ? 0 : minDiscomfort;
}

// Чтение данных
const input = fs.readFileSync('input.txt', 'utf8').split('\n');
const [n, H] = input[0].split(' ').map(Number);
const heights = input[1].split(' ').map(Number);
const widths = input[2].split(' ').map(Number);

const chairs = heights.map((height, index) => ({
	height: height,
	width: widths[index]
}));

const result = findMinDiscomfort(n, H, chairs);
fs.writeFileSync('output.txt', result.toString());
