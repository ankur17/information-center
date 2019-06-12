var services = require(_dir.DIR_SERVICES);

module.exports = {
    testController: function(req,res){
        res.send({ans : "This controller is really working"});
    },
};
