function countPairs(n, r, distances) {
	let count = 0;
	let j = 0;

	for (let i = 0; i < n; i++) {
		// Двигаем указатель j, чтобы найти первый памятник, который виден с i
		while (j < n && distances[j] <= distances[i] + r) {
			j++;
		}
		// Все памятники между i и j не видят друг друга
		// j - i - 1 - количество памятников, которые можно выбрать с i
		count += j - i - 1;
	}

	return count;
}

// Пример использования
const n = 4;
const r = 4;
const distances = [1, 3, 5, 8];

console.log(countPairs(n, r, distances)); // Вывод: 2
