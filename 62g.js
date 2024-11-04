const fs = require('fs');

const findMaxLength = () => {
	const input = fs.readFileSync('input.txt', 'utf8').split('\n');
	const [n, c] = input[0].split(' ').map(Number);
	const s = input[1].trim();

	let left = 0;
	let countA = 0; // Количество 'a'
	let countPairs = 0; // Количество пар (i, j) с 'a' и 'b'
	let maxLength = 0;

	for (let right = 0; right < n; right++) {
		// Обновляем количество 'a' и 'b'
		if (s[right] === 'a') {
			countA++;
		} else if (s[right] === 'b') {
			countPairs += countA; // Каждое 'b' добавляет количество 'a' в текущем окне
		}

		// Проверяем, превышает ли грубость допустимое значение
		while (countPairs > c) {
			// Уменьшаем счетчик для левого указателя
			if (s[left] === 'a') {
				countA--;
			} else if (s[left] === 'b') {
				countPairs -= countA; // Вычитаем количество 'a' для всех 'b'
			}
			left++;
		}

		// Обновляем максимальную длину подстроки
		maxLength = Math.max(maxLength, right - left + 1);
	}

	return maxLength;
};

const result = findMaxLength();
fs.writeFileSync('output.txt', result.toString());
