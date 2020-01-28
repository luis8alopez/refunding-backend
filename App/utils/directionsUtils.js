const apiKey = 'AIzaSyA4p-qk3jvIg6T5Uzm4AXWq4GVKA1-g1k8'; //Really bad practice
const axios = require('axios');
const meters = 1000;
const everySeventyEight = 110;
const banderazo = 3600;
const sum = 1500;


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

//REFACTOR --------
exports.getPrice = (kilometer) => {

    let distanceMeters = kilometer * meters;
    distanceMeters = distanceMeters/78;
    
    let price = (distanceMeters * everySeventyEight) + banderazo + sum;

    return price;

};