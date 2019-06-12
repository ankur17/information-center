var services = require(_dir.DIR_SERVICES);
var UserService = services.UserService;

module.exports = {
    testController: function(req,res){
        res.send({ans : "This controller is really working"});
    },

    getUserInfo : function (req,res) {

        let user = req.user;
        UserService.userInfo(user,(err,data)=>{
            res.send({
                err: err,
                data : data
            })
        })
    },

    getCompanyInfo : function (req,res) {
        let company_name = req.body.company_name;
        UserService.companyInfo(company_name,(err,data)=>{
            res.send({
                err: err,
                data : data
            })
        })
    },

    addCompanyViewCount : function (req,res) {
        let user = req.user;
        let data = req.body
        UserService.addCompanyViewCount(user,data,(err,data)=>{
            res.send({
                err: err,
                data : data
            })
        })
    }
};
