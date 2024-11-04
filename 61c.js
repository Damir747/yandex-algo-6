const fs = require('fs');

// Чтение данных из файла input.txt
let fileContent = fs.readFileSync('input.txt', 'utf8').trim().split('\n');
const n = parseInt(fileContent[0], 10);

// Инвертируем строки, чтобы соответствовать нужной ориентации
const board = fileContent.slice(1).reverse();

// Функция для определения символа на табло
function findLetterOnBoard(n, board) {

	const findBoarders = (x1, y1, x2, y2, filling) => {
		let minX = n, maxX = -1, minY = n, maxY = -1;
		for (let y = y1; y <= y2; y++) {
			for (let x = x1; x <= x2; x++) {
				if (board[y][x] === filling) {
					minX = Math.min(minX, x);
					maxX = Math.max(maxX, x);
					minY = Math.min(minY, y);
					maxY = Math.max(maxY, y);
				}
			}
		}
		if (maxX === -1) {
			return [];
		}
		return [minX, minY, maxX, maxY];
	}
	if (!findBoarders(0, 0, n - 1, n - 1, '#').length) return 'X';
	// Определяем границы внешнего прямоугольника `#`
	const [minX, minY, maxX, maxY] = findBoarders(0, 0, n - 1, n - 1, '#');

	// Проверка для `I` — полоса
	const checkI = () => {
		for (let y = minY; y <= maxY; y++) {
			for (let x = minX; x <= maxX; x++) {
				if (board[y][x] !== '#') {
					return false;
				}
			}
		}
		return true;
	}

	if (checkI()) return 'I';
	// проверка левой стенки
	if (findBoarders(minX, minY, minX, maxY, '.').length) return 'X';

	// Проверка внутренних прямоугольников
	const [innerMinX, innerMinY, innerMaxX, innerMaxY] = findBoarders(minX, minY, maxX, maxY, '.');

	// O, C, L
	if (!findBoarders(innerMinX, innerMinY, innerMaxX, innerMaxY, '#').length) {
		if (innerMinY > minY) {
			if (innerMaxX === maxX && innerMaxY === maxY) return 'L';
			if (innerMaxX === maxX) return 'C';
			if (innerMaxX < maxX && innerMaxY < maxY) return 'O';
		}
		return 'X';
	}

	const findSquare = (x1, y1, x2, y2, filling) => {
		let minX = n, maxX = -1, minY = n, maxY = -1;
		const arr = [];
		let flag = false;
		for (let y = y1; y <= y2; y++) {
			for (let x = x1; x <= x2; x++) {
				if (board[y][x] === filling) {
					flag = true;
					minX = Math.min(minX, x);
					maxX = Math.max(maxX, x);
					minY = Math.min(minY, y);
					maxY = Math.max(maxY, y);
				} else {
					if (flag && x >= minX && x <= maxX && y > minY && board[y - 1][x] === filling) {
						arr.push([minX, minY, maxX, maxY]);
						minX = n; maxX = -1; minY = n; maxY = -1;
						flag = false;
					}
				}
			}
		}
		if (maxX !== -1) {
			arr.push([minX, minY, maxX, maxY]);
		}
		return arr;
	}
	const arr = findSquare(minX, minY, maxX, maxY, '.');
	console.log(arr);
	for (let i = 0; i < arr.length; i++) {
		if (findBoarders(...arr[i], '#').length) {
			return 'X';
		}
	}
	if (arr.length > 2) return 'X';
	if (arr.length < 2) return 'X';

	const [firstMinX, firstMinY, firstMaxX, firstMaxY] = arr[0];
	const [secondMinX, secondMinY, secondMaxX, secondMaxY] = arr[1];
	if (firstMinY === minY && firstMaxX === maxX) {
		if (secondMaxX < maxX && secondMaxY < maxY && firstMinX === secondMinX) {
			return 'P'
		}
		return 'X';
	}

	if (firstMinY === minY && firstMaxX < maxX) {
		if (secondMaxY === maxY && secondMaxX < maxX && firstMinX === secondMinX && firstMaxX === secondMaxX) {
			return 'H'
		}
		return 'X';
	}
	return 'X';

}

// Определение символа и запись результата в output.txt
const result = findLetterOnBoard(n, board);
fs.writeFileSync('output.txt', result);
