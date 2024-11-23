const fs = require('fs');

// Чтение входных данных
const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');
const N = parseInt(input[0], 10);
const managers = input[1].split(' ').map(Number);

// Строим дерево подчиненных
const tree = Array.from({ length: N + 1 }, () => new Set());
const coins = Array(N + 1).fill(0);  // Монеты для каждого сотрудника

// Строим дерево подчиненных
managers.forEach((manager, i) => {
	const employee = i + 2; // Номер сотрудника (начиная с 2)
	tree[manager].add(employee);
});

// Обработка сотрудников снизу вверх
function processCoins() {
	const queue = [];
	let count = N;

	while (count > 1) {
		// Добавляем сотрудников без подчиненных (листья) в очередь
		for (let i = 2; i <= N; i++) {
			if (tree[i] !== -1 && tree[i].size === 0) {
				queue.push(i);
				coins[i] += 1; // Лист получает 1 монету
			}
		}

		// Обрабатываем сотрудников снизу вверх
		while (queue.length > 0) {
			let current = queue.shift(); // Берем текущего сотрудника из очереди
			tree[current] = -1;	// ну, так увольняем сотрудника
			count--;
			let manager = managers[current - 2]; // Получаем его начальника
			// if (manager && tree[manager].has(current)) {
			tree[manager].delete(current);// Увольняем текущего сотрудника
			// }
			let level = 2; // Начинаем с уровня для непосредственного начальника
			while (manager) {
				coins[manager] += level; // Начальник получает монеты
				level++;  // Увеличиваем уровень для следующего начальника
				manager = managers[manager - 2];  // Ищем начальника текущего начальника
			}
		}
	}

	// Мирко выполняет последнее задание
	coins[1] += 1;
}

// Вычисляем монеты
processCoins();

// Формируем результат
const result = coins.slice(1).join(' ');

// Записываем результат в файл
fs.writeFileSync('output.txt', result);
