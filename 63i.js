const fs = require('fs');

// Чтение данных из файла
const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');
const n = parseInt(input[0], 10);
const [a, b] = input[1].split(' ').map(Number);
const rovers = input.slice(2).map(line => {
	const [direction, time] = line.split(' ').map(Number);
	return { direction, time };
});

const result = new Array(n).fill(null); // Инициализируем массив результатов
const directionsRight = { 1: 4, 2: 1, 3: 2, 4: 3 }; // Правила уступки справа
const mainRoads = new Set([a, b]);

// Организуем роверов по времени прибытия
const queues = {};
rovers.forEach((rover, index) => {
	if (!queues[rover.time]) queues[rover.time] = [];
	queues[rover.time].push({ ...rover, index });
});
const roadRovers = [[], [], [], [], []];

let time = 1;
// Основной цикл, пока в результатах остаются null
while (result.includes(null)) {
	// Цикл по временным интервалам

	const roversAtTime = queues[time] ? queues[time] : [];
	roadRovers.forEach((el, index) => el.push(...roversAtTime.filter(r => r.direction === index)));

	const currentRovers = roadRovers
		.map(subArray => subArray[0])  // Берем первый элемент из каждого подмассива
		.filter(item => item);  // Оставляем только непустые

	const forDelete = [];
	currentRovers.forEach((rover) => {
		if (mainRoads.has(rover.direction)) {
			if (!currentRovers.some(r => r.direction === directionsRight[rover.direction] && mainRoads.has(directionsRight[rover.direction]))) {
				forDelete.push(rover.index);
			}
		}
	});

	if (forDelete.length === 0) {
		currentRovers.forEach((rover) => {
			if (!currentRovers.some(r => r.direction === directionsRight[rover.direction])) {
				forDelete.push(rover.index);
			}
		});

	}

	forDelete.forEach((index) => {
		result[index] = time;
	})

	roadRovers.forEach((subArray, index) => {
		roadRovers[index] = subArray.filter(rover => !forDelete.includes(rover.index));
	})

	time++;
}

// Запись результата в файл
fs.writeFileSync('output.txt', result.map(time => time || 0).join('\n'));
