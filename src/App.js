import logo from './logo.svg';
import './App.css';
import Todos from './components/Todos';

function App() {
  return (
     <div className="row">
       <div className="col-md-8 offset-md-2">
           <Todos />
       </div>

     </div>
  );
}

export default App;
