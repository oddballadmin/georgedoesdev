import React,{useEffect, useState} from 'react';
import { SliderValueProvider } from './context/SlideValueContext';
import { Slider } from './Slider';

export const App = ()=> {
  const [files, setFiles] = useState<Object>();
  useEffect(() => {
    // TOFO: fetch files from server, needs to be relative
    fetch("http://localhost:3001/api/files")
    .then(res=>res.json())
    .then(data=>setFiles(data))
    .catch(err=>console.error(err));
  }, []);
  return (
    <SliderValueProvider>
      <Slider data = {files as Object}/>
    </SliderValueProvider>
  );
}

export default App;
