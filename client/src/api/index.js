import axios from "axios";
//import { response } from "express";

export default {
    authenticate: function() {
        return axios.post("/authenticate")
            .then(response => {
                return response.data;
            });
    }
};