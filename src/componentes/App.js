import React, { Component } from 'react';
import '../css/App.css';
import Header from './Header';
import Formulario from './Formulario';
import Listado from './Listado';
import {validarPresupuesto} from '../helper';
import ControlPresupuesto from './ControlPresupuesto';
class App extends Component {

    state = {
      presupuesto : '',
      restante: '',
      gastos: {} ,
    }

    componentDidMount() { //mejor un metodo para no cargar al didmount
      this.obtenerPresupuesto();
      
    }

    obtenerPresupuesto = () => {
      let presupuesto = prompt('Cual es el presupuesto?');

      let resultado = validarPresupuesto(presupuesto);
      if(resultado) {
        this.setState({
          presupuesto: presupuesto,
          restante : presupuesto
        })
      } else {
        this.obtenerPresupuesto();
      }
    }

   
  //agregar un nuevo gasto al state
  agregarGasto = gasto =>{
    // tomar una copia del state actual
    const gastos = {...this.state.gastos};
  

    //agregar al gasto al objeto del state
    gastos[`gasto${Date.now()}`] = gasto;

    console.log(gastos);

    //ponerlo en el state
    this.setState({
      gastos
    })

  }
  render(){
        return (
          <div className="App container">
            <Header
              titulo='Gasto Semanal'
            />
            <div className="contenido-principal contenido">
              <div className="row">
                <div className="one-half column">
                  <Formulario
                    agregarGasto = {this.agregarGasto}
                  />
              </div>
              <div className="one-half column">
                  <Listado
                  gastos={this.state.gastos}
                  />
                  <ControlPresupuesto />
              </div>

              </div>
            </div>

          </div>
        );
      }
    }

export default App;
