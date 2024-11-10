const fs = require('fs');

// Чтение данных из файла
const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');
const n = parseInt(input[0], 10);

// Инициализация стека и массива для хранения сумм
const stack = [];
const sumStack = [];
let output = '';

// Обработка каждой операции
for (let i = 1; i <= n; i++) {
	const command = input[i];

	if (command.startsWith('+')) {
		// Операция добавления
		const x = parseInt(command.slice(1), 10);
		stack.push(x);
		// Обновляем сумму для нового элемента
		sumStack.push((sumStack.length > 0 ? sumStack[sumStack.length - 1] : 0) + x);

	} else if (command.startsWith('-')) {
		// Операция удаления
		const removedElement = stack.pop();
		sumStack.pop();
		output += `${removedElement}\n`;

	} else if (command.startsWith('?')) {
		// Операция подсчета суммы
		const k = parseInt(command.slice(1), 10);
		const topSum = sumStack[sumStack.length - 1];
		const bottomSum = sumStack[sumStack.length - k - 1] || 0;
		output += `${topSum - bottomSum}\n`;
	}
}

// Запись результата в файл
fs.writeFileSync('output.txt', output.trim());
