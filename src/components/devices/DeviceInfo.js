import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../../assets/arrow-circle-left-solid.svg';
import Swal from 'sweetalert2';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import DeviceBookingButtons from './DeviceBookingButtons';

const DeviceInfo = ({ match, history, firestore, deviceInfo }) => {
  if (!deviceInfo) {
    return <h1> Esperando </h1>;
  }
  const { id } = match.params;

  const onFinishDeviceAssigment = (
    deviceUpdated,
    alerOpt,
    newAssignationRecord
  ) => {
    firestore
      .update(
        {
          collection: 'devices',
          doc: id
        },
        deviceUpdated
      )
      .then(() => {
        if (newAssignationRecord) {
          firestore
            .add({ collection: 'assignations' }, newAssignationRecord)
            .then(() => {
              Swal.fire(...alerOpt);
              history.push('/');
            });
        } else {
          Swal.fire(...alerOpt);
          history.push('/');
        }
      })
      .catch(err => {
        Swal.fire({
          type: 'error',
          title: 'Error',
          text: 'Hubo un error, vuelve a intentarlo'
        });
        console.log(err);
      });
  };

  return (
    <div className="col-lg-12">
      <Link to="/" className="btn btn-info">
        <ArrowLeft className="app-icon p-1" />
        Volver al Listado
      </Link>
      <div className="card card-device-info border-secondary mb-3 mt-3">
        <div className="card-header">
          <span className="lead">Información sobre el dispositivo</span>
          <span className="pt-1">
            <Link
              to={`/device/edit/${id}`}
              className="btn btn-info float-right"
            >
              Editar
            </Link>
          </span>
        </div>
        <div className="card-body">
          <p className="card-text">
            <span className="font-weight-bold"> Nombre: </span>
            {deviceInfo.name}
          </p>
          {deviceInfo.assignedTo ? (
            <p className="card-text">
              <span className="font-weight-bold"> Asignado a : </span>
              {deviceInfo.assignedTo.fluxerName}
            </p>
          ) : null}
          <p className="card-text">
            <span className="font-weight-bold"> Plataforma: </span>
            {deviceInfo.platform}
          </p>
          <p className="card-text">
            <span className="font-weight-bold"> IDFlux: </span>
            {deviceInfo.IDFlux}
          </p>
          <p className="card-text">
            <span className="font-weight-bold"> Funciona: </span>
            {deviceInfo.works ? 'SI' : 'NO'}
          </p>
          <p className="card-text">
            <span className="font-weight-bold"> IMEI: </span>
            {deviceInfo.IMEI}
          </p>
          <p className="card-text">
            <span className="font-weight-bold"> UDID: </span>
            {deviceInfo.UDID}
          </p>
          <p className="card-text">
            <span className="font-weight-bold"> Comentarios: </span>
            {deviceInfo.comments}
          </p>
          <DeviceBookingButtons
            deviceInfo={deviceInfo}
            id={id}
            onFinishDeviceAssigment={onFinishDeviceAssigment}
          />
        </div>
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
    deviceInfo: data.device && data.device
  }))
)(DeviceInfo);
