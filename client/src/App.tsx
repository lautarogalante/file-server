import './styles/App.css'
import './styles/DataSection.css'
import './components/AsideBar'
import LeftBar from './components/AsideBar'
import DataSection from './components/DataSection'
import TopBar from './components/TopBar'
import PropertyBar from './components/PropertyBar'
function App() {

  return (
    <div className='main-container'>
      <div className='left-bar-container'>
        <LeftBar/>
      </div>
      <div className='main-section'>
        <TopBar icon='fa fa-search'/>
        <div className='data-section'>
          <PropertyBar/>
          <DataSection/>
        </div> 
      </div>
    </div>
  )
}
export default App
