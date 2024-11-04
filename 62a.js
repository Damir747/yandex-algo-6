const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const prefixSums = () => {
	const lines = fileContent.toString().split('\n');
	if (lines.length > 0) {

		const n = Number(lines[0].split(' ')[0]);
		const arr = lines[1].split(' ').map(Number);
		console.log(n, arr);
		for (let i = 0; i < n; i++) {
			arr[i] += arr[i - 1] || 0;
		}
		return arr.join(' ');

	}
	return 'Не удалось прочитать файл.';
};

fs.writeFileSync('output.txt', prefixSums().toString());