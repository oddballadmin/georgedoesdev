import style from "./styles/SliderFrame.module.css";
import btnStyle from "./styles/Button.module.css";
import React, { useContext, useState } from "react";
import { SlideValueContext } from "./context/SlideValueContext";
import { SliderButton } from "./Button";
import ReactMarkdown from "react-markdown";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface FileData {
	name: string;
	content: string;
}

type SliderProps = {
	data: FileData[];
};

export const Slider = ({ data }: SliderProps) => {
	const context = useContext(SlideValueContext);

	if (context === undefined) {
		throw new Error("useSliderValue must be used within a SliderValueProvider");
	}

	const { sliderValue, setSliderValue } = context;

	const handleLeftClick = () => {
		setSliderValue((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
	};

	const handleRightClick = () => {
		setSliderValue((prevValue) =>
			prevValue < data.length - 1 ? prevValue + 1 : data.length - 1
		);
	};

	return (
		<div className="grid-content breakout relative">
			<SliderButton
				name="Left"
				disabled={false}
				position="left"
				onClick={handleLeftClick}
				className={`${btnStyle.button} ${btnStyle.buttonLeft}`}
			>
				<BsChevronLeft />
			</SliderButton>
			<div className={style.sliderContainer}>
				{data.map((file, index) => {
					if (index === sliderValue) {
						return (
							<div key={index} className={style.slideItem}>
								<ReactMarkdown>{file.content}</ReactMarkdown>
							</div>
						);
					}
					return null;
				})}
			</div>
			<SliderButton
				name="Right"
				disabled={false}
				position="right"
				onClick={handleRightClick}
				className={`${btnStyle.button} ${btnStyle.buttonRight}`}
			>
				<BsChevronRight />
			</SliderButton>
		</div>
	);
};
