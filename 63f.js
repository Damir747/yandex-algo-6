const fs = require('fs');

// Функция для построения минимальной правильной скобочной последовательности
function buildMinimalPSP(n, w, s) {
	// Парсим скобки на открывающие и закрывающие
	const openBrackets = ['(', '['];
	const closeBrackets = [')', ']'];
	const pair = { ')': '(', ']': '[' }; // Создаем пары скобок
	const priority = { [w[0]]: 0, [w[1]]: 1, [w[2]]: 2, [w[3]]: 3 }; // Приоритет

	const result = []; // Результирующая строка
	const stack = [];  // Стек для отслеживания открытых скобок
	let balance = 0;   // Баланс скобок

	// Инициализируем результат начальной строкой
	for (let char of s) {
		result.push(char);
		if (openBrackets.includes(char)) {
			stack.push(char); // Записываем открывающие скобки в стек
			balance++;
		} else {
			stack.pop(); // Убираем последнюю открытую скобку
			balance--;
		}
	}

	// Добавляем открывающие скобки до баланса
	for (let i = result.length; i < n; i++) {
		for (let j = 0; j < 4; j++) {
			if (pair[w[j]] && pair[w[j]] === stack[stack.length - 1]) {
				result.push(w[j]);
				stack.pop();
				balance--;
				break;
			} else if (balance < (n - i)) {
				if (openBrackets.includes(w[j])) {
					result.push(w[j]);
					stack.push(w[j]);
					balance++;
					break;
				}
			}
		}
	}
	return result.join('');
}

// Чтение данных из файла
const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');
const n = parseInt(input[0], 10);
const w = input[1].trim().split('');
const s = input[2] || '';

// Построение минимальной ПСП
const minimalPSP = buildMinimalPSP(n, w, s);

// Запись результата в файл
fs.writeFileSync('output.txt', minimalPSP);
