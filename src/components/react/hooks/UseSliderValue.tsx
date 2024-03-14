import { useContext } from "react";
import { SlideValueContext,type SliderValueContextType } from "../context/SlideValueContext";

export const useSliderValue = (): SliderValueContextType =>{
    const context = useContext(SlideValueContext);
    if(context === undefined){
        throw new Error("useSliderValue must be used within a SliderValueProvider");
    }
    return context;
}