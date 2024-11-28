const fs = require('fs');

// Чтение входных данных
const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');
const n = parseInt(input[0], 10);
const edges = input.slice(1).map(line => line.split(' ').map(Number));

// Построение графа
const graph = Array.from({ length: n + 1 }, () => []);
for (const [u, v] of edges) {
	graph[u].push(v);
	graph[v].push(u);
}

// BFS для нахождения расстояний
function bfs(start) {
	const dist = Array(n + 1).fill(-1);
	const queue = [start];
	dist[start] = 0;

	while (queue.length > 0) {
		const node = queue.shift();
		for (const neighbor of graph[node]) {
			if (dist[neighbor] === -1) {
				dist[neighbor] = dist[node] + 1;
				queue.push(neighbor);
			}
		}
	}

	const farthestNode = dist.indexOf(Math.max(...dist));
	return { farthestNode, dist };
}

// 1. Найти диаметр дерева
const { farthestNode: startNode } = bfs(1); // Шаг 1: произвольная вершина
const { farthestNode: endNode, dist: distFromStart } = bfs(startNode); // Шаг 2: самый дальний узел от startNode


// 2. Найти вершины на диаметре
const diameterPath = [];
let current = endNode;
while (current !== startNode) {
	diameterPath.push(current);
	for (const neighbor of graph[current]) {
		if (distFromStart[neighbor] + 1 === distFromStart[current]) {
			current = neighbor;
			break;
		}
	}
}
diameterPath.push(startNode);
diameterPath.reverse(); // Полный путь по диаметру

// 3. Рассчитать максимальное произведение
let maxProduct = 0;

console.log(graph);
function dfs(node, parent) {
	const dist = Array(n + 1).fill(-1);
	const queue = [node];
	dist[node] = 0;

	while (queue.length > 0) {
		const node = queue.shift();
		for (const neighbor of graph[node]) {
			if (parent !== neighbor && dist[neighbor] === -1) {
				dist[neighbor] = dist[node] + 1;
				queue.push(neighbor);
			}
		}
	}

	const farthestNode = dist.indexOf(Math.max(...dist));
	return { farthestNode, dist };
}


function calculateDepths(node, parent) {
	let maxDepths = [0, 0]; // Два максимальных пути

	for (const neighbor of graph[node]) {
		console.log(neighbor);
		if (neighbor !== parent) {
			// Рекурсивный вызов для получения глубины от потомка
			const depth = calculateDepths(neighbor, node) + 1;

			// Обновляем два максимальных пути
			if (depth > maxDepths[0]) {
				maxDepths = [depth, maxDepths[0]];
			} else if (depth > maxDepths[1]) {
				maxDepths[1] = depth;
			}
		}
		console.log(maxDepths);
	}

	// Сохраняем копию массива maxDepths для текущей вершины
	depths[node] = [...maxDepths];
	return maxDepths[0]; // Возвращаем максимальную глубину для родителя
}

// Инициализация
const depths = Array.from({ length: n + 1 }, () => [0, 0]);
for (const node of graph) {
	for (const neighbor of node) {
		const { farthestNode, dist } = dfs(neighbor, -1);
		depths[node][0] = dist;
		const { farthestNode: farthestNode1, dist: dist1 } = dfs(neighbor, farthestNode);
		depths[node][1] = dist1;
	}
}
// Результат
console.log('Глубины узлов:', depths);

// Проход по всем парам соседей на диаметре
for (let i = 0; i < diameterPath.length; i++) {
	const leftNode = diameterPath[i];
	graph[leftNode].forEach(rightNode => {
		const { farthestNode: startNodeLeft } = dfs(leftNode, rightNode);
		const { farthestNode: endNodeLeft, dist: distFromStartLeft } = dfs(startNodeLeft, rightNode); // Шаг 2: самый дальний узел от startNode

		const { farthestNode: startNodeRight } = dfs(rightNode, leftNode);
		const { farthestNode: endNodeRight, dist: distFromStartRight } = dfs(startNodeRight, leftNode); // Шаг 2: самый дальний узел от startNode

		// Обновить максимальное произведение
		maxProduct = Math.max(maxProduct, distFromStartLeft[endNodeLeft] * distFromStartRight[endNodeRight]);
	}
	);
}



// Запись результата
fs.writeFileSync('output.txt', maxProduct.toString());