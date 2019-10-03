import React from 'react';
import { Link } from 'react-router-dom';
import Device from './Device';
import Header from '../layouts/Header';
import { useSelector } from 'react-redux';

const ListDevices = () => {
    let state = {
        devices: [
            { name: 'iPhone 8 Plus', assignedTo: '', ID: 'ID0279', platform: 'IOS', works: 'SI', OSVersion: '13.beta.7', 'IMEI': '', 'UDID': 'eb6416c3ee8589b78d22bf6a4ac46fee274dea8a', comments: '' },
            { name: 'iPhone 7', assignedTo: '', ID: 'ID061', platform: 'IOS', works: 'SI', OSVersion: '12', 'IMEI': '', 'UDID': '34cd2acb4760780a1895296fbe4b49706826ba92', comments: '' },
            { name: 'Xiaomi Remi Note 7', assignedTo: 'Federico Rufrancos', ID: 'ID0409', platform: 'Android', works: 'SI', OSVersion: '', 'IMEI': '', 'UDID': '', comments: '' }
        ]
    };

    const { devices } = useSelector((state) => state.devices);

    return (
        <div className="col-lg-12">            
            <Link to="/device/new" className="float-right my-2 mr-3 btn btn-primary">
                Agregar
            </Link>                            
            <div className="row ml-3">
                <Header titulo="Listado de dispositivos" />
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Asignando a</th>
                        <th scope="col">Versión OS</th>
                        <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {devices.map(device => (
                        <Device key={device.ID} device={device} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
 
export default ListDevices;
