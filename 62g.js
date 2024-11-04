const fs = require('fs');

const findMaxLength = () => {
	const input = fs.readFileSync('input.txt', 'utf8').split('\n');
	const [n, c] = input[0].split(' ').map(Number);
	const s = input[1].trim();

	let left = 0;
	let countA = 0; // Количество 'a' в окне
	let countB = 0; // Количество 'b' в окне
	let countPairs = 0; // Количество пар (i, j) с 'a' и 'b'
	let maxLength = 0;

	for (let right = 0; right < n; right++) {
		if (s[right] === 'a') {
			countA++;
		} else if (s[right] === 'b') {
			countB++;
			countPairs += countA; // Каждое 'b' добавляет количество 'a' в текущем окне
		}

		// Отладочный вывод
		console.log(`Right: ${right}, Char: ${s[right]}, CountA: ${countA}, CountB: ${countB}, CountPairs: ${countPairs}`);

		// Проверяем, превышает ли грубость допустимое значение
		while (countPairs > c) {
			if (s[left] === 'a') {
				// Уменьшаем количество 'a'
				countA--;
				// Уменьшаем количество пар, поскольку удаляем 'a'
				countPairs -= countB; // Пары зависят от оставшихся 'b'
			} else if (s[left] === 'b') {
				// Уменьшаем количество 'b'
				countB--;
				// Уменьшаем количество пар, учитывая оставшиеся 'a'
				// countPairs -= countA; // Пары зависят от оставшихся 'a'
			}
			left++; // Двигаем левый указатель
		}


		// Обновляем максимальную длину подстроки
		maxLength = Math.max(maxLength, right - left + 1);
	}

	return maxLength;
};

const result = findMaxLength();
fs.writeFileSync('output.txt', result.toString());
