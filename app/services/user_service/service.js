var admin = require("firebase-admin");
var utils = require("./utils");

var serviceAccount = require("../../../app/keys/firebase-admin-key.json");
admin.initializeApp({
    databaseURL: "https://information-center-be32b.firebaseio.com",
    credential: admin.credential.cert(serviceAccount),
});
var db = admin.database();

var usersRef = db.ref("/private/users/credentails");
var usersInfo = db.ref("/private/users/info");
var companyInfo = db.ref("/public/company/info");
var companyViews = db.ref("/public/company/views");

var UserService = {
    authorize: function(user, callback) {
        let userKey = utils.strHash(user.username);
        let passHash = utils.passHash(user.password)
        usersRef.child(userKey).once("value",function(snapshot) {
            var myUser = snapshot.val();
            if( myUser && (myUser.password==passHash)){
                callback(null,myUser);
            }else{
                callback('Authorization Error',null)
                // UserService.create(user,callback);
            }
        });
    },
    create: function(user, callback) {
        var hash = utils.strHash(user.username);
        // let encode = user.email.substring(0,user.email.lastIndexOf('.')).replace('@','_')+"-"+hash; // ankurhinshirts-#
        // user.userId = encode;
        usersRef.child(hash).set(user, function(err) {
            if (err) {
                callback('Unexpected Error, Try Again', null);
            } else {
                callback(null, user);
            }
        });
    },

    userInfo : function (user,callback) {
        let userId = user.id;

        usersInfo.child(userId).once("value", function(snap) {
            let userData = snap.val();
            callback(null,userData)
        });
    },

    companyInfo : function (company_name,callback) {

        companyInfo.child(company_name).once("value", function(snap) {
            let companyData = snap.val();
            callback(null,companyData)
        });
    },

    addCompanyViewCount :function (user,data,callback) {
        let userId = user.id;
        let company = data.company_name
        companyViews.child(company).child(userId).set({id : userId,...data},function (err) {
            callback(null, true)
        })
    },

    addUserInfo : function(data,callback) {
        let user = data.id
        usersInfo.child(user).set(data,function (err) {
            callback(err, true)
        })
    }


  }

module.exports = UserService;
