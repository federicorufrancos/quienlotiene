import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../../assets/arrow-circle-left-solid.svg";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

const DeviceInfo = ({match, history}) => {
  const [deviceInfo, saveDeviceInfo] = useState({});

  const id = match.params.id;

  const { devices } = useSelector(state => state.devices);

  useEffect(() => {
    if (deviceInfo) {
      const deviceFound = devices.find(device => device.IDFlux === id);
      saveDeviceInfo(deviceFound);
      console.log("encontró el dispositivo");
    }
  }, [deviceInfo]);

  const reservar = () => {
    Swal.fire("Reservado!", "El dispositivo te fue asignado.", "success");
  };
  return (
    <div className="col-lg-12">
      <Link to="/" className="btn btn-info">
        <ArrowLeft className="app-icon p-1" />
        Volver al Listado
      </Link>

      <div className="card card-device-info border-secondary mb-3 mt-3">
        <div className="card-header">Información sobre el dispositivo</div>
        <div className="card-body">
          <p className="card-text">
            <span className="font-weight-bold">Nombre:</span> {deviceInfo.name}
          </p>
          { deviceInfo.assignedTo ?
            <p className="card-text">
                <span className="font-weight-bold">Asignado a:</span> {deviceInfo.assignedTo}
            </p>
          : null }
          <p className="card-text">
            <span className="font-weight-bold">Plataforma:</span>{" "}
            {deviceInfo.platform}
          </p>
          <p className="card-text">
            <span className="font-weight-bold">IDFlux:</span>{" "}
            {deviceInfo.IDFlux}
          </p>
          <p className="card-text">
            <span className="font-weight-bold">Funciona:</span>{" "}
            {deviceInfo.works}
          </p>
          <p className="card-text">
            <span className="font-weight-bold">IMEI:</span> {deviceInfo.IMEI}
          </p>
          <p className="card-text">
            <span className="font-weight-bold">UDID:</span> {deviceInfo.UDID}
          </p>
          <p className="card-text">
            <span className="font-weight-bold">Comentarios:</span>{" "}
            {deviceInfo.comments}
          </p>
        </div>
      </div>
      <button
        className="btn btn-success"
        type="button"
        onClick={() => reservar()}
      >
        Reservar
      </button>
    </div>
  );
};

export default DeviceInfo;
