//basic authentication middleware
//note, this has almost security built in (so no salting or anything like that)
//note, you can only pass in 1 profile
const baseAuth = function (serverCred){
    return function(req, res, next){
        if(req.headers.password == serverCred.password && req.headers.username == serverCred.username){
            req.loggedIn = true
        }else{
            req.loggedIn = false
        }
        next()
    }
}
export default baseAuth