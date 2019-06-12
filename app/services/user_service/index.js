var service = require('./service')

module.exports = {
    authorize: service.authorize,
    create: service.create,

    companyInfo: service.companyInfo,
    userInfo: service.userInfo,
    addCompanyViewCount: service.addCompanyViewCount,


};
