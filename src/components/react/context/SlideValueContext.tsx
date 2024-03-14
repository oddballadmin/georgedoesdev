import React, {createContext,useState,useContext} from "react";
export type SliderValueContextType = {
    sliderValue: number;
    setSliderValue: React.Dispatch<React.SetStateAction<number>>;
}

// Create a context, undefined is the default value
export const SlideValueContext = createContext<SliderValueContextType | undefined>(undefined);


//Creates the provider for use in the app and sets the default value to 0 
export const SliderValueProvider = ({children}: {children: React.ReactNode}) => {
    const [sliderValue, setSliderValue] = useState<number>(0);
    return(
        <SlideValueContext.Provider value={{sliderValue, setSliderValue}}>
            {children}
        </SlideValueContext.Provider>
    );
}

