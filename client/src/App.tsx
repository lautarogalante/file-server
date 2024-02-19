import './styles/App.css'
import './styles/DataSection.css'
import './components/AsideBar'
import LeftBar from './components/AsideBar'
import TopBar from './components/TopBar'
import PropertyBar from './components/PropertyBar'
import DataSection from './components/FileAndDirectory'
import { useState } from 'react'
import { OptionsIcons } from './components/OptionsIcons'

function App() {
    const [basePathUpdated, setBasePathUpdated] = useState<boolean>(false);
    const updateBasePath = () => {
        setBasePathUpdated(prevState => !prevState);
    };

  return (
    <div className='main-container'>
      <div className='left-bar-container'>
        <LeftBar/>
      </div>
      <div className='main-section'>
        <TopBar icon='fa fa-search'/>
        <OptionsIcons updateBasePath={updateBasePath}/>
        <div className='data-section'>
          <PropertyBar/>
          <div className="data-container">
            <DataSection basePathUpdated={basePathUpdated} setBasePathUpdated={setBasePathUpdated}/> 
          </div>
        </div> 
      </div>
    </div>
  )
}
export default App
