const apiKey = 'AIzaSyA4p-qk3jvIg6T5Uzm4AXWq4GVKA1-g1k8';
const axios = require('axios');


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
            return direct.data;
        }else{
            console.log('i do not know'); 
        }
    }).catch(error =>{
        console.log(error);
        return error;
    })

};