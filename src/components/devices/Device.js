import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Info } from '../../assets/info-circle-solid.svg';

const Device = ({ device }) => {
  return (
    <tr className={device.assignedTo ? 'table-danger' : 'table-dark'}>
      <th scope="row">{device.name}</th><td>{device.assignedTo}</td>
      <td>{device.OSVersion}</td>
      <td>
        <Link to={`/device/${device.id}`}>
          <Info className="app-icon" />
        </Link>
      </td>
    </tr>
  );
};

export default Device;
