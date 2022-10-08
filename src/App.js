
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {ProdList,AddProduct} from './components'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/addProduct" element={<AddProduct/>} />
        <Route path="/" element={<ProdList/>} />
      </Routes>
    </Router>
  );
}

export default App;
