function removeMedians(n, arr) {
	// Сортируем массив для начального состояния
	arr.sort((a, b) => a - b);
	const result = [];

	while (arr.length > 0) {
		let midIndex = Math.floor((arr.length - 1) / 2);
		let median = arr[midIndex];

		// Добавляем медиану в результат
		result.push(median);

		// Удаляем медиану из массива
		arr.splice(midIndex, 1);

		// Сортируем массив снова после удаления
		arr.sort((a, b) => a - b);
	}

	return result;
}

// Пример использования
const n1 = 3;
const arr1 = [19, 3, 8];
console.log(removeMedians(n1, arr1)); // Вывод: [8, 3, 19]

const n2 = 4;
const arr2 = [1, 2, 4, 2];
console.log(removeMedians(n2, arr2)); // Вывод: [2, 2, 1, 4]
