//this file will return next() when used as a middleware in route if the user is authenticated
//which will allow them to advance the the page they are trying to reach
module.exports = function (req, res, next) {
    //This statement checks if the user is logged in and will send them to their page
    if(req.user) {
        return next();
    }

    //if not, then it will reroute them to the home page
    return res.redirect("/");
};