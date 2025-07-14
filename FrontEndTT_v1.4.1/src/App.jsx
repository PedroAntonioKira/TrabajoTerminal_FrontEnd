import 'normalize.css';
import Principal from './access/Principal'
import Login from './access/Sign_In'
import "./access/stylesAccess/App.css"

function App() {

  return (
    <div className='Principal'>
      <div className='contenedorRegistro'>
        <Login />
      </div>
    </div>
  )
}

export default App
