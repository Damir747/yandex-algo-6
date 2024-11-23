const fs = require('fs');

// Основная функция для решения задачи
function calculateDescendants(n, relations) {
	const parentMap = new Map();

	// Заполняем карту потомок → родитель
	relations.forEach(([child, parent]) => {
		if (!parentMap.has(parent)) {
			parentMap.set(parent, new Set());
		}
		parentMap.get(parent).add(child);
	});
	// console.log('Дерево:', parentMap);

	function findRoot(tree) {
		const allNodes = new Set(tree.keys());
		const children = new Set();

		for (const descendants of tree.values()) {
			for (const child of descendants) {
				children.add(child);
			}
		}

		for (const child of children) {
			allNodes.delete(child);
		}

		return Array.from(allNodes)[0]; // Корнем остается единственный элемент
	}
	const root = findRoot(parentMap);
	// console.log('Корень:', root);

	const descendantsCount = new Map();
	// Итеративный обход в глубину
	function traverseDFS(tree, node) {
		let result = 0;
		const stack = [node]; // Стек для хранения узлов, которые нужно обработать
		const visited = new Set(); // Множество для отслеживания посещенных узлов

		while (stack.length > 0) {
			const currentNode = stack[stack.length - 1];

			// Если узел уже был обработан, удаляем его из стека и считаем потомков
			if (visited.has(currentNode)) {
				stack.pop();
				const children = tree.get(currentNode);
				let count = 0;

				if (children) {
					children.forEach(child => {
						count += 1 + (descendantsCount.get(child) || 0); // Суммируем потомков
					});
				}

				// Сохраняем количество потомков для текущего узла
				descendantsCount.set(currentNode, count);
			} else {
				// Если узел еще не обработан, помечаем его как посещенный и добавляем детей в стек
				visited.add(currentNode);
				const children = tree.get(currentNode);
				if (children) {
					children.forEach(child => {
						stack.push(child); // Добавляем детей в стек для обработки
					});
				}
			}
		}

		return result;
	}

	traverseDFS(parentMap, root);
	sortedPeople = [...descendantsCount].sort((a, b) => a[0].localeCompare(b[0]));
	// Формируем результат
	return sortedPeople.map(person => `${person[0]} ${person[1]}`).join('\n');
}

// Чтение данных
const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');
const n = parseInt(input[0], 10);
const relations = input.slice(1).map(line => line.trim().split(' '));

// Вычисляем количество потомков
const result = calculateDescendants(n, relations);

// Запись результата
fs.writeFileSync('output.txt', result);