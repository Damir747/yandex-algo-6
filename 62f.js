const fs = require('fs');
const MOD = 1000000007;

function sumOfTripleProducts() {
	const fileContent = fs.readFileSync('input.txt', 'utf8');
	const lines = fileContent.toString().split('\n');

	if (lines.length > 1) {
		const n = Number(lines[0].trim());
		const a = lines[1].split(' ').map(Number);

		let totalSum = 0;
		let totalProductSum = 0;

		// Вычисляем общую сумму
		for (let num of a) {
			totalSum = (totalSum + num) % MOD;
		}

		// Вычисляем сумму произведений
		for (let i = 0; i < n; i++) {
			let current = a[i];

			// Сумма оставшихся элементов
			let sumAfterCurrent = (totalSum - current + MOD) % MOD;
			let countAfterCurrent = n - (i + 1); // Количество элементов после текущего

			// Умножаем текущее число на сумму остальных
			totalProductSum = (totalProductSum + (current * sumAfterCurrent % MOD) * countAfterCurrent % MOD) % MOD;
		}

		// Делим на 6, так как каждое произведение считается трижды
		totalProductSum = (totalProductSum * modInverse(6, MOD)) % MOD;

		return totalProductSum;
	}
	return 0;
}

// Функция для нахождения обратного элемента по модулю
function modInverse(a, m) {
	let m0 = m, t, q;
	let x0 = 0, x1 = 1;

	if (m === 1) return 0;

	while (a > 1) {
		q = Math.floor(a / m);
		t = m;

		m = a % m;
		a = t;
		t = x0;

		x0 = x1 - q * x0;
		x1 = t;
	}

	if (x1 < 0) x1 += m0;

	return x1;
}

// Записываем результат в файл
fs.writeFileSync('output.txt', sumOfTripleProducts().toString());
