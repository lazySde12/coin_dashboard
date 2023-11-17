
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Cryptohome from './pages/Cryptohome'
import CryptoDetails from './pages/CryptoDetails'
import Navbar from './components/Navbar'
import { CurrencyProvider } from './components/CurrencyContext'
function App() {


  return (
    <CurrencyProvider>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Cryptohome/>}/>
        <Route path='/coin/:id' element={<CryptoDetails/>} />
      </Routes>
    </BrowserRouter>
    </CurrencyProvider>

  )
}

export default App
