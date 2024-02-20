import './styles/App.css'
import './styles/DataSection.css'
import './components/AsideBar'
import { PathProvider } from './components/context/PathProvider'
import MainApp from './components/MainApp'

function App() {
  return (
    <PathProvider>
      <MainApp/>
    </PathProvider>
  )
}
export default App
