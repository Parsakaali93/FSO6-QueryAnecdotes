import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = () =>
axios.get(baseUrl).then(res => res.data)

export const addOne = obj =>
axios.post(baseUrl, obj).then(res => res.data)
    
export const modifyOne = (obj) =>
axios.put(`${baseUrl}/${obj.id}`, obj).then(res => res.data)
