import axios from "axios";

export default {
    // Gets all statements
    getStatements: function() {
        return axios.get("/api/statement");
    },
    // Gets the statement with the given id
    getStatement: function(id) {
        return axios.get("/api/statement/" + id);
    },
    // Deletes the statement with the given id
    deleteStatement: function(id) {
        return axios.delete("/api/statement/" + id);
    },
    // Saves a statement to the database
    saveStatement: function(bookData) {
        return axios.post("/api/statement", bookData);
    }
};