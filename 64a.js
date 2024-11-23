const fs = require('fs');

// Функция для подсчета уровней родословной
function calculateHeights(n, relations) {
	const parentMap = new Map();

	// Заполняем карту потомок → родитель
	relations.forEach(([child, parent]) => {
		if (!parentMap.has(parent)) {
			parentMap.set(parent, new Set());
		}
		parentMap.get(parent).add(child);
	});
	console.log('Дерево:', parentMap);

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
	console.log('Корень:', root);

	function traverseBFS(tree, root) {
		const queue = [{ node: root, depth: 0 }];
		const result = [];

		while (queue.length > 0) {
			const { node, depth } = queue.shift();
			result.push('.'.repeat(depth) + node);

			const children = tree.get(node);
			if (children) {
				for (const child of children) {
					queue.push({ node: child, depth: depth + 1 });
				}
			}
		}

		return result.join('\n');
	}
	console.log('Обход дерева в ширину:');
	console.log(traverseBFS(parentMap, root));

	function traverseDFS(tree, node, depth = 0) {
		let result = '.'.repeat(depth) + node + '\n';
		const children = tree.get(node);
		if (children) {
			for (const child of children) {
				result += traverseDFS(tree, child, depth + 1);
			}
		}
		return result;
	}

	console.log('Обход дерева в глубину:');
	console.log(traverseDFS(parentMap, root));

	function determineLevels(tree, root) {
		const levels = new Map();
		const queue = [{ node: root, level: 0 }];

		while (queue.length > 0) {
			const { node, level } = queue.shift();
			levels.set(node, level);

			const children = tree.get(node);
			if (children) {
				for (const child of children) {
					queue.push({ node: child, level: level + 1 });
				}
			}
		}

		return levels;
	}

	const levels = determineLevels(parentMap, root);
	console.log(levels);
	sortedPeople = [...levels].sort((a, b) => a[0].localeCompare(b[0]));
	console.log('Уровни узлов:');
	for (const [node, level] of levels) {
		console.log(`${node} ${level}`);
	}


	// Формируем результат
	return sortedPeople.map(person => `${person[0]} ${person[1]}`).join('\n');
}

// Чтение данных
const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');
const n = parseInt(input[0], 10);
const relations = input.slice(1).map(line => line.trim().split(' '));

// Вычисляем высоты
const result = calculateHeights(n, relations);

// Запись результата
fs.writeFileSync('output.txt', result);
