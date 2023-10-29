import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Form from './Pages/FormPage';
import Table from './Pages/TablePage';


function App() {
  return (
    <div className='app'>
    <Router>
      <Routes>
       <Route exact path="/"  element={<Form></Form>}></Route>
       <Route exact path="/table"  element={<Table></Table>}></Route>
      </Routes>
    </Router> </div>
      
  );
}

export default App;
