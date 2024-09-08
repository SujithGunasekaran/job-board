import { useEffect } from 'react';
import { useState } from 'react';


const useDebounce = (inputValue, delay) => {

    // state
    const [debounceValue, setDebounceValue] = useState('');

    useEffect(() => {
        let timerID = setTimeout(() => {
            setDebounceValue(inputValue);
        }, delay)

        return () => clearTimeout(timerID);
    }, [inputValue, delay]);

    return debounceValue;

}

export default useDebounce;
