const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const foo = () => {
	const lines = fileContent.toString().split('\n');
	if (lines.length > 0) {

		const x1 = Number(lines[0].split(' ')[0]);
		const y1 = Number(lines[1].split(' ')[0]);
		const x2 = Number(lines[2].split(' ')[0]);
		const y2 = Number(lines[3].split(' ')[0]);
		const x = Number(lines[4].split(' ')[0]);
		const y = Number(lines[5].split(' ')[0]);

		if (x > x1 && x < x2) {
			if (y < y1) {
				return 'S';
			}
			if (y > y2) {
				return 'N';
			}
		}
		if (y > y1 && y < y2) {
			if (x < x1) {
				return 'W';
			}
			if (x > x2) {
				return 'E';
			}
		}

		const way11 = Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2));
		const way12 = Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y2 - y, 2));
		const way21 = Math.sqrt(Math.pow(x2 - x, 2) + Math.pow(y1 - y, 2));
		const way22 = Math.sqrt(Math.pow(x2 - x, 2) + Math.pow(y2 - y, 2));

		const min = Math.min(way11, way12, way21, way22);
		if (min === way11) {
			return 'SW';
		}
		if (min === way12) {
			return 'NW';
		}
		if (min === way21) {
			return 'SE';
		}
		if (min === way22) {
			return 'NE';
		}

		return 'Не удалось определить направление.';
	}
	return 'Не удалось прочитать файл.';
};

fs.writeFileSync('output.txt', foo().toString());