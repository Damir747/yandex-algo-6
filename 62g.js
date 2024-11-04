const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const findLongestCensoredSubstring = () => {
	const lines = fileContent.toString().split('\n');
	if (lines.length > 1) {
		const [n, c] = lines[0].split(' ').map(Number);
		const s = lines[1].trim();

		let left = 0; // Указатель на начало подстроки
		let count = 0; // Счетчик грубости
		let maxLength = 0; // Максимальная длина подстроки

		// Счетчик букв 'b' между 'a'
		let bCount = 0;

		for (let right = 0; right < n; right++) {
			// При каждом добавлении 'a' обновляем bCount
			if (s[right] === 'a') {
				count += bCount; // Увеличиваем грубость на текущее количество 'b'
			} else if (s[right] === 'b') {
				bCount++; // Увеличиваем счетчик 'b'
			}

			// Проверяем, если грубость превышает c
			while (count > c) {
				// Убираем символ слева
				if (s[left] === 'a') {
					count -= bCount; // Уменьшаем грубость на количество 'b'
				} else if (s[left] === 'b') {
					bCount--; // Уменьшаем счетчик 'b'
				}
				left++; // Сдвигаем левый указатель
			}

			// Обновляем максимальную длину подстроки
			maxLength = Math.max(maxLength, right - left + 1);
		}

		return maxLength;
	}
	return 0;
};

fs.writeFileSync('output.txt', findLongestCensoredSubstring().toString());
