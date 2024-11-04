function studyOrder(n, interest, utility, mood) {
	// Создаем массив алгоритмов с информацией (индекс, интересность, полезность)
	const algorithms = [];
	for (let i = 0; i < n; i++) {
		algorithms.push([i + 1, interest[i], utility[i]]);
	}

	// Сортируем по интересности и полезности в порядке убывания
	const sortedByInterest = [...algorithms].sort((a, b) => b[1] - a[1] || b[2] - a[2] || a[0] - b[0]);
	const sortedByUtility = [...algorithms].sort((a, b) => b[2] - a[2] || b[1] - a[1] || a[0] - b[0]);

	// Храним текущие индексы для извлечения на каждый день
	let interestIndex = 0;
	let utilityIndex = 0;
	const chosen = new Set();
	const result = [];

	for (const moodToday of mood) {
		let chosenAlgorithm;

		if (moodToday === 1) {
			// Извлекаем по полезности
			while (chosen.has(sortedByUtility[utilityIndex][0])) {
				utilityIndex++;
			}
			chosenAlgorithm = sortedByUtility[utilityIndex];
			utilityIndex++;
		} else {
			// Извлекаем по интересности
			while (chosen.has(sortedByInterest[interestIndex][0])) {
				interestIndex++;
			}
			chosenAlgorithm = sortedByInterest[interestIndex];
			interestIndex++;
		}

		// Добавляем в результат и отмечаем алгоритм как изученный
		result.push(chosenAlgorithm[0]);
		chosen.add(chosenAlgorithm[0]);
	}

	return result;
}

// Пример использования
const n = 5;
const interest = [1, 2, 3, 4, 5];
const utility = [5, 4, 3, 2, 1];
const mood = [1, 0, 1, 0, 0];
console.log(studyOrder(n, interest, utility, mood)); // Вывод: [1, 5, 2, 4, 3]
