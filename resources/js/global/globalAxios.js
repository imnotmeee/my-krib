import axios from "axios";

const globalAxios = axios.create({
    headers: {
        Accept: 'application/json',
        
    }
})

export default globalAxios;