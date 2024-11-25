const fs = require('fs');

const MOD = 10 ** 9 + 7;

// Функция для вычисления факториала по модулю MOD
function factorial(n) {
	const fact = [1];
	for (let i = 1; i <= n; i++) {
		fact[i] = (fact[i - 1] * i) % MOD;
	}
	return fact;
}

// Функция для вычисления сочетания по модулю MOD (C(n, k) = n! / (k! * (n-k)!))
function comb(n, k, fact) {
	if (k > n || k < 0) return 0;
	return (fact[n] * modInverse(fact[k], MOD) % MOD) * modInverse(fact[n - k], MOD) % MOD;
}

// Функция для вычисления обратного по модулю числа через расширенный алгоритм Евклида
function modInverse(a, m) {
	let m0 = m, y = 0, x = 1;
	if (m === 1) return 0;
	while (a > 1) {
		let q = Math.floor(a / m);
		let t = m;
		m = a % m;
		a = t;
		t = y;
		y = x - q * y;
		x = t;
	}
	if (x < 0) x += m0;
	return x;
}

// Динамическое программирование для подсчёта количества топологических сортировок
function solve(N, edges) {
	const tree = Array.from({ length: N + 1 }, () => []);
	const fact = factorial(N); // вычисляем факториалы для сочетаний

	// Строим дерево
	for (let [a, b] of edges) {
		tree[a].push(b);
	}

	// dp[i] - количество топологических сортировок поддерева с корнем в i
	const dp = Array(N + 1).fill(1);
	const size = Array(N + 1).fill(1); // размер поддерева для вершины

	// Для обхода дерева используем DFS
	function dfs(u) {
		for (let v of tree[u]) {
			dfs(v);
			// После обработки всех поддеревьев, считаем количество сортировок для текущего узла
			dp[u] = dp[u] * dp[v] % MOD;
			size[u] += size[v];
			// Умножаем на количество способов вставить поддерево v в поддерево u
			dp[u] = dp[u] * comb(size[u] - 1, size[v] - 1, fact) % MOD;
		}
	}

	// Запускаем DFS от корня (вершины 1)
	dfs(1);

	// Ответ - количество топологических сортировок для всего дерева
	return dp[1];
}

// Чтение входных данных из файла
const input = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');
const N = parseInt(input[0], 10);
const edges = input.slice(1).map(line => line.split(' ').map(Number));

// Решение
const result = solve(N, edges);

// Запись результата в файл
fs.writeFileSync('output.txt', result.toString());
