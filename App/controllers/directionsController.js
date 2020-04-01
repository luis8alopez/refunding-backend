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

//Bad Practice
exports.getPrice = (req,res) => {
    const price = directionUtil.getPrice(req.query.kilometer);

    res.status(200).send({
        message: 'The price you should pay is: ',
        data: price
    });
};

exports.getRefund = (req,res) => {
    const refund = directionUtil.getRefund(req.query.price);

    res.status(200).send({
        message: 'The array containig the bills info is',
        refund : refund
    });
}