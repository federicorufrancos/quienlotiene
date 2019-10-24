import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ReactComponent as ArrowLeft } from '../../assets/arrow-circle-left-solid.svg';

const DeviceEdition = ({ match, history, firestore, deviceToUpdate }) => {
  if (!deviceToUpdate) {
    return <h1> Esperando </h1>;
  }
  const { id } = match.params;
  const [name, saveName] = useState(deviceToUpdate.name);
  const [operativeSystem, saveOperativeSystem] = useState(
    deviceToUpdate.operativeSystem
  );
  const [OSVersion, saveOSVersion] = useState('');
  const [IDFlux, saveIDFlux] = useState('');
  const [IMEI, saveIMEI] = useState('');
  const [deviceId, saveDeviceId] = useState('');
  const [comments, saveComments] = useState('');

  const operativeSystems = ['Android', 'IOS'];

  const onSubmitUpdateDevice = e => {
    e.preventDefault();
    console.log('name ', name);
    const deviceUpdated = { ...deviceToUpdate, name };
    console.log('deviceUpdated ', deviceUpdated, ' id ', id);
    firestore
      .update(
        {
          collection: 'devices',
          doc: id
        },
        deviceUpdated
      )
      .then(history.push(`/device/${id}`));
  };

  return (
    <div className="col-lg-12">
      <Link to={`/device/${id}`} className="btn btn-info">
        <ArrowLeft className="app-icon p-1" />
        Volver a la info
      </Link>
      <div className="card card-device-info border-secondary mb-3 mt-3">
        <form onSubmit={onSubmitUpdateDevice}>
          <div className="card-header pb-3 lead">
            Edición de información sobre el dispositivo
          </div>
          <div className="card-body">
            <div className="form-group">
              <label> Nombre: </label>
              <input
                type="text"
                name={name}
                value={name}
                onChange={e => saveName(e.target.value)}
                placeholder="Escriba el nombre del dispositivo"
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label> Sistema Operativo </label>
              <select
                className="form-control"
                name={operativeSystem}
                onChange={e => saveOperativeSystem(e.target.value)}
              >
                {operativeSystems.map((os, index) => (
                  <option
                    key={index}
                    value={os}
                    selected={os === operativeSystem}
                  >
                    {os}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label> Versión: </label>
              <input
                type="text"
                name={OSVersion}
                value={OSVersion}
                onChange={e => saveOSVersion(e.target.value)}
                placeholder="Escriba la versión del SO"
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label> Id de Flux: </label>
              <input
                type="text"
                name={IDFlux}
                value={IDFlux}
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
                    value={IMEI}
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
                    value={deviceId}
                    onChange={e => saveDeviceId(e.target.value)}
                    placeholder="Escriba Id dispositivo IOS"
                    className="form-control"
                    disabled={IMEI ? true : false}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label> Comentarios: </label>
              <textarea
                name={comments}
                value={comments}
                onChange={e => saveComments(e.target.value)}
                placeholder="Escriba algunos comentarios"
                className="form-control"
              />
            </div>
            <input
              type="submit"
              value="Agergar dispositivo"
              className="btn btn-success mb-3 ml-3"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default compose(
  firestoreConnect(props => [
    {
      collection: 'devices',
      storeAs: 'device',
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { data } }, props) => ({
    deviceToUpdate: data.device && data.device
  }))
)(DeviceEdition);
