import axios from "axios";

export default {
    authenticate: function() {
        return axios.post("/authenticate")
            .then(response => {
                return response.data;
            }).catch(error => {
                console.log(error);
            });
    },
    createTestUser: function(userData) {
        return axios({
            method: "post",
            url:"/createTestCustomer",
            data: {
                data: userData
            }
        }).catch(error => {
            console.log(error);
        }).then(response => {
            return response.data;
        });
    }
};