import React from 'react';

const DeviceBookingButtons = ({ deviceInfo, id, onFinishDeviceAssigment }) => {
  let operation = 'Reservar';
  let classNameOperation = 'btn-danger';
  let alerOpt = ['Reservado!', 'El dispositivo te fue asignado.', 'success'];
  let operationStatus = 'assign';
  if (
    deviceInfo.assignedTo !== '' &&
    deviceInfo.assignedTo.fluxerName === 'Federico Rufrancos'
  ) {
    classNameOperation = 'btn-success';
    operation = 'Liberar dispositivo';
    alerOpt = ['Liberado!', 'Gracias por liberar el dispositivo.', 'success'];
    operationStatus = 'release';
  } else if (deviceInfo.assignedTo !== '') {
    classNameOperation = 'btn-warning';
    operation = 'Solicitar dispositivo';
    operationStatus = 'pending';
  }

  const onUpdateDeviceAssignment = () => {
    let newAssignation = '';
    let waitingList = deviceInfo.waitingList ? deviceInfo.waitingList : [];
    let newAssignationRecord = '';
    switch (operationStatus) {
      case 'assign':
        newAssignation = {
          fluxerId: 1111,
          fluxerName: 'Federico Rufrancos',
          dateAssigned: new Date().toLocaleDateString()
        };
        break;
      case 'pending':
        newAssignation = deviceInfo.assignedTo;
        waitingList.push({
          fluxerId: 1111,
          fluxerName: 'Federico Rufrancos',
          dateRequest: new Date().toLocaleDateString()
        });
        break;
      case 'release':
        newAssignationRecord = { ...deviceInfo.assignedTo };
        newAssignationRecord.dateRelease = new Date().toLocaleDateString();
        newAssignationRecord.deviceId = id;
        deviceInfo.assignedTo = '';
        if (waitingList.length > 0) {
          newAssignation = waitingList.pop();
          newAssignation.dateAssigned = new Date().toLocaleDateString();
          deviceInfo.assignedTo = newAssignation;
          alerOpt = [
            'Reasignado!',
            'El dispositivo fue asignado al proximos Fluxer.',
            'success'
          ];
        }
        break;
      default:
        break;
    }
    const deviceUpdated = {
      ...deviceInfo,
      assignedTo: newAssignation,
      waitingList
    };
    onFinishDeviceAssigment(deviceUpdated, alerOpt, newAssignationRecord);
  };

  return (
    <button
      className={'btn ' + classNameOperation}
      type="button"
      onClick={() => onUpdateDeviceAssignment()}
    >
      {operation}
    </button>
  );
};

export default DeviceBookingButtons;
