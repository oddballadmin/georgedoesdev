import style from "./styles/SliderFrame.module.css";
import btnStyle from "./styles/Button.module.css";
import React, { useContext, useEffect, useState } from "react";
import { SlideValueContext } from "./context/SlideValueContext";
import { useSliderValue } from "./hooks/UseSliderValue";
import { SliderButton } from "./Button";
import ReactMarkdown from "react-markdown";

type SliderProps<T> = {
	data: T;
};
interface FileData {
	name:string,
	content:string

}

export const Slider = <T extends FileData>({ data }: SliderProps<T>) => {
	
	const context = useContext(SlideValueContext);
	
	if (context === undefined) {
		throw new Error("useSliderValue must be used within a SliderValueProvider");
	}
		const { sliderValue, setSliderValue } = context;
		const [fileArray, setFileArray] = useState<T[]>([]);

		useEffect(() => {
	        if (data) {
	            setFileArray(Object.values(data));
	        }
	    }, [data]);
		const handleLeftClick = () => {
			setSliderValue((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
		};
	
		// Function to handle right button click
		const handleRightClick = () => {
			setSliderValue((prevValue) => (prevValue < fileArray.length - 1 ? prevValue + 1 : fileArray.length - 1));
		};


	return (
		<div className = "grid-content relative">
			<SliderButton
				name="Left"
				disabled={false}
				position="left"
				onClick={handleLeftClick}
				className={`${btnStyle.button} ${btnStyle.buttonLeft}`}
			>
				Left
			</SliderButton>
			<div className={style.sliderContainer}>
			{
				fileArray.map((file, index) => {
					if (index === sliderValue) {
						return (
							<div key={index} className="slide-item">
								<ReactMarkdown>{file.content}</ReactMarkdown>
							</div>
						);
					}
				})
			}
			</div>
			<SliderButton
				name="Right"
				disabled={false}
				position="right"
				onClick={handleRightClick}
				className={`${btnStyle.button} ${btnStyle.buttonRight}`}			>
				Right
			</SliderButton>
			
		</div>
	);
};
