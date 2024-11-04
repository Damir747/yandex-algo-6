function minDays(n, k, a) {
	// Сортируем массив направлений
	a.sort((x, y) => x - y);

	let days = 0;
	let i = 0;

	while (i < n) {
		days++; // Начинаем новый день
		let start = a[i];

		// Ищем конец текущей группы
		while (i < n && a[i] - start <= k) {
			i++;
		}
	}

	return days;
}

// Пример использования
console.log(minDays(3, 2, [4, 2, 1])); // Вывод: 2
console.log(minDays(9, 2, [3, 8, 5, 7, 1, 2, 4, 9, 6])); // Вывод: 3
console.log(minDays(3, 0, [1, 3, 1])); // Вывод: 2
console.log(minDays(4, 4, [32, 77, 1, 100])); // Вывод: 1
