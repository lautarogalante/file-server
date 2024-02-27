import { useContext, useState } from 'react'
import { PathContext } from '../context/PathContext';
import { createDirectory } from '../api/handleRequest';
import '../styles/input.css'
import { MakeDir } from '../interfaces/FileAndDirectory';
import { useEventContext } from '../context/EventContext';
import Success from './Success';
import Error from './Error';

const InputComp = () => {

    const [ inputValue, setInputValue ] = useState('');
    const { pathValue, changePathFlag } = useContext(PathContext);
    const { globalRef } = useEventContext();
    const [ createDir, setCreateDir ] = useState<'idle' | 'success' | 'error'>('idle')


    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            const pathObj: MakeDir = {
                directory: inputValue,
                path: pathValue,
            }
            changePathFlag();
            createDirectory(pathObj)
            .then(() => {
                setCreateDir('error');
                setTimeout(() => setCreateDir('idle'), 5000)
            }).catch(() => {
                setCreateDir('error');
                setTimeout(() => setCreateDir('idle'), 5000)
            }) 
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
            {createDir === 'success' && <Success icon='fa-solid  fa-folder' text='Directorio Creado'/>}
            {createDir === 'error' && <Error icon='fa-solid fa-xmark' text='Error al crear Directorio'/>}
        </div>
    );

}

export default InputComp