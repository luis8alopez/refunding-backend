const apiKey = 'AIzaSyA4p-qk3jvIg6T5Uzm4AXWq4GVKA1-g1k8';
const axios = require('axios');
const meters = 1000;
const everySeventyEight = 110;
const banderazo = 3600;
const sum = 1500;
const bills = [100000, 50000, 20000, 10000, 5000, 2000, 1000, 500, 200, 100, 50];


exports.getKm = (origin, destination) => {

    const data = async () => {
        try {
            return await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`);

        } catch (error) {
            console.error(error);
        }
    }

    return data().then(direct => {
        if (direct) {
            console.log("Retorno del llamado a axios", direct.data);
            return direct.data.routes;
        } else {
            console.log('i do not know');
        }
    }).catch(error => {
        console.log(error);
        return error;
    })

};

exports.getPrice = (kilometer) => {

    let distanceMeters = kilometer * meters;
    distanceMeters = distanceMeters / 78;

    let price = (distanceMeters * everySeventyEight) + banderazo + sum;

    let retorno = parseInt(price);

    return retorno;

};

exports.getRefund = (price) => {
    //Traer el dinero disponible del user que entra.
    let refunds = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let anterior;
    let i = 0;

    if (price == 0) {
        return refunds;
    }
    let jsonObj = {
        refund: {

        }
    };

    while (price > 0) {
        console.log(`precio tiene en iteración ${i}: `, price)

        if (price >= bills[i]) {
            refunds[i] += 1;
            price -= bills[i];
            //Test
            jsonObj.refund[bills[i]] = refunds[i];
        } else {
            anterior = i;
            i += 1;
        }

        //Special case
        if (price > 0 && price < 50) {
            refunds[10] += 1;
            jsonObj.refund['50'] = refunds[i];
            price -= 50;
        }
        if (i > 10) {
            i = 0;
        }
    }
    console.log("El array tiene: ", refunds);
    console.log("el json tiene: ", jsonObj);
    return jsonObj;
}

exports.getRefundRefactor = (price, user) => {

    let refunds = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let userMoney = user.currentMoney;
    let arr = ['50', '100', '200', '500', '1000', '2000', '5000', '10000', '20000', '50000', '100000'];
    let jsonObj = { refund: {} };
    let j = 10;
    let flag = 0;

    while (price > 0) {
        if (price >= arr[j]) {
            if (userMoney[arr[j]] != 0) {
                userMoney[arr[j]] -= 1;
                refunds[j] += 1;
                price -= parseInt(arr[j]);
                jsonObj.refund[arr[j]] = refunds[j];
            } else {
                j -= 1;
            }
        } else {
            j -= 1;
        }
        if (price > 0 && price < 50) {
            refunds[0] += 1;
            jsonObj.refund['50'] = refunds[0];
            price -= 50;
        }
        if (j < 0) {
            j = 10;
            flag += 1;
        }

        if (flag == 3) {
            return null
        }
        // console.log("Refund obj en cada iteración tiene: ", refunds);
        // console.log("Current: ", userMoney.refund);
    }
    return { jsonObj, userMoney };
}

exports.sumMoney = (vieja, nueva) => {

    let arr = ['50', '100', '200', '500', '1000', '2000', '5000', '10000', '20000', '50000', '100000'];

    for (let i = 0; i < arr.length; i++) {
        if (isNaN(nueva[arr[i]])) {
            console.log("Problema: ", nueva[arr[i]]);
        }
        else {
            vieja[arr[i]] += nueva[arr[i]];
        }

    }
    console.log("El retorno será: ", vieja);
    return vieja;
}

exports.sumTotal = (currentMoney) =>{

    let arr = ['50', '100', '200', '500', '1000', '2000', '5000', '10000', '20000', '50000', '100000'];
    let sum = 0;
    for(let i = 0; i<11;i++){
        sum = sum + (currentMoney[arr[i]] * parseInt(arr[i]));
    }
    return sum;
}

exports.getDolar = async (peso) => {
    let call = await axios.get("https://free.currconv.com/api/v7/convert?q=USD_COP,COP_USD&compact=ultra&apiKey=234582b91a716611fea5");

    console.log(call.data);

    let dolars = peso / call.data["USD_COP"];
    console.log("Dolars :" , dolars);
    return dolars;
}

