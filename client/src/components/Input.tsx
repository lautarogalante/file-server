import { useContext, useState } from 'react'
import { PathContext } from '../context/PathContext';
import { createDirectory } from '../api/handleRequest';
import '../styles/input.css'
import { MakeDir } from '../interfaces/FileAndDirectory';
import { useRefContext } from '../context/RefContext';

const InputComp = () => {

    const [ inputValue, setInputValue ] = useState('');
    const { pathValue, changePathFlag } = useContext(PathContext);
    const { globalRef } = useRefContext();


    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            const pathObj: MakeDir = {
                directory: inputValue,
                path: pathValue,
            }
            changePathFlag();
            createDirectory(pathObj)
            .then((data) => {
                console.log("Directorio creado: ", data)
            }).catch((error) => {
                console.log(error)
            }) 
            
            let input = document.getElementById('input')
            if (input) {
                input.style.display = 'none';
            }
        }
    }
        
    return (
        <div className="input-container-comp" ref={globalRef}>
            <input id="input" className="input-dir-name" 
            type="text" 
            value={inputValue}
            placeholder='Ingrese el nombre'
            onChange={(e) => setInputValue(e.target.value)}
            onKeyUp={(event) => handleKeyPress(event)}
            />
        </div>
    );

}

export default InputComp