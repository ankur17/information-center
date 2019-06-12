/**
 * Created by ankur on 12/6/19.
 */

import io from 'socket.io-client'

const address = 'http://localhost:9090'
const socket = io(address)




function liveViewsCount(callback){
    socket.on('connect',() =>{
        let {hash} = window.location
        // let paths = pathname.split("/")
        console.log("TTTTTTT",hash)
        // if(paths[0]=="company"){
        socket.emit('hello',{company_name : hash})
        socket.on('stats',data => callback(data))
        // }
    })
}

function setup(){
    socket.on('connect',() =>{
        console.log("client is connected")
    })
}

function emit(data) {
    socket.emit('hello',data)
}


function receiveData(callback) {
    console.log("On data receive")
    socket.on('stats',data => {
        console.log("Inside data receive",data)
        callback(data)
    })
}

export {liveViewsCount,setup,emit,receiveData}



