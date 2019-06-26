/**
 * Created by ankur on 13/6/19.
 */


var cron = require('node-cron');
var admin = require("firebase-admin");
var serviceAccount = require("./key/firebase-admin-key.json");

admin.initializeApp({
    databaseURL: "https://information-center-be32b.firebaseio.com",
    credential: admin.credential.cert(serviceAccount),
});

var db = admin.database();

var companyViewsRef = db.ref("/public/company/views");
var companyInfoRef = db.ref("/public/company/info");


const company_names = ["pratilipi","oyo","paytm","uber"]


function execute() {


    console.log('running a task every 10 minutes',new Date());

    // company_names.forEach((company) => {
    //     companyViewsRef.child(company).once('value', function (snap) {
    //         let data = snap.val() || {}
    //         let size = Object.keys(data).length
    //         // update the value to company info
    //         companyInfoRef.child(company).update({
    //             page_views: size
    //         })
    //
    //     })
    // })

}
execute()
