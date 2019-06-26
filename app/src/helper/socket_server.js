/**
 * Created by ankur on 12/6/19.
 */

const redis = require('redis')



module.exports = function(server) {

    if(process.env.REDIS_URL == undefined){
        throw "REDIS SERVER NOT FOUND- Live count is unabled"
        return;
    }



    const client = redis.createClient( process.env.REDIS_URL || "")

    var io = require('socket.io').listen(server);

    io.on('connection',(socket)=>{

        socket.on('tunnel',data => {
            let key = data.company_name
            let userId = data.id
            socket.join(key)

            if(data.action_type=="INCREMENT"){
                // add the userid in the set
                client.sadd(key,userId,(error,count)=>{
                    client.scard(key,(err,view)=>{
                        io.to(key).emit('stats',view)
                    })
                })
            }

            if(data.action_type=="DECREMENT"){
                // remove the userid from the set
                client.srem(key,userId,(error,count)=>{
                    client.scard(key,(err,view)=>{
                        io.to(key).emit('stats',view)
                    })
                })

            }
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

