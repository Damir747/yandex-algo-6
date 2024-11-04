const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');
const lines = fileContent.toString().split('\n');

if (lines.length > 0) {
	const n = Number(lines[0].split(' ')[0]);
	const arr = lines[1].split(' ').map(Number);

	function minimalTransitions(n, employees) {
		const nakopPrefix = new Array(n).fill(0);
		const nakopSuffix = new Array(n).fill(0);

		nakopPrefix[0] = employees[0];
		for (let i = 1; i < n; i++) {
			nakopPrefix[i] = nakopPrefix[i - 1] + employees[i];
		}
		nakopSuffix[n - 1] = employees[n - 1];
		for (let i = n - 2; i >= 0; i--) {
			nakopSuffix[i] = nakopSuffix[i + 1] + employees[i];
		}

		// Префиксные и суффиксные суммы
		let prefixSum = new Array(n).fill(0);
		let suffixSum = new Array(n).fill(0);
		// Вычисление префиксных сумм
		prefixSum[0] = 0;
		for (let i = 1; i < n; i++) {
			prefixSum[i] = prefixSum[i - 1] + nakopPrefix[i - 1];
		}

		// Вычисление суффиксных сумм
		suffixSum[n - 1] = 0;
		for (let i = n - 2; i >= 0; i--) {
			suffixSum[i] = suffixSum[i + 1] + nakopSuffix[i + 1];
		}

		let minCost = Infinity;

		// Вычисляем суммарные переходы для каждого кабинета как опенспейс
		for (let k = 0; k < n; k++) {
			let cost = 0;

			// Переходы сотрудников слева от кабинета k
			cost += prefixSum[k];
			// Переходы сотрудников справа от кабинета k
			cost += suffixSum[k];
			minCost = Math.min(minCost, cost);
		}

		return minCost;
	}

	fs.writeFileSync('output.txt', minimalTransitions(n, arr).toString());
}
