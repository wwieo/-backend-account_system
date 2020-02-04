const return_rt = (res, success, message) => {
    return res.json({
        success: success,
        results: message
    });
}

module.exports = { return_rt }