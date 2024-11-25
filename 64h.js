const fs = require("fs");

// Чтение данных
const input = fs.readFileSync("input.txt", "utf-8").trim().split("\n");
const N = parseInt(input[0], 10);

const edges = input.slice(1, N).map(line => line.split(" ").map(Number));
const costs = input[N].split(" ").map(Number);

// Построение дерева
const tree = Array.from({ length: N + 1 }, () => []);
for (const [v, u] of edges) {
	tree[v].push(u);
	tree[u].push(v);
}

// Инициализация DP
const dp = Array.from({ length: N + 1 }, () => [0, 0]);
const marked = new Set();
const visited = Array(N + 1).fill(false);

// DFS для вычисления DP
function dfs(node) {
	visited[node] = true;
	dp[node][0] = 0; // Стоимость, если вершина не помечена
	dp[node][1] = costs[node - 1]; // Стоимость, если вершина помечена

	for (const neighbor of tree[node]) {
		if (!visited[neighbor]) {
			dfs(neighbor);
			dp[node][0] += dp[neighbor][1]; // Если текущая не помечена, дети должны быть помечены
			dp[node][1] += Math.min(dp[neighbor][0], dp[neighbor][1]); // Дети могут быть любыми
		}
	}
}

// Восстановление ответа
function restore(node, parentMarked) {
	visited[node] = true;
	if (parentMarked || dp[node][1] <= dp[node][0]) {
		marked.add(node); // Помечаем вершину
		for (const neighbor of tree[node]) {
			if (!visited[neighbor]) {
				restore(neighbor, true); // Если пометили родителя, дети могут быть любыми
			}
		}
	} else {
		for (const neighbor of tree[node]) {
			if (!visited[neighbor]) {
				restore(neighbor, false); // Родитель не помечен, дети обязательно помечены
			}
		}
	}
}

// Вычисление DP и восстановление результата
dfs(1);
visited.fill(false);
restore(1, false);

// Формирование ответа
const result = [...marked];
const totalCost = result.reduce((sum, v) => sum + costs[v - 1], 0);

const output = `${totalCost} ${result.length}\n${result.join(" ")}`;
fs.writeFileSync("output.txt", output);
