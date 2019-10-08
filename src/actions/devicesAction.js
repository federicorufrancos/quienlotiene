export const addDeviceAction = (device) => {
    return {
        type: 'ADD_DEVICE',
        payload: device
    }
}

export const updateDeviceAssignmentAction = (booking) => {
    return {
        type: 'UPDATE_DEVICE_ASSIGNMENT',
        payload: booking
    }
}