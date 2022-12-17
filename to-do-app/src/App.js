import './App.css';
import Card from './components/card';
import Nav from './components/nav';
import firebase from 'firebase/app';
import 'firebase/database';
// Initialize Firebase



function App() {

  return (
    <div className="App">
      <Nav />
      <div className='container'>
        <Card />
        <Card title='Doğum Günü' description='Mustafa Akilin Doğum Günü' />
      </div>
    </div>
  );
}

export default App;
