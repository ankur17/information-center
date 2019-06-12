/**
 * Created by ankur on 12/6/19.
 */

const io = require('socket.io')(9090)
const redis = require('redis')
const client = redis.createClient()


console.log("The reddis is starting")
module.exports = function() {
    io.on('connection',(socket)=>{
        console.log("Server socket connected")

        socket.on('hello',data => {
            let key = data.company_name

            socket.join(key)
            client.incr(key,(error,count)=>{
                console.log("hehehe",key,count)
                io.to(key).emit('stats',count)
            })
            console.log("Server received data:",data)
        })


        // socket.on("disconnect", () => {
        //     console.log("Client disconnected")
        //     client.decr(key,(error,count)=>{
        //         console.log("hehehe",key,count)
        //         io.to(key).emit('stats',count)
        //     })
        // })

    })

}

