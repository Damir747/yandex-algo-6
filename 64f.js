const fs = require('fs');

// Чтение входных данных
const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');
const N = parseInt(input[0], 10);
const managers = input[1].split(' ').map(Number);

// Строим дерево подчиненных
const tree = Array.from({ length: N + 1 }, () => []);
const subordinatesCount = Array(N + 1).fill(0); // Количество подчиненных
const coins = Array(N + 1).fill(0); // Сумма денег для каждого сотрудника
const transfers = Array(N + 1).fill(0); // Количество передач для каждого сотрудника

managers.forEach((manager, i) => {
	const employee = i + 2; // Номер сотрудника (начиная с 2)
	tree[manager].push(employee); // Добавляем подчиненного в список начальника
	subordinatesCount[manager]++;
});

// Обработка сотрудников снизу вверх
function processCoins() {
	const queue = [];

	// Находим всех сотрудников без подчиненных (листья дерева)
	for (let i = 2; i <= N; i++) {
		if (subordinatesCount[i] === 0) {
			queue.push(i);
			coins[i] = 1; // Лист получает 1 монету
			transfers[i] = 1; // Лист делает 1 передачу
		}
	}

	// Обрабатываем сотрудников снизу вверх
	while (queue.length > 0) {
		const current = queue.shift(); // Берем текущего сотрудника
		const manager = managers[current - 2]; // Его начальник

		if (manager) {
			// Передаем сумму денег и количество передач начальнику
			coins[manager] += coins[current] + transfers[current];
			transfers[manager] += transfers[current];

			// Уменьшаем количество подчиненных у начальника
			subordinatesCount[manager]--;
			if (subordinatesCount[manager] === 0) {
				queue.push(manager); // Если начальник больше не имеет подчиненных, добавляем его в очередь
				coins[manager] += 1; // Начальник получает 1 монету
				transfers[manager] += 1; // Начальник делает 1 передачу
			}
		}
	}

}

// Вычисляем монеты
processCoins();

// Формируем результат
const result = coins.slice(1).join(' ');

// Записываем результат в файл
fs.writeFileSync('output.txt', result);
