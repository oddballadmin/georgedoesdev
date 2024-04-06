import React, { useEffect, useState } from "react";
import { SliderValueProvider } from "./context/SlideValueContext";
import { Slider } from "./Slider";

type FileData = {
	name: string;
	content: string;
};

export const App = () => {
	const [files, setFiles] = useState<FileData[]>([]);

	useEffect(() => {
		fetch("http://localhost:3001/api/files")
			.then((res) => res.json())
			.then((data) => setFiles(data))
			.catch((err) => console.error(err));
	}, []);

	return (
		<SliderValueProvider>
			<Slider data={files} />
		</SliderValueProvider>
	);
};

export default App;
