import axios from 'axios'

export const API_TEST = 'https://65c725a0e7c384aada6e3911.mockapi.io/api/v1/'

const $api = axios.create({
    baseURL: API_TEST,
    headers: {
        "Content-Type": "application/json"
    }
})

export default $api
