import path from 'path';
export function generateRandomId(length) {
	const characters = '123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@$#&';
	let result = '';

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters[randomIndex];
	}

	return result;
}

export function retriveFilePath(filename, folder, extension) {
	const __dirname = path.dirname(filename);
	const citiesPath = path.join(process.cwd(), folder, extension);
	return citiesPath;
}
