/**
 * Created by ankur on 12/6/19.
 */

import io from 'socket.io-client'

const socket = io("/");


function setup(){
    socket.on('connect',() =>{
        console.log("client is connected")
    })
}

function emit(data) {
    socket.emit('tunnel',data)
}


function receiveData(callback) {
    socket.on('stats',data => {
        callback(data)
    })
}

export {setup,emit,receiveData}



