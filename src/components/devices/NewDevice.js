import React, { useState } from 'react';
import Header from '../layouts/Header';
import { addDeviceAction } from '../../actions/devicesAction';
import { useDispatch, useSelector } from 'react-redux';

const NewDevice = ({history}) => {
    
    const [ name, saveName ] = useState('');
    const [ operativeSystem, saveOperativeSystem ] = useState('');
    const [ OSVersion, saveOSVersion ] = useState('');
    const [ IDFlux, saveIDFlux ] = useState('');
    const [ IMEI, saveIMEI ] = useState('');
    const [ deviceId, saveDeviceId ] = useState('');
    const [ comments, saveComments ] = useState('');
    
    const dispatch = useDispatch();
    const addDevice = (device) => dispatch(addDeviceAction(device));

    const onSubmitDevice = e => {
        e.preventDefault();
        console.log('carga dispositivo');
        
        
        addDevice({
            name,
            operativeSystem,
            OSVersion,
            IDFlux,
            IMEI,
            deviceId,
            comments
        });
        history.push('/');
    }

    const operativeSystems = ['Android', 'IOS'];

    return (
        <div className="col-lg-12">
            <div className="row ml-3">
                <Header titulo="Agregar dispositivo" />
            </div>
            
            <form className="card border-light p-3" onSubmit={onSubmitDevice}>
                <div className="form-group">
                    <label>Nombre:</label>  
                    <input type="text" 
                        name={name} 
                        onChange={e => saveName(e.target.value)}
                        placeholder="Código del Suscriptor" required 
                        className="form-control"/>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="form-group">
                        <div className="form-group">
                            <label>Sistema Operativo</label>
                            <select className="form-control" 
                                name={operativeSystem}
                                onChange={e => saveOperativeSystem(e.target.value)}>
                                <option option=''>Seleccione un valor</option>
                                {operativeSystems.map((operativeSystem, index) => (
                                    <option key={index} value={operativeSystem}>
                                        {operativeSystem}
                                    </option>)
                                )}
                            </select>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Versión:</label>  
                            <input type="text" name={OSVersion}
                                onChange={e => saveOSVersion(e.target.value)}
                                placeholder="Código del Suscriptor" required 
                                className="form-control"/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Id de Flux:</label>  
                    <input type="text" name={IDFlux}
                        onChange={e => saveIDFlux(e.target.value)}
                        placeholder="Código del Suscriptor" required 
                        className="form-control"/>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>IMEI:</label>  
                            <input type="text" name={IMEI}
                                onChange={e => saveIMEI(e.target.value)}
                                placeholder="Código de IMEI" 
                                className="form-control"
                                disabled={deviceId ? true : false}
                                />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Device ID:</label>  
                            <input type="text" name={deviceId}
                                onChange={e => saveDeviceId(e.target.value)}
                                placeholder="Escriba Id dispositivo IOS" 
                                className="form-control"
                                disabled={IMEI ? true : false}
                                />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label>Comentarios:</label>  
                    <textarea 
                        name={comments}
                        placeholder="Escriba algunos comentarios"
                        className="form-control"
                        onChange={e => saveComments(e.target.value)}       
                    ></textarea>
                </div>

                <input type="submit" value="Agergar dispositivo" className="btn btn-success"/>
            </form>
        </div>
    );
}

 
export default NewDevice;