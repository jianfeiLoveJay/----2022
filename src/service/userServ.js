import axios from "axios";

function userLoginReq(username, password) {
    return axios.post('/api/auth/login',
     {
        username: username,
        password: password
    }).then(res => {
        return res.data.accessToken;
    })
}
export {
    userLoginReq
}

function usersignupReq(username, password,usernum,role) {
    return axios.post('/api/auth/signup',
     {
        username: username,
        password: password,
        usernum: usernum,
        role:role,
    }).then(res => {
        return res.data.message;
    })
}
export {
    usersignupReq
}

function userLoginReqid(username, password) {
    return axios.post('/api/auth/login',
     {
        username: username,
        password: password
    }).then(res => {
        return res.data.id;
    })
}
export {
    userLoginReqid
}

function userLoginReqnum(username, password) {
    return axios.post('/api/auth/login',
     {
        username: username,
        password: password
    }).then(res => {
        return res.data.usernum;
    })
}
export {
    userLoginReqnum
}

function userLoginReqrole(username, password) {
    return axios.post('/api/auth/login',
     {
        username: username,
        password: password
    }).then(res => {
        return res.data.role;    
    })
}
export {
    userLoginReqrole
}

