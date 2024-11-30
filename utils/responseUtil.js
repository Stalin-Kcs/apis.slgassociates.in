class ResponseUtil {
    // static success(result) {
    //     return {
    //         success: true,
    //         data: result,
    //         message: ''
    //     };
    // }

    static error(error) {
        return {
            success: false,
            message: 'Your request operation has failed due to a technical issue',
            error: error.message
        };
    }
}

module.exports = ResponseUtil;
