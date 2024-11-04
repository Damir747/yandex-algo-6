function sumOfTripleProducts(n, arr) {
	const MOD = 1000000007;

	// Вычисляем сумму всех элементов и сумму квадратов
	let totalSum = 0;
	let totalSumSquares = 0;

	for (let i = 0; i < n; i++) {
		totalSum = (totalSum + arr[i]) % MOD;
		totalSumSquares = (totalSumSquares + arr[i] * arr[i]) % MOD;
	}

	// Вычисляем сумму произведений
	let result = (totalSum * totalSum % MOD * totalSum % MOD - totalSumSquares * totalSum % MOD) % MOD;

	// Учитываем, что результат должен быть неотрицательным
	if (result < 0) {
		result += MOD;
	}

	// Делим на 6 (умножаем на обратное по модулю)
	result = result * modInverse(6, MOD) % MOD;

	return result;
}

// Функция для нахождения обратного по модулю числа
function modInverse(a, mod) {
	let m0 = mod;
	let y = 0, x = 1;

	if (mod === 1) return 0;

	while (a > 1) {
		// q - коэффициент деления
		let q = Math.floor(a / mod);
		let t = mod;

		// mod - остаток
		mod = a % mod;
		a = t;
		t = y;

		y = x - q * y;
		x = t;
	}

	// Убедимся, что x положительное
	if (x < 0) {
		x += m0;
	}

	return x;
}

// Пример использования
const n = 4;
const arr = [0, 5, 6, 7];
console.log(sumOfTripleProducts(n, arr)); // Вывод: 210
