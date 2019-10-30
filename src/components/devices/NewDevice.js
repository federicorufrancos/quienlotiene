import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../../assets/arrow-circle-left-solid.svg';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import useForm from 'react-hook-form';
import InputFormError from '../layouts/InputFormError';

const NewDevice = ({ history, firestore }) => {
  const [name, saveName] = useState('');
  const [operativeSystem, saveOperativeSystem] = useState('');
  const [OSVersion, saveOSVersion] = useState('');
  const [IDFlux, saveIDFlux] = useState('');
  const [IMEI, saveIMEI] = useState('');
  const [deviceId, saveDeviceId] = useState('');
  const [works, saveWorks] = useState(true);
  const [comments, saveComments] = useState('');

  const { register, handleSubmit, errors, watch } = useForm();

  const onSubmitDevice = e => {
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

  const validateIDFlux = value => {
    if (value.length > 2) {
      return firestore
        .get({ collection: 'devices', where: ['IDFlux', '==', value] })
        .then(result => {
          if (!result.empty) {
            return 'El ID ingresado ya se encuentra asignado a otro dispositivo';
          }
        });
    }
  };

  const validateIMEIDeviceId = () => {
    const IMEI = watch('IMEI');
    const deviceId = watch('deviceId');
    if (!IMEI && !deviceId) {
      return 'Ingrese el IMEI(Android) o device Id(IOS)';
    }
  };

  const operativeSystems = ['Android', 'IOS'];

  return (
    <div className="col-lg-12">
      <Link to="/" className="btn btn-info">
        <ArrowLeft className="app-icon p-1" />
        Volver a la info
      </Link>
      <div className="card card-device-info border-secondary mb-3 mt-3">
        <div className="card-header">
          <span className="lead">Agregar dispositivo</span>
        </div>
        <form onSubmit={handleSubmit(onSubmitDevice)}>
          <div className="card-body">
            <div className="form-group mb-3">
              <label> Nombre: </label>
              <input
                type="text"
                name="name"
                onChange={e => saveName(e.target.value)}
                placeholder="Escriba el nombre del dispositivo"
                className="form-control"
                ref={register({ required: 'El campo es requerido' })}
              />
              <InputFormError fieldName="name" errors={errors} />
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <div className="form-group">
                    <label> Sistema Operativo </label>
                    <select
                      className="form-control"
                      name="operativeSystem"
                      onChange={e => saveOperativeSystem(e.target.value)}
                      ref={register({ required: 'El campo es requerido' })}
                    >
                      <option value="" disabled selected>
                        Seleccione el sistema operativo
                      </option>
                      {operativeSystems.map((operativeSystem, index) => (
                        <option key={index} value={operativeSystem}>
                          {operativeSystem}
                        </option>
                      ))}
                    </select>
                    <InputFormError
                      fieldName="operativeSystem"
                      errors={errors}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label> Versión: </label>
                  <input
                    type="text"
                    name="OSVersion"
                    onChange={e => saveOSVersion(e.target.value)}
                    placeholder="Escriba la versión del SO"
                    className="form-control"
                    ref={register({
                      required: 'El campo es requerido'
                    })}
                  />
                  <InputFormError fieldName="OSVersion" errors={errors} />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label> Id de Flux: </label>
              <input
                type="text"
                name="IDFlux"
                onChange={e => saveIDFlux(e.target.value)}
                placeholder="Escriba el Id de Flux"
                className="form-control"
                ref={register({
                  required: 'El campo es requerido',
                  pattern: {
                    value: /\d+/,
                    message: 'Ingrese solamente dígitos'
                  },
                  validate: async value => {
                    return await validateIDFlux(value);
                  }
                })}
              />
              <InputFormError fieldName="IDFlux" errors={errors} />
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label> IMEI: </label>
                  <input
                    type="text"
                    name="IMEI"
                    onChange={e => saveIMEI(e.target.value)}
                    placeholder="Escriba el código de IMEI"
                    className="form-control"
                    disabled={deviceId ? true : false}
                    ref={register({
                      validate: value => validateIMEIDeviceId(value)
                    })}
                  />
                  <InputFormError fieldName="IMEI" errors={errors} />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label> Device ID: </label>
                  <input
                    type="text"
                    name="deviceId"
                    onChange={e => saveDeviceId(e.target.value)}
                    placeholder="Escriba Id dispositivo IOS"
                    className="form-control"
                    disabled={IMEI ? true : false}
                    ref={register({
                      validate: value => validateIMEIDeviceId(value)
                    })}
                  />
                  <InputFormError fieldName="deviceId" errors={errors} />
                </div>
              </div>
            </div>
            <div className="form-group mb-2">
              <label>
                Funciona:
                <input
                  className="form-check-input ml-3 mt-2"
                  type="checkbox"
                  name="works"
                  checked={works}
                  onChange={e => saveWorks(e.target.checked)}
                />
              </label>
            </div>
            <div className="form-group">
              <label> Comentarios: </label>
              <textarea
                name="comments"
                placeholder="Escriba algunos comentarios"
                className="form-control"
                onChange={e => saveComments(e.target.value)}
              ></textarea>
            </div>
            <input
              type="submit"
              value="Agregar dispositivo"
              className="btn btn-success"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

NewDevice.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(NewDevice);
