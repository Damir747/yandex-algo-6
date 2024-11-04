const fs = require('fs');

// Чтение данных из файла
let fileContent = fs.readFileSync('input.txt', 'utf8');
const lines = fileContent.toString().split('\n');

if (lines.length > 0) {
	const n = Number(lines[0]);
	const arr = lines[1].split(' ').map(Number);

	// Функция для нахождения медианы и её удаления
	function removeMedians(arr) {
		const result = [];
		let sortedArr = [];

		while (arr.length > 0) {
			// Сортируем текущий массив
			sortedArr = arr.slice().sort((a, b) => a - b);
			let median;

			const len = sortedArr.length;
			if (len % 2 === 1) {
				// Если длина нечетная, берем средний элемент
				median = sortedArr[Math.floor(len / 2)];
			} else {
				// Если длина четная, берем меньшее из двух средних
				median = Math.min(sortedArr[len / 2 - 1], sortedArr[len / 2]);
			}

			result.push(median);

			// Удаляем первое вхождение медианы из оригинального массива
			const index = arr.indexOf(median);
			if (index !== -1) {
				arr.splice(index, 1);
			}
		}

		return result;
	}

	const output = removeMedians(arr);
	fs.writeFileSync('output.txt', output.join(' '));
}
