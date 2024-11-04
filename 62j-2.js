const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const processEvidence = () => {
	const lines = fileContent.toString().split('\n');
	if (lines.length > 0) {
		const n = Number(lines[0]);
		const weights = lines[1].split(' ').map(Number);
		const [m, k] = lines[2].split(' ').map(Number);
		const queries = lines[3].split(' ').map(Number);

		const results = new Array(m);

		// Обрабатываем каждый запрос
		for (let i = 0; i < m; i++) {
			let current = queries[i] - 1; // Индекс улики
			let moves = 0; // Счетчик перемещений

			// Перемещение влево
			while (current > 0) {
				if (weights[current - 1] < weights[current]) {
					break; // Останавливаемся, если встречаем более тяжелую улику
				}
				if (weights[current - 1] === weights[current]) {
					if (moves < k) {
						moves++; // Увеличиваем счетчик перемещений
						current--; // Переход к следующей улице
					} else {
						break; // Достигли лимита перемещений между одинаковыми уликами
					}
				} else {
					current--; // Переход к следующей улице
				}
			}

			results[i] = current + 1; // +1 для перехода на 1-индексацию
		}

		return results.join(' ');
	}
	return 'Не удалось прочитать файл.';
};

fs.writeFileSync('output.txt', processEvidence());
