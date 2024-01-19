import { useSelector } from 'react-redux';
import './App.css';
import NavBar from './component/ui/NavBar';
import Login from './component/login/Login';

function App() {

  const {isLoged, data}= useSelector(s=>s.datas);

  console.log(isLoged, data);


  return (
    <div className="App">
      <NavBar />
      {
        !isLoged ? <Login /> : <h1>Hello</h1>
      }
    </div>
  );
}

export default App;
