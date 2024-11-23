const fs = require('fs');

function calculateDescendants(n, relations) {
	const childrenMap = new Map(); // Родитель → множество потомков
	const descendantCounts = new Map(); // Имя → число потомков

	// Строим карту родителей → список их детей
	relations.forEach(([child, parent]) => {
		if (!childrenMap.has(parent)) {
			childrenMap.set(parent, new Set());
		}
		childrenMap.get(parent).add(child);
	});

	// Собираем всех людей
	const allPeople = new Set(childrenMap.keys());
	relations.forEach(([child]) => allPeople.add(child));

	// Функция для вычисления числа потомков
	function countDescendants(person) {
		if (descendantCounts.has(person)) {
			return descendantCounts.get(person);
		}

		if (!childrenMap.has(person)) {
			descendantCounts.set(person, 0);
			return 0;
		}

		let count = 0;
		for (const child of childrenMap.get(person)) {
			count += 1 + countDescendants(child); // 1 за самого потомка + все его потомки
		}

		descendantCounts.set(person, count);
		return count;
	}

	// Находим корень дерева (родоначальника)
	const root = Array.from(allPeople).find(person => !relations.some(([child]) => child === person));

	// Рекурсивно вычисляем число потомков для всех
	countDescendants(root);

	// Сортируем людей лексикографически
	const sortedPeople = Array.from(allPeople).sort();

	// Формируем результат
	return sortedPeople.map(person => `${person} ${descendantCounts.get(person)}`).join('\n');
}

// Чтение данных из файла
const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');
const n = parseInt(input[0], 10);
const relations = input.slice(1).map(line => line.split(' '));

// Вычисляем число потомков
const result = calculateDescendants(n, relations);

// Запись результата
fs.writeFileSync('output.txt', result);
