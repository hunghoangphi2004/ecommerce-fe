import { toast } from 'react-toastify';

export const notifySuccess = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 5000
    })
}

export const notifyError = (message) => {
    toast.warn(message, {
        position: "top-right",
        autoClose: 5000
    })
}

export const notifyInfo = (message) => {
    toast.info(message, {
        position: "top-right",
        autoClose: 5000
    })
}