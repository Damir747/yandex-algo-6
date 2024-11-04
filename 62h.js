function minimalTransitions(n, employees) {
	// Префиксная сумма для количества сотрудников и суммарного перехода.
	let prefixEmployees = new Array(n).fill(0);
	let prefixCost = new Array(n).fill(0);

	// Инициализация первой префиксной суммы.
	prefixEmployees[0] = employees[0];
	for (let i = 1; i < n; i++) {
		prefixEmployees[i] = prefixEmployees[i - 1] + employees[i];
		prefixCost[0] += employees[i] * i;  // Считаем переходы, если выберем кабинет 0
	}

	let minCost = prefixCost[0];
	for (let k = 1; k < n; k++) {
		prefixCost[k] = prefixCost[k - 1] + prefixEmployees[k - 1] - (prefixEmployees[n - 1] - prefixEmployees[k - 1]);
		minCost = Math.min(minCost, prefixCost[k]);
	}

	return minCost;
}

// Пример использования:
const n = 4;
const employees = [5, 2, 3, 1];
console.log(minimalTransitions(n, employees));  // Вывод: 10
