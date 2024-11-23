const fs = require('fs');

// Строим дерево с помощью Map: родитель -> потомки
function buildTree(relations) {
	const parentMap = new Map();

	// Заполняем карту потомков -> родитель
	relations.forEach(([child, parent]) => {
		if (!parentMap.has(parent)) {
			parentMap.set(parent, new Set());
		}
		parentMap.get(parent).add(child);
	});

	// Находим корень дерева
	function findRoot(tree) {
		const allNodes = new Set(tree.keys());  // Все ключи дерева (родители)
		const children = new Set();

		// Собираем всех детей
		for (const descendants of tree.values()) {
			for (const child of descendants) {
				children.add(child);
			}
		}

		// Корень - это единственный узел, который не является потомком
		for (const child of children) {
			allNodes.delete(child);
		}

		return Array.from(allNodes)[0]; // Корень остаётся единственным элементом
	}

	const root = findRoot(parentMap);

	// Теперь создадим depthMap (глубина каждого узла) и childMap (список потомков каждого родителя)
	const depthMap = new Map();
	const childMap = new Map();

	// Инициализируем depthMap для корня
	depthMap.set(root, 0);

	// Функция для обхода дерева и вычисления глубины и потомков
	function calculateDepthAndChildren(node, parent = {}, depth) {
		childMap.set(node, parent);
		const children = parentMap.get(node) || [];
		children.forEach(child => {
			depthMap.set(child, depth + 1);
			calculateDepthAndChildren(child, node, depth + 1);  // Рекурсивный обход для вычисления глубины
		});
	}

	// Начинаем обход с корня
	calculateDepthAndChildren(root, {}, 0);

	return { parentMap, depthMap, childMap };
}


// Нахождение наименьшего общего предка (LCA) двух элементов
function findLCA(node1, node2, childMap, depthMap) {
	// Сначала приводим оба узла к одной глубине
	while (depthMap.get(node1) > depthMap.get(node2)) {
		node1 = childMap.get(node1);
	}
	while (depthMap.get(node2) > depthMap.get(node1)) {
		node2 = childMap.get(node2);
	}

	// Теперь поднимаемся по дереву одновременно, пока не найдем общий предок
	while (node1 !== node2) {
		node1 = childMap.get(node1);
		node2 = childMap.get(node2);
	}

	return node1; // Найден общий предок
}

// Чтение данных
const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');
const n = parseInt(input[0], 10);
let queries = input.slice(1).map(line => line.trim().split(' '));
const relations = queries.slice(0, n - 1);
queries = queries.slice(n - 1);

// Строим дерево
const { parentMap, depthMap, childMap } = buildTree(relations);
// Вычисляем количество потомков
let result = '';
queries.forEach(([node1, node2]) => {
	result = result + findLCA(node1, node2, childMap, depthMap) + '\n';
})

// Запись результата
fs.writeFileSync('output.txt', result);