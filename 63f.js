const fs = require('fs');

function buildMinimalPSP(n, w, s) {
	// Определяем порядок скобок из строки w
	const openBrackets = w.indexOf('(') < w.indexOf('[') ? ['(', '['] : ['[', '('];
	const closeBrackets = w.indexOf('(') < w.indexOf('[') ? [')', ']'] : [']', ')'];

	// Маппинг открывающих скобок на соответствующие закрывающие
	const bracketMap = {
		[openBrackets[0]]: closeBrackets[0],
		[openBrackets[1]]: closeBrackets[1],
	};

	let result = s;
	const stack = [];

	// Обрабатываем строку s, учитывая уже открытые и закрытые скобки
	for (const char of s) {
		if (openBrackets.includes(char)) {
			stack.push(char);  // Открываем скобку
		} else if (closeBrackets.includes(char)) {
			if (stack.length > 0 && bracketMap[stack[stack.length - 1]] === char) {
				stack.pop();  // Закрываем скобку, если она соответствует
			}
		}
	}

	// Пока длина строки меньше n, добавляем скобки
	while (result.length < n) {
		// Закрываем младшие скобки, если они есть
		while (stack.length > 0 && stack[stack.length - 1] === openBrackets[0]) {
			result += closeBrackets[0];
			stack.pop();
		}

		// Открываем пары, если есть место
		while (result.length + stack.length < n) {
			result += openBrackets[0] + closeBrackets[0];
		}

		// Закрываем остальные скобки, если они есть
		if (stack.length > 0) {
			const lastOpen = stack.pop();
			result += bracketMap[lastOpen];
		}
	}

	return result;
}

// Чтение данных из файла
const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');
const n = parseInt(input[0], 10);
const w = input[1];
const s = input[2] || '';

// Построение минимальной ПСП
const minimalPSP = buildMinimalPSP(n, w, s);

// Запись результата в файл
fs.writeFileSync('output.txt', minimalPSP);
