const directionUtil = require('../utils/directionsUtils');
let direction;

exports.getAxios = async (req,res) => {
    origin = req.query.origin;
    destination = req.query.destination;
    direction = await directionUtil.getKm(origin,destination);

    res.status(200).send({
        message: 'Succesful',
        data: direction
    });
};