import './styles/App.css'
import './components/Aside-bar'
import LeftBar from './components/Aside-bar'
import { DataSection } from './components/Data-section'
import TopBar from './components/Top-bar'
function App() {

  return (
    <div className='main-container'>
      <div className='left-bar-container'>
        <LeftBar/>
      </div>
      <div className='main-section'>
        <TopBar/>
        <DataSection/>
      </div>
    </div>
  )
}

export default App
