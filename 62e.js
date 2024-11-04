const fs = require('fs');

// Чтение данных из файла
let fileContent = fs.readFileSync('input.txt', 'utf8');
const lines = fileContent.toString().split('\n');

if (lines.length > 0) {
	const n = Number(lines[0]);
	const arr = lines[1].split(' ').map(Number);

	// Сортируем массив
	arr.sort((a, b) => a - b);

	const result = [];
	let left, right;
	let takeLeft = true;

	// Если длина нечётная, сначала берём центральный элемент
	if (n % 2 === 1) {
		const mid = Math.floor(n / 2);
		result.push(arr[mid]);
		left = mid - 1;   // левый указатель
		right = mid + 1;  // правый указатель
	} else {
		// Если длина чётная, начинаем с середины
		left = Math.floor((n - 1) / 2);
		right = left + 1;
	}

	// Чередуем левые и правые элементы
	while (left >= 0 || right < n) {
		if (takeLeft) {
			if (left >= 0) {       // Берем элемент слева, если остались
				result.push(arr[left]);
				left--;
			}
		} else {
			if (right < n) {       // Берем элемент справа, если остались
				result.push(arr[right]);
				right++;
			}
		}
		takeLeft = !takeLeft;
	}

	// Записываем результат в файл
	fs.writeFileSync('output.txt', result.join(' '));
}
