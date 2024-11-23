const fs = require('fs');

function findLCA(n, relations, queries) {
	const parentMap = new Map();

	// Строим карту потомок → родитель
	relations.forEach(([child, parent]) => {
		parentMap.set(child, parent);
	});

	// Функция для нахождения пути от элемента к корню
	function getPathToRoot(person) {
		const path = [];
		while (person) {
			path.push(person);
			person = parentMap.get(person);
		}
		return path;
	}

	// Для каждого запроса находим LCA
	const results = [];
	for (const [a, b] of queries) {
		const pathA = getPathToRoot(a);
		const pathB = getPathToRoot(b);

		// Ищем наибольшего общего предка, сравнивая пути с конца
		let lca = null;
		while (pathA.length > 0 && pathB.length > 0) {
			const ancestorA = pathA.pop();
			const ancestorB = pathB.pop();
			if (ancestorA === ancestorB) {
				lca = ancestorA;
			} else {
				break;
			}
		}
		results.push(lca);
	}

	return results.join('\n');
}

// Чтение данных
const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');
const n = parseInt(input[0], 10);
const relations = input.slice(1, n).map(line => line.split(' '));
const queries = input.slice(n).map(line => line.split(' '));

// Вычисляем LCA для всех запросов
const result = findLCA(n, relations, queries);

// Запись результата
fs.writeFileSync('output.txt', result);
