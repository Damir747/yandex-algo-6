const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const countPairs = () => {
	const lines = fileContent.toString().split('\n');
	if (lines.length > 0) {

		const n = Number(lines[0].split(' ')[0]);
		const r = Number(lines[0].split(' ')[1]);
		const d = lines[1].split(' ').map(Number);

		let count = 0;
		let right = 0;

		for (let left = 0; left < n; left++) {
			while (right < n && d[right] - d[left] <= r) {
				right++;
			}
			count += n - right;
		}

		return count;

	}
	return 'Не удалось прочитать файл.';
};

fs.writeFileSync('output.txt', countPairs().toString());