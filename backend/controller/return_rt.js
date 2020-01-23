module.exports = {
    return_rt: (res, success, message) => {
        return res.json({
            success: success,
            message: message
        });
    }
}