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
            let userId = data.id
            socket.join(key)
            console.log("Adding Reddis",key,userId);
            client.sadd(key,userId,(error,count)=>{
                console.log("hehehe",key,count)
                client.scard(key,(err,view)=>{

                    console.log("YYYYYYYYYYYYYYY",key,err,view)

                    io.to(key).emit('stats',view)
                })
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

