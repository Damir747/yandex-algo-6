const fs = require('fs');

// Функция для вычисления значения арифметического выражения
function evaluateExpression(expression) {
	const operators = []; // Стек для операторов
	const values = []; // Стек для чисел
	let i = 0;
	let lastChar = ''; // Последний символ (для проверки корректности)

	// Функция для применения оператора
	function applyOperator() {
		const operator = operators.pop();
		const right = values.pop();
		const left = values.pop();

		switch (operator) {
			case '+':
				values.push(left + right);
				break;
			case '-':
				values.push(left - right);
				break;
			case '*':
				values.push(left * right);
				break;
			case '/':
				if (right === 0) return 'WRONG'; // Ошибка: деление на ноль
				values.push(Math.floor(left / right)); // Целочисленное деление
				break;
		}
	}

	// Обрабатываем каждый символ в строке
	while (i < expression.length) {
		const token = expression[i];

		if (/\d/.test(token)) { // Если это цифра
			// Проверка на корректность после числа
			if (lastChar === ')' || lastChar === 'number') return 'WRONG';

			let num = '';
			while (i < expression.length && /\d/.test(expression[i])) {
				num += expression[i];
				i++;
			}
			values.push(parseInt(num)); // Добавляем число в стек

			lastChar = 'number';
			continue;
		} else if (token === '(') { // Открывающая скобка
			if (lastChar === ')' || lastChar === 'number') return 'WRONG';

			operators.push(token);
			// Проверка на корректность после скобки
			lastChar = '(';
		} else if (token === ')') { // Закрывающая скобка
			// Проверка на корректность после скобки
			if (lastChar === '+-*/') return 'WRONG';

			while (operators.length && operators[operators.length - 1] !== '(') {
				applyOperator(); // Применяем операторы до тех пор, пока не встретим открывающуюся скобку
			}
			if (!operators.length) return 'WRONG'; // Если нет открывающей скобки
			operators.pop(); // Убираем '('

			lastChar = ')';
		} else if ('+-*/'.includes(token)) { // Оператор
			// Если перед оператором нет числа, ошибка
			if (!lastChar || lastChar === '(' || lastChar === '+-*/') return 'WRONG';

			while (operators.length && precedence(operators[operators.length - 1]) >= precedence(token)) {
				applyOperator(); // Применяем операторы с учетом приоритета
			}
			operators.push(token);

			lastChar = '+-*/'; // После оператора должен быть операнд
		} else if (token !== ' ') {
			return 'WRONG'; // Некорректный символ
		}

		i++;
	}

	if (lastChar === '(' || lastChar === '+-*/') {
		return 'WRONG'; // Некорректное выражение
	}

	// Проверка на незакрытые скобки
	if (operators.includes('(')) {
		return 'WRONG'; // Если остались незакрытые '(' в стеке
	}

	// Применяем оставшиеся операторы
	while (operators.length) {
		applyOperator();
	}

	// Результат вычисления
	return values.length === 1 ? values[0] : 'WRONG';
}

// Функция для проверки приоритета операторов
function precedence(op) {
	if (op === '+' || op === '-') return 1;
	if (op === '*' || op === '/') return 2;
	return 0;
}

// Основная логика
let fileContent = fs.readFileSync('input.txt', 'utf8').trim();

const result = evaluateExpression(fileContent);

fs.writeFileSync('output.txt', result.toString());
