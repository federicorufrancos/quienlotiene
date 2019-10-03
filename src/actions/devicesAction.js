export const addDeviceAction = (device) => {
    return {
        type: 'ADD_DEVICE',
        payload: device
    }
}

export const getDevices = () => {
    return {
        type: 'GET_DEVICES',
        payload: ''
    }
}