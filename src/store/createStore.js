import {createStore } from 'vuex';
import VuexPersist from 'vuex-persist';
import router from '@/router/index.js';
import { userLoginReq } from '@/service/userServ.js'
import { userLoginReqrole } from '@/service/userServ.js';
import { userLoginReqid } from '@/service/userServ.js';
import { userLoginReqnum } from '@/service/userServ.js';
import { ElMessage } from 'element-plus'

const vuexLocalStorage = new VuexPersist({
    key: 'vuex', // The key to store the state on in the storage provider.
    storage: window.localStorage, // or window.sessionStorage or localForage
    // Function that passes the state and returns the state with only the objects you want to store.
    // reducer: state => state,
    // Function that passes a mutation and lets you decide if it should update the state in localStorage.
    // filter: mutation => (true)
  })
  //登陆状态及TOKEN和用户名的存放
const store = createStore({
    state () {
        return {
            loggedIn : false,
            username : "",
            jwtToken: ""
        }
      },
    mutations: {
        login (state, {username, jwtToken}) {
            state.loggedIn = true,
            state.username = username,
            state.jwtToken = jwtToken
        },
        logout(state) {
            state.loggedIn = false,
            state.username = "",
            state.jwtToken = ""
        }
      },

    actions : {
        login({commit}, {username, password}) {
         return userLoginReq(username, password)
          .then((jwtToken) => {
            commit('login', {username, jwtToken})
            userLoginReqrole(username, password).then(resr=>{
              userLoginReqid(username, password).then(resid=>{
                userLoginReqnum(username, password).then(resnum=>{
                // console.log(typeof(resr));
              if(resr == 1){
                ElMessage({
                  message: '管理员登录成功',
                  type: 'success',
                })
                router.push('/Homeadmin')
                localStorage.setItem('identity', '1');
                localStorage.setItem('sid',resid);
                localStorage.setItem('usernum',resnum);
                localStorage.setItem('username',username);
                localStorage.setItem('password',password)  
              }
              if(resr == 2){
                ElMessage({
                  message: '学生登录成功',
                  type: 'success',
                })
                router.push('/Home')
                localStorage.setItem('identity', '2');
                localStorage.setItem('sid',resid);
                localStorage.setItem('usernum',resnum);
                localStorage.setItem('username',username);
                localStorage.setItem('password',password);
              }     
              if(resr == 3){
                ElMessage({
                  message: '用户已被禁用',
                  type: 'error',
                })
                router.push('/login')
              }   
            })
            })
            })
            //if()
            
          })
        }
      },
    plugins: [vuexLocalStorage.plugin]
  });
  
export {store}