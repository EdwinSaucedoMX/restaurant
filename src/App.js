import './App.scss';

import Navbar from './components/Navbar';
import ItemListContainer from './components/ItemListContainer';


import 'bootstrap/dist/js/bootstrap.bundle.min';


function App() {
  return (
    <div className="App">
      <Navbar />
      <ItemListContainer title="Welcome to my store"/>
    </div>
    
  );
}

export default App;
