import axios from 'axios'
const baseUrl = 'https://fullstackopen-k6l1.onrender.com/api/persons';

const getAll = () => {
    console.log('Requesting data from:', baseUrl); // Log the URL being requested
    const request = axios.get(baseUrl);
    const nonExisting = {
        id: 10000,
        content: 'This phonebook entry is not saved to server',
        important: true,
    };
    return request.then((response) => response.data.concat(nonExisting));
};


const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then((response) => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then((response) => response.data)
}

const deleteEntry = (id) =>{
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then((response) => response.data)
}

export default {
    getAll,
    create,
    update,
    deleteEntry
}