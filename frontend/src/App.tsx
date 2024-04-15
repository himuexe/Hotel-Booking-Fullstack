import { BrowserRouter as  Router, Routes , Route ,Navigate } from 'react-router-dom'
import './index.css'
import Layout from './layouts/Layout'

 const  App=()=> {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout><p>HomePage</p></Layout>}/>
        <Route path='/search' element={<Layout><p>Searchpage</p></Layout>}/>
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    </Router>
  )
}

export default App
