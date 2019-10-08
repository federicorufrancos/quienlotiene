export const addDeviceAction = (device) => {
    return {
        type: 'ADD_DEVICE',
        payload: device
    }
}

export const bookDeviceAction = (booking) => {
    return {
        type: 'BOOK_DEVICE',
        payload: booking
    }
}