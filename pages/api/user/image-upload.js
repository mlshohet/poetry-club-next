
import axios from 'axios';

async function handler (req, res) {

	const fd = req;
	const fd = new FormData();
		fd.append('image', selectedFile, selectedFile.name);
		let data;
	
	try {
			const response = await axios.post('gs://noontide-poetry.appspot.com/images', fd);
			data = await response;
		} catch (error) {
			res.status(500).json({ message: "Could not upload file", error: error })
		}

		console.log("Data from upload: ", data);

}

export default handler;

