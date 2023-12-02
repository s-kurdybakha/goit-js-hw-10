import axios from "axios";

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_rUuI2f5nx3rsjOqOeqv4XaeTjOCIIZG4lenBhHknmEm03rl4fI4L3VvZJXwsPnVa';

axios.defaults.headers.common["x-api-key"] = API_KEY;

export function fetchBreeds() {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/breeds`)
            .then((response) => {
                resolve(response.data)
            })
            .catch((response) => {
                reject(response)
            })
    })
}

export function fetchCatByBreed(breedId) {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/images/search`, {
            params: {
                breed_ids: breedId
            }
        })
            .then((response) => {
                resolve(response.data)
            })
            .catch((response) => {
                reject(response)
            })
    })
}



