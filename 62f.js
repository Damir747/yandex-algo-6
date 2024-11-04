const fs = require('fs');

const MOD = 1000000007;

// Функция для нахождения модульного обратного числа
function modInverse(a, p) {
	let m = p - 2;
	let inv = 1;
	while (m > 0) {
		if (m % 2 === 1) {
			inv = (inv * a) % p;
		}
		a = (a * a) % p;
		m = Math.floor(m / 2);
	}
	return inv;
}

// Чтение данных из файла
let fileContent = fs.readFileSync('input.txt', 'utf8');
const lines = fileContent.toString().split('\n');

if (lines.length > 0) {
	const n = Number(lines[0]);
	const arr = lines[1].split(' ').map(Number);

	let S_total = 0;
	let S_squares = 0;
	let S_cubes = 0;

	for (let i = 0; i < n; i++) {
		S_total = (S_total + arr[i]);
		S_squares = (S_squares + (arr[i] * arr[i]));
		S_cubes = (S_cubes + (arr[i] * arr[i] * arr[i]));
	}

	// Используем формулу для подсчета суммы произведений
	let totalSum = (S_total * S_total * S_total - 3 * S_total * S_squares + 2 * S_cubes);

	// Корректируем, чтобы избежать отрицательного значения
	if (totalSum < 0) {
		totalSum += MOD;
	}

	let result = totalSum / 6 % MOD;

	// Выводим результат
	fs.writeFileSync('output.txt', result.toString());

}
