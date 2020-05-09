const apiKey = 'AIzaSyA4p-qk3jvIg6T5Uzm4AXWq4GVKA1-g1k8';
const axios = require('axios');
const meters = 1000;
const everySeventyEight = 110;
const banderazo = 3600;
const sum = 1500;
const bills = [100000,50000,20000,10000,5000,2000,1000,500,200,100,50];


exports.getKm = (origin, destination) => {

    const data = async () => {
        try {
            return await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`);

        } catch (error) {
            console.error(error);
        }
    }

    return data().then(direct => {
        if(direct){
            console.log("Retorno del llamado a axios",direct.data);
            return direct.data.routes;
        }else{
            console.log('i do not know'); 
        }
    }).catch(error =>{
        console.log(error);
        return error;
    })

};

exports.getPrice = (kilometer) => {

    let distanceMeters = kilometer * meters;
    distanceMeters = distanceMeters/78;
    
    let price = (distanceMeters * everySeventyEight) + banderazo + sum;

    let retorno = parseInt(price);

    return retorno;

};

exports.getRefund = (price) => {
    //Traer el dinero disponible del user que entra.
    let refunds = [0,0,0,0,0,0,0,0,0,0,0];
    let anterior;
    let i = 0;

    if(price==0){
        return refunds;
    }
    let jsonObj = {refund:{

    }};

    while(price>0){
        console.log(`precio tiene en iteración ${i}: `,price)

        if(price>=bills[i]){
            refunds[i]+=1;
            price-=bills[i];
            //Test
            jsonObj.refund[bills[i]] = refunds[i];
        }else{
            anterior=i;
            i+=1;
        }

        //Special case
        if(price>0 && price<50){
            refunds[10]+=1;
            jsonObj.refund['50'] = refunds[i];
            price-=50;
        }
        if(i>10){
            i=0;
        }
    }
    console.log("El array tiene: ", refunds);
    console.log("el json tiene: ",jsonObj);
    return jsonObj;
}

