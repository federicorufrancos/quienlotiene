import React, { useState } from 'react';
import Header from '../layouts/Header';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

const NewDevice = ({ history, firestore }) => {
  const [name, saveName] = useState('');
  const [operativeSystem, saveOperativeSystem] = useState('');
  const [OSVersion, saveOSVersion] = useState('');
  const [IDFlux, saveIDFlux] = useState('');
  const [IMEI, saveIMEI] = useState('');
  const [deviceId, saveDeviceId] = useState('');
  const [works, saveWorks] = useState(true);
  const [comments, saveComments] = useState('');

  const onSubmitDevice = e => {
    e.preventDefault();
    console.log('carga dispositivo');

    const newDevice = {
      name,
      operativeSystem,
      OSVersion,
      IDFlux,
      IMEI,
      deviceId,
      works,
      comments,
      assignedTo: ''
    };

    firestore.add({ collection: 'devices' }, newDevice).then(() => {
      Swal.fire(
        'Se agrego el dispositivo',
        'El dispositivo fue dado de alta correctamente',
        'success'
      );
      history.push('/');
    });
  };

  const operativeSystems = ['Android', 'IOS'];

  return (
    <div className="col-lg-12">
      <div className="row ml-3">
        <Header titulo="Agregar dispositivo" />
      </div>
      <form className="card border-light p-3" onSubmit={onSubmitDevice}>
        <div className="form-group">
          <label> Nombre: </label>
          <input
            type="text"
            name={name}
            onChange={e => saveName(e.target.value)}
            placeholder="Escriba el nombre del dispositivo"
            required
            className="form-control"
          />
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="form-group">
              <div className="form-group">
                <label> Sistema Operativo </label>
                <select
                  className="form-control"
                  name={operativeSystem}
                  onChange={e => saveOperativeSystem(e.target.value)}
                >
                  <option option=""> Seleccione el sistema operativo </option>
                  {operativeSystems.map((operativeSystem, index) => (
                    <option key={index} value={operativeSystem}>
                      {operativeSystem}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label> Versión: </label>
              <input
                type="text"
                name={OSVersion}
                onChange={e => saveOSVersion(e.target.value)}
                placeholder="Escriba la versión del SO"
                required
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label> Id de Flux: </label>
          <input
            type="text"
            name={IDFlux}
            onChange={e => saveIDFlux(e.target.value)}
            placeholder="Escriba el Id de Flux"
            required
            className="form-control"
          />
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="form-group">
              <label> IMEI: </label>
              <input
                type="text"
                name={IMEI}
                onChange={e => saveIMEI(e.target.value)}
                placeholder="Escriba el código de IMEI"
                className="form-control"
                disabled={deviceId ? true : false}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label> Device ID: </label>
              <input
                type="text"
                name={deviceId}
                onChange={e => saveDeviceId(e.target.value)}
                placeholder="Escriba Id dispositivo IOS"
                className="form-control"
                disabled={IMEI ? true : false}
              />
            </div>
          </div>
        </div>
        <div className="form-group mb-2">
          <label>
            Funciona:
            <input
              className="form-check-input ml-3 mt-2"
              type="checkbox"
              value={works}
              onChange={e => saveWorks(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label> Comentarios: </label>
          <textarea
            name={comments}
            placeholder="Escriba algunos comentarios"
            className="form-control"
            onChange={e => saveComments(e.target.value)}
          ></textarea>
        </div>
        <input
          type="submit"
          value="Agergar dispositivo"
          className="btn btn-success"
        />
      </form>
    </div>
  );
};

NewDevice.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(NewDevice);
