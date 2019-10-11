import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

import Device from './Device';
import Header from '../layouts/Header';

const ListDevices = ({ devices }) => {
  if (!devices) return <h1> Esperando </h1>;

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
            <th scope="col"> Nombre </th>
            <th scope="col"> Asignando a </th>
            <th scope="col"> Versión OS </th>
            <th scope="col"> Acción </th>
          </tr>
        </thead>
        <tbody>
          {devices.map(device => (
            <Device key={device.id} device={device} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

ListDevices.propTypes = {
  firestore: PropTypes.object.isRequired,
  devices: PropTypes.array.isRequired
};

export default compose(
  firestoreConnect([{ collection: 'devices' }]),
  connect((state, props) => ({ devices: state.firestore.ordered.devices }))
)(ListDevices);
