export const getPoet = async (poetId) => {
	const url = `http://localhost:3000/api/${poetId}`;
	console.log("PoetId: ", poetId );
	const response = await fetch(url);
	const data = await response.json();
	if (!response.ok) {
		throw new Error("Something went wrong");
	}	
	console.log("Data", data);
	return data;
};