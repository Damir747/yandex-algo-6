const fs = require('fs');

// Чтение данных из файла
const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');

// Парсинг входных данных
const V = parseInt(input[0], 10); // Количество вершин
const edges = input.slice(1).map(line => line.split(' ').map(Number));

// Построение графа
const tree = Array.from({ length: V + 1 }, () => []);
edges.forEach(([u, v]) => {
	tree[u].push(v);
	tree[v].push(u);
});

// Результат для хранения размера поддерева каждой вершины
const subtreeSizes = Array(V + 1).fill(0);

// Вспомогательная функция для подсчета размеров поддеревьев
function calculateSubtreeSizes(node, parent) {
	let size = 1; // Текущая вершина считается частью поддерева
	for (const neighbor of tree[node]) {
		if (neighbor !== parent) { // Избегаем обратного хода к родителю
			size += calculateSubtreeSizes(neighbor, node);
		}
	}
	subtreeSizes[node] = size;
	return size;
}

// Запускаем DFS из корня (вершина 1)
calculateSubtreeSizes(1, -1);

// Формируем результат
const result = subtreeSizes.slice(1).join(' '); // Убираем нулевой элемент (не используется)

// Записываем результат в файл
fs.writeFileSync('output.txt', result);
