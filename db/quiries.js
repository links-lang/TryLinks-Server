var user_quiries = require('./user-quiries');

module.exports = {
    // User DB actions.
    getAllUsers: user_quiries.getAllUsers,
    getAUser: user_quiries.getAUser,
    createUser: user_quiries.createUser,
    updateUser: user_quiries.updateUser,
    removeUser: user_quiries.removeUser

    // File DB actions.
    // TODO: complete when file db logic is ready.
};