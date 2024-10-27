const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const foo = () => {
	const lines = fileContent.toString().split('\n');
	if (lines.length > 0) {

		const a = Number(lines[0].split(' ')[0]);
		const b = Number(lines[1].split(' ')[0]);
		const c = Number(lines[2].split(' ')[0]);
		const d = Number(lines[3].split(' ')[0]);

		if (a === 0) return `1 ${c + 1}`;
		if (b === 0) return `1 ${d + 1}`;
		if (c === 0) return `${a + 1} 1`;
		if (d === 0) return `${b + 1} 1`;

		const solutions = [];
		solutions.push([Math.max(a, b) + 1, 1]);
		solutions.push([1, Math.max(c, d) + 1]);
		if (Math.min(a, b) === a && Math.min(c, d) === c || Math.min(a, b) === b && Math.min(c, d) === d) {
			solutions.push([Math.min(a, b) + 1, Math.min(c, d) + 1]);
		}
		const min = Math.min(...solutions.map(el => el[0] + el[1]));
		const result = solutions.find(el => el[0] + el[1] === min);

		return `${result[0]} ${result[1]}`;
	}


	return 'Не удалось прочитать файл.';
};

fs.writeFileSync('output.txt', foo().toString());