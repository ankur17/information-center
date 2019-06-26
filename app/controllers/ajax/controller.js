var services = require(_dir.DIR_SERVICES);
var UserService = services.UserService;
var utils = require("./utils");

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
    },

    addUsers: function (req,res) {
        //verify the data
        const hash_check = "cb915df5326216661c799cfbab60f11d";
        let data = req.body;
        // Id is auto generated
        const data_fields = [ "username", "name", "nickname", "gender", "age", "company", "job_role", "image","password","hash"]
        let valid_field = 0
        data_fields.forEach((each)=>{
            if (data.hasOwnProperty(each)){
                valid_field++
            }
        })

        if(valid_field == data_fields.length && data.hash===hash_check){
            let id = utils.strHash(data.username)
            console.log("THE ID",id)
            let userObj = {
                "id" : id,
                "nickname" : data.nickname,
                "password" : data.password,
                "username" : data.username
            }
            data["id"] = id
            UserService.create(userObj,(err,user)=>{
                delete data["password"]
                UserService.addUserInfo(data,()=>{
                    res.send({
                        done : true,
                        user : data
                    })
                })
            })
        } else {
            res.send({
                done : false,
                status : "Fields missing"
            })
        }

    }
};
