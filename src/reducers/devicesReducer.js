const initialState = {
    devices: [
        { name: 'iPhone 8 Plus', assignedTo: '', IDFlux: 'ID0279', platform: 'IOS', works: 'SI', OSVersion: '13.beta.7', 'IMEI': '', 'UDID': 'eb6416c3ee8589b78d22bf6a4ac46fee274dea8a', comments: '' },
        { name: 'iPhone 7', assignedTo: '', IDFlux: 'ID061', platform: 'IOS', works: 'SI', OSVersion: '12', 'IMEI': '', 'UDID': '34cd2acb4760780a1895296fbe4b49706826ba92', comments: '' },
        { name: 'Xiaomi Remi Note 7', assignedTo: 'Federico Rufrancos', IDFlux: 'ID0409', platform: 'Android', works: 'SI', OSVersion: '', 'IMEI': '', 'UDID': '', comments: '' }
    ]
}

export default function(state = initialState, action) {
    switch (action.type) {
        case 'ADD_DEVICE':
            return {
                ...state,
                devices: [...state.devices, action.payload]
            };
        case 'BOOK_DEVICE':
            return {
                ...state,
                devices: state.devices.map(device =>
                    device.IDFlux === action.payload.id ? {...device, assignedTo: action.payload.assignedTo } :
                    device
                )
            };
        default:
            return state;
    }
}