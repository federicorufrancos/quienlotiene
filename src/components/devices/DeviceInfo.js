import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../../assets/arrow-circle-left-solid.svg";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { updateDeviceAssignmentAction } from "../../actions/devicesAction";

const DeviceInfo = ({ match, history }) => {
  const [deviceInfo, saveDeviceInfo] = useState({});

  const id = match.params.id;

  const dispatch = useDispatch();
  const updateDeviceAssignment = booking => dispatch(updateDeviceAssignmentAction(booking));

  const { devices } = useSelector(state => state.devices);

  useEffect(() => {
    if (deviceInfo) {
      const deviceFound = devices.find(device => device.IDFlux === id);
      saveDeviceInfo(deviceFound);
    }
  }, [deviceInfo]);

  let operation = "Reservar";
  let classNameOperation = "btn-danger";
  let nextAssignTo = 'Federico Rufrancos';
  let alerOpt = ["Reservado!", "El dispositivo te fue asignado.", "success"];
  if (
    deviceInfo.assignedTo !== '' &&
    deviceInfo.assignedTo === 'Federico Rufrancos'
  ) {
    classNameOperation = 'btn-success';
    operation = 'Liberar dispositivo';
    alerOpt = ["Liberado!", "Gracias por liberar el dispositivo.", "success"]
    nextAssignTo = '';
  } else if (deviceInfo.assignedTo !== "") {
    classNameOperation = 'btn-warning';
    operation = 'Solicitar dispositivo';

  }



  const onUpdateDeviceAssignment = () => {
    updateDeviceAssignment({ id, assignedTo: nextAssignTo });
    Swal.fire(...alerOpt);
    history.push("/");
  };

  return (
    <div className="col-lg-12">
      <Link to="/" className="btn btn-info">
        <ArrowLeft className="app-icon p-1" />
        Volver al Listado
      </Link>
      <div>
        <div className="card card-device-info border-secondary mb-3 mt-3">
          <div className="card-header"> Información sobre el dispositivo </div>
          <div className="card-body">
            <p className="card-text">
              <span className="font-weight-bold"> Nombre: </span>
              {deviceInfo.name}
            </p>
            {deviceInfo.assignedTo ? (
              <p className="card-text">
                <span className="font-weight-bold"> Asignado a : </span>
                {deviceInfo.assignedTo}
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
              {deviceInfo.works}
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
          </div>
        </div>
        <button
          className={'btn ' + classNameOperation}
          type="button"
          onClick={() => onUpdateDeviceAssignment()}
        >
          {operation}
        </button>
      </div>
    </div>
  );
};

export default DeviceInfo;
