import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ReactComponent as ArrowLeft } from '../../assets/arrow-circle-left-solid.svg';
import Swal from 'sweetalert2';

const DeviceEdition = ({ match, history, firestore, deviceToUpdate }) => {
  if (!deviceToUpdate) {
    return <h1> Esperando </h1>;
  }
  const { id } = match.params;
  const [name, saveName] = useState(deviceToUpdate.name);
  const [operativeSystem, saveOperativeSystem] = useState(
    deviceToUpdate.operativeSystem
  );
  const [OSVersion, saveOSVersion] = useState(deviceToUpdate.OSVersion);
  const [IDFlux, saveIDFlux] = useState(deviceToUpdate.IDFlux);
  const [IMEI, saveIMEI] = useState(deviceToUpdate.IMEI);
  const [deviceId, saveDeviceId] = useState(deviceToUpdate.deviceId);
  const [works, saveWorks] = useState(deviceToUpdate.works);
  const [comments, saveComments] = useState(deviceToUpdate.comments);

  const operativeSystems = ['Android', 'IOS'];

  const onSubmitUpdateDevice = e => {
    e.preventDefault();
    const deviceUpdated = {
      ...deviceToUpdate,
      name,
      operativeSystem,
      OSVersion,
      IDFlux,
      IMEI,
      deviceId,
      works,
      comments
    };
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

  const onDeleteDevice = e => {
    Swal.fire({
      title: 'Estas seguro de eliminarlo?',
      text: 'No cambios no podran regresarse',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        firestore.delete({ collection: 'cities', doc: 'SF' }).then(result => {
          Swal.fire(
            'Eliminado!',
            'El dispositivo ha sido eliminado exitosamente',
            'success'
          );
          history.push('/');
        });
      }
    });
  };

  return (
    <div className="col-lg-12">
      <Link to={`/device/${id}`} className="btn btn-info">
        <ArrowLeft className="app-icon p-1" />
        Volver a la info
      </Link>
      <div className="card card-device-info border-secondary mb-3 mt-3">
        <div className="card-header">
          <span className="lead">
            Edición de información sobre el dispositivo
          </span>
          <span className="pt-1">
            <button
              type="button"
              onClick={() => onDeleteDevice()}
              className="btn btn-danger float-right"
            >
              Eliminar dispositivo
            </button>
          </span>
        </div>
        <form onSubmit={onSubmitUpdateDevice}>
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
                    defaultValue={os === operativeSystem}
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
            <div className="form-group mb-2">
              <label>
                Funciona:
                <input
                  className="form-check-input ml-3 mt-2"
                  type="checkbox"
                  checked={works}
                  onChange={e => saveWorks(e.target.checked)}
                />
              </label>
            </div>
            {works}
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
              value="Guardar cambios"
              className="btn btn-success mb-3 ml-3"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

DeviceEdition.propTypes = {
  firestore: PropTypes.object.isRequired
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
