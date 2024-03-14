import React from "react";


interface SliderProps {
}

export const Slider = ({}:SliderProps) => {
    const [sliderValue, setSliderValue] = React.useState<number>(0);
    const [isEndOfSlider, setIsEndOfSlider] = React.useState<boolean>(false);
    
  return(
    <div className="grid-content slide-container">
        
    </div>
  );
};
