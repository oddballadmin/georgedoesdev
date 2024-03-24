import style from "./styles/SliderFrame.module.scss";
import React, { useContext, useEffect } from "react";
import { SlideValueContext } from "./context/SlideValueContext";
import { useSliderValue } from "./hooks/UseSliderValue";
import { SliderButton } from "./Button";
import ReactMarkdown from "react-markdown";

type SliderProps = {
	data: Object;
};

export const Slider = ({data}:SliderProps) => {
	const context = useContext(SlideValueContext);
	if (context === undefined) {
		throw new Error("useSliderValue must be used within a SliderValueProvider");
	}
	const { sliderValue, setSliderValue } = context;
	useEffect(() => {
		if (sliderValue < 0) {
			setSliderValue(0);
		}
	}, [sliderValue]);
	return (
		<div className={style.sliderContainer}>
			<SliderButton
				name="Left"
				disabled={false}
				position="left"
				onClick={() => sliderValue - 1}
			>
				Left
			</SliderButton>
			{JSON.stringify(data)}
			<SliderButton
				name="Right"
				disabled={false}
				position="right"
				onClick={() => sliderValue + 1}
			>
				Right
			</SliderButton>
			
		</div>
	);
};
