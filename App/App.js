
import './App.css';
import Menu from './Imagenes/Menu.png';
import Logo from './Imagenes/Logo.png';
function App() {
  return (
    <div class='Barra'>
      <img class="Menu" src={ Menu } alt="Botón Menú" />

      <img class="Logo" src= { Logo } alt="logo de la pagina"/>
      
      <h4 class="Log">Log In</h4>  


    </div>
  );
}

export default App;
