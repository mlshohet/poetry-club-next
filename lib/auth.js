import { hash, compare } from 'bcryptjs';

export async function hashPassword(password) {
	let hashedPassword;

	try {
		hashedPassword = await hash(password, 12); // how many turns a hash will take, the more the stronger pencryption, but slower
	} catch (error) {
		throw new Error("Could not create password!");
		return;
	}

	return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
	const isValid = await compare(password, hashedPassword);
	return isValid;
}
