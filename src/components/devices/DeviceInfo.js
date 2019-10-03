import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from  '../../assets/arrow-circle-left-solid.svg';
import Swal from 'sweetalert2';

const DeviceInfo = ({device}) => {
    const reservar = () => {
        Swal.fire(
            'Reservado!',
            'El dispositivo te fue asignado.',
            'success'
        );
    }
    return ( 
        //const  =  this.props;

        <div className="col-lg-12">    
            <Link to="/" className="btn btn-info">
                <ArrowLeft className="app-icon p-1"/>Volver al Listado
            </Link>            
            
            <div className="card card-device-info border-secondary mb-3 mt-3">
                <div className="card-header">Información sobre el dispositivo</div>
                <div className="card-body">
                    <p className="card-text">
                        <span className="font-weight-bold">
                            Nombre:
                        </span> {' '}

                    </p>
                    <p className="card-text">
                        <span className="font-weight-bold">
                            Comentarios:
                        </span> {' '}
                    </p>
                </div>
            </div>
            <button className="btn btn-success" type="button" onClick={() => reservar()}>Reservar</button>            
        </div>
    );
}
 
export default DeviceInfo;