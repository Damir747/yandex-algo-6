const fs = require('fs');

// Чтение входных данных
const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');
const [n, m, k] = input[0].split(' ').map(Number);
const edges = input.slice(1).map(line => line.split(' ').map(Number));

// Функция для построения графа
function buildGraph(n, edges) {
	const graph = Array.from({ length: n + 1 }, () => []);
	edges.forEach(([a, b]) => {
		graph[a].push(b);
		graph[b].push(a);
	});
	return graph;
}

// Функция для поиска цикла в неориентированном графе с помощью DFS
function hasCycle(graph, n) {
	const visited = new Array(n + 1).fill(false); // Массив для отслеживания посещённых вершин

	// DFS для поиска цикла, с учётом родительской вершины
	function dfs(v, parent) {
		visited[v] = true;

		for (const neighbor of graph[v]) {
			// Если сосед ещё не посещён, продолжаем обход
			if (!visited[neighbor]) {
				if (dfs(neighbor, v)) {
					return true; // Цикл найден
				}
			}
			// Если сосед уже посещён и не является родителем, цикл найден
			else if (neighbor !== parent) {
				return true; // Цикл найден
			}
		}
		return false; // Цикла нет
	}

	// Проверяем все компоненты графа
	for (let i = 1; i <= n; i++) {
		if (!visited[i]) {
			if (dfs(i, -1)) {  // Начинаем обход с вершины i
				return true; // Цикл найден
			}
		}
	}

	return false; // Цикла нет
}

// Функция для поиска компонентов связности
function findComponents(n, graph) {
	const visited = new Array(n + 1).fill(false);
	const components = [];

	function dfs(v, component) {
		visited[v] = true;
		component.push(v);
		graph[v].forEach(neighbor => {
			if (!visited[neighbor]) {
				dfs(neighbor, component);
			}
		});
	}

	for (let i = 1; i <= n; i++) {
		if (!visited[i]) {
			const component = [];
			dfs(i, component);
			components.push(component);
		}
	}
	return components;
}

// Функция для вычисления факториала с использованием BigInt
function factorial(n) {
	let result = BigInt(1);
	for (let i = BigInt(2); i <= BigInt(n); i++) {
		result *= i;
	}
	return result;
}

// Функция для раскраски вершин
function colorComponents(components, graph) {
	return components.map(component => {
		const colors = Array(component.length).fill('green');  // Все вершины по умолчанию зеленые
		const degreeMap = {};  // Степени вершин

		// Step 1: Count degrees for each vertex in component
		component.forEach(v => {
			degreeMap[v] = graph[v].filter(neighbor => component.includes(neighbor)).length;
		});

		console.log('Степени вершин в компоненте:', degreeMap); // Выводим степени вершин

		// Step 2: Assign initial colors
		component.forEach((v, i) => {
			if (degreeMap[v] <= 1) {
				colors[i] = 'green';  // Листья (зелёные)
			} else {
				colors[i] = 'blue';  // Все остальные — синие на данном этапе
			}
		});

		// Step 3: Раскрашиваем синие вершины
		component.forEach((v, i) => {
			if (colors[i] === 'blue') {
				const neighbors = graph[v].filter(neighbor => component.includes(neighbor));
				let greenCount = 0;
				let blueCount = 0;

				// Проверяем связи с соседними вершинами
				neighbors.forEach(neighbor => {
					if (degreeMap[neighbor].length === 1) { // Если сосед зелёный
						greenCount++;
					} else if (colors[component.indexOf(neighbor)] === 'blue') { // Если сосед синий
						blueCount++;
					}
				});

				// Логика для раскраски синих вершин
				if (blueCount === 0 && greenCount === neighbors.length) {
					colors[i] = 'purple';  // Если все связи с зелёными — фиолетовый
				} else if (blueCount === 1) {
					colors[i] = 'red';  // Если 1 синяя связь — красный
				} else if (blueCount === 2) {
					colors[i] = 'orange';  // Если 2 синих связи — оранжевый
				} else if (blueCount >= 3) {
					colors[i] = 'error';  // Если 3 или больше синих связей — ошибка
				}
			}
		});

		return { component, colors };
	});
}

// Функция для подсчета количества способов расположения дятлов в компоненте
function calculateWays(components, graph) {
	let totalWays = BigInt(1);  // Начинаем с единицы
	let prev = BigInt(0);

	components.forEach(({ component, colors }) => {
		// Разделяем вершины по цветам
		const greenLeaves = component.filter((v, i) => colors[i] === 'green').length;
		const redOrOrange = component.filter((v, i) => colors[i] === 'red' || colors[i] === 'orange').length;
		const blue = component.filter((v, i) => colors[i] === 'blue').length;
		const purple = component.filter((v, i) => colors[i] === 'purple').length;

		console.log(`Компонента [${component.join(', ')}], Зеленые листья: ${greenLeaves}, Красные/Оранжевые: ${redOrOrange}, Синие: ${blue}, Фиолетовые: ${purple}`);

		// Если дерево вида 3: 1 фиолетовая вершина + зеленые
		if (purple === 1 && blue === 0) {
			totalWays *= BigInt(greenLeaves);
			totalWays *= BigInt(2);  // Умножаем на 2
		}
		// Если дерево вида 2: 2 синие вершины
		else if (blue === 2 && greenLeaves === 0) {
			totalWays *= BigInt(2);  // Два способа расположить два листа
		}
		// Если дерево вида 1: зеленые и красные/оранжевые вершины
		else if (greenLeaves > 0 && redOrOrange > 0) {
			totalWays *= factorial(greenLeaves);  // Произведение факториалов от количества зеленых
			totalWays *= BigInt(4);  // Умножаем на 4 (горизонтальное и вертикальное расположение)
		}
		// Если это какой-то другой случай
		else {
			if (prev > 0n) {
				if (component.length === 1) {
					totalWays *= (prev + BigInt(2));
				} else {
					totalWays *= BigInt(2);
				}
			}
		}
		prev = BigInt(component.length);
		console.log(totalWays);
	});

	return totalWays % BigInt(k);
}

// Функция для решения задачи
function solution() {
	const graph = buildGraph(n, edges);

	console.log('Граф:', graph);

	// Проверка на цикл в графе
	if (hasCycle(graph, n)) {
		console.log('Цикл найден, ответ 0');
		return 0;
	}

	const components = findComponents(n, graph);
	const coloredComponents = colorComponents(components, graph);

	// Теперь считаем количество способов для всех компонент
	return calculateWays(coloredComponents, graph);
}

// Записываем результат в файл
fs.writeFileSync('output.txt', solution().toString());