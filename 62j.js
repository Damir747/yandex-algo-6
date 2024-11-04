function investigateEvidence(n, weights, m, k, startPositions) {
	// Массив для предвычисленных позиций остановки
	let stopPosition = Array(n).fill(0);

	// Предвычисляем позиции остановки для каждой улики
	let stack = [];
	for (let i = 0; i < n; i++) {
		// Подсчет одинаковых весомостей в пределах лимита k
		let count = 1;
		while (stack.length && weights[stack[stack.length - 1]] <= weights[i]) {
			if (weights[stack[stack.length - 1]] === weights[i] && count === k) break;
			if (weights[stack[stack.length - 1]] === weights[i]) count++;
			else count = 1;
			stack.pop();
		}

		// Если стек пуст, значит можем дойти до самой первой улики
		stopPosition[i] = stack.length ? stack[stack.length - 1] + 1 : 1;
		stack.push(i);
	}

	// Формируем результат на основе массива stopPosition
	let result = [];
	for (let x of startPositions) {
		result.push(stopPosition[x - 1]);
	}

	console.log(result.join(" "));
}

// Пример использования:
const n = 6;
const weights = [3, 3, 3, 4, 4, 5];
const m = 4;
const k = 2;
const startPositions = [3, 4, 5, 6];
investigateEvidence(n, weights, m, k, startPositions); // Ожидается: 1 1 2 2
