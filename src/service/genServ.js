import axios from "axios";
import { store } from "@/store/createStore.js"

function generalRequest(url, data) {
    return axios.post(
        url,
        {
            data: data
        },
        {
            headers: {
                Authorization: 'Bearer ' + store.state.jwtToken
            }
        }
    ).then(res => {
        return res.data.data
    })
}


// function samplePost() {
//     return generalRequest('/api/general/admin', null)
// }
//通用
function createuser(data) {
    return generalRequest('/api/general/createuser', data)
}
function changePassword(data) {
    return generalRequest('/api/general/changePassword', data)
}

//管理员
function gettrainList(data) {
    return generalRequest('/api/admin/gettrainList', data)
}
function getchangetrainList(data) {
    return generalRequest('/api/admin/getchangetrainList', data)
}
function gettrainInfo(data) {
    return generalRequest('/api/admin/gettrainInfo', data)
}
function trainadd(data) {
    return generalRequest('/api/admin/trainadd', data)
}
function trainedit(data) {
    return generalRequest('/api/admin/trainedit', data)
}
function trainDelete(data) {
    return generalRequest('/api/admin/trainDelete', data)
}

function getseatList(data) {
    return generalRequest('/api/admin/getseatList', data)
}
function getallseatList(data) {
    return generalRequest('/api/admin/getallseatList', data)
}
function getroomseatleft(data) {
    return generalRequest('/api/admin/getroomseatleft', data)
}
function getseatInfo(data) {
    return generalRequest('/api/admin/getseatInfo', data)
}
function seatadd(data) {
    return generalRequest('/api/admin/seatadd', data)
}
function seatedit(data) {
    return generalRequest('/api/admin/seatedit', data)
}
function seatDelete(data) {
    return generalRequest('/api/admin/seatDelete', data)
}

function getorderInfo(data) {
    return generalRequest('/api/admin/getorderInfo', data)
}
function ordermanageSubmit(data) {
    return generalRequest('/api/admin/ordermanageSubmit', data)
}

function getpassengerList(data) {
    return generalRequest('/api/admin/getpassengerList', data)
}
function passengerDelete(data) {
    return generalRequest('/api/admin/passengerDelete', data)
}
function getpassengerInfo(data) {
    return generalRequest('/api/admin/getpassengerInfo', data)
}
function passengerSubmit(data) {
    return generalRequest('/api/admin/passengerSubmit', data)
}

function getuserList(data) {
    return generalRequest('/api/admin/getuserList', data)
}
function usertypechange(data) {
    return generalRequest('/api/admin/usertypechange', data)
}
//用户
function getseatleftList(data) {
    return generalRequest('/api/customer/getseatleftList', data)
}
function gettransfertrainList(data) {
    return generalRequest('/api/customer/gettransfertrainList', data)
}
function getcustomerInfo(data) {
    return generalRequest('/api/customer/getcustomerInfo', data)
}
function customerSubmit(data) {
    return generalRequest('/api/customer/customerSubmit', data)
}

function getorderList(data) {
    return generalRequest('/api/customer/getorderList', data)
}
function getcanceledorderList(data) {
    return generalRequest('/api/customer/getcanceledorderList', data)
}
function getcompletedorderList(data) {
    return generalRequest('/api/customer/getcompletedorderList', data)
}
function orderSubmit(data) {
    return generalRequest('/api/customer/orderSubmit', data)
}
function orderstateSubmit(data) {
    return generalRequest('/api/customer/orderstateSubmit', data)
}
function orderDelete(data) {
    return generalRequest('/api/customer/orderDelete', data)
}

function time(data) {
    return generalRequest('/api/customer/time', data)
}





export {
    //通用
    createuser,
    changePassword,
 
    //管理员
    gettrainList,
    getchangetrainList,
    gettrainInfo,
    trainadd,
    trainedit,
    trainDelete,

    getseatList,
    getallseatList,
    getroomseatleft,
    getseatInfo,
    seatadd,
    seatedit,
    seatDelete,

    getorderInfo,
    ordermanageSubmit,

    getpassengerList,
    passengerDelete,
    getpassengerInfo,
    passengerSubmit,

    getuserList,
    usertypechange,

    //用户
    getseatleftList,
    gettransfertrainList,
    getcustomerInfo,
    customerSubmit,
    getorderList,
    getcanceledorderList,
    getcompletedorderList,
    orderSubmit,
    orderstateSubmit,
    orderDelete,
    time,
}