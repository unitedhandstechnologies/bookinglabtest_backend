const exception = require("../constants/exception.json");

const permission = {
    permissionId: 0,
    id: function (req,res,next) {
        decodedToken.id = this.permissionId;
        next();
    }
}

const checkAuthorization = async (req, res, next) => {
    try {
        const isPermissionExists = decodedToken.permissions.includes(decodedToken.id);
        if (!isPermissionExists) {
            return res.status(403).send({ statusCode:403, message: exception.accessHaveNot });
        }
        next();
    } catch (err) {
        return res.status(500).send(err);
    }
};

module.exports = { checkAuthorization ,permission };