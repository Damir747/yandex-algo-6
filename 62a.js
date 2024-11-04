function prefixSums(n, a) {
	// Массив для хранения префиксных сумм
	const b = [];
	let currentSum = 0;

	for (let i = 0; i < n; i++) {
		currentSum += a[i]; // Обновляем текущую префиксную сумму
		b.push(currentSum); // Добавляем её в массив префиксных сумм
	}

	return b;
}

// Чтение входных данных
const input = require('fs').readFileSync('/dev/stdin', 'utf-8').split('\n');
const n = parseInt(input[0]);
const a = input[1].split(' ').map(Number);

// Получаем префиксные суммы
const result = prefixSums(n, a);

// Вывод результата
console.log(result.join(' '));
