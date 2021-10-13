import React, { useContext, useState } from 'react';

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();


// export function useTheme() {
//     return useContext(ThemeContext);
// }

// export function useThemeUpdate() {
//     return useContext(ThemeUpdateContext);
// }


export function ThemeProvider({ children }) {
    const [queryTableData, setQueryTableData] = useState([]);

    function isOn(currentTable){
        const newArr = [];
        console.log(queryTableData)
        for(let obj of queryTableData){
           if(obj[currentTable]){
             obj[currentTable] = !obj[currentTable];
             newArr.push(obj); 
           } else {
             newArr.push(obj);
           }
        }
        setQueryTableData(newArr);
        console.log(queryTableData, "this is the new query table data");
    };

    return ( 
        <ThemeContext.Provider value = {queryTableData}> 
            <ThemeUpdateContext.Provider value = {isOn}>
                { children }
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    )

};