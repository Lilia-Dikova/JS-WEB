const express = require('express');
const { configDatabase } = require('./config/configDatabase');
const { configExpress } = require('./config/configExpress');
const { configHbs } = require('./config/configHbs');
const { configRoutes } = require('./config/configRoutes');
const { register, login } = require('./services/user');
const { createToken, verifyToken } = require('./services/jwt');
const api = require('./services/volcano');



async function start() {
    const app = express();
    await configDatabase();
    configExpress(app);
    configHbs(app);
    configRoutes(app);

    app.listen(3000, () => {
        console.log('Server started http://localhost:3000');
        //testData();   
        }
);};

start();



/*TEST USER SERVICES
 async function test() {
     try {
     //check login and register
        const result = await register ('lili@abv.bg','Lili', 'admin123');
        const token = createToken(result);
      //check token const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc2YWE2YTkyOGMyNjdmYzRlMjY0NjYiLCJ1c2VybmFtZSI6Ik1pbWkiLCJlbWFpbCI6Im1pbWlAYWJ2LmJnIiwiaWF0IjoxNzE5MDUyOTA2LCJleHAiOjE3MTkxMzkzMDZ9.ZG-haRZ2qodmhOKcMMhH4wujimu85aDbOyhERQk7dgE'
     // const parsed = verifyToken(token) 
     console.log(token);

    } catch (err) {
        console.log(err.message);
    }
} */

//TEST DATASERVICE

async function testData() {
    try {  
        // CREATE RECORD
        /*
        const result = await api.create( {
            name: 'Mount Merapi',
            location: 'Indonesia',
            elevation: '142',
            lastEruption: '2023',
            image: 'http://localhost:3000/static/images/etna.jpg',
            typeVolcano: 'Stratovolcanoes',
            description: 'Merapi (“Mountain of Fire”) rises to 9,551 feet (2,911 meters) and has steep slopes with dense vegetation on its lower flanks. It is the most active of Indonesia\'s 130 active volcanoes. One of its largest eruptions occurred in 1006 and spread ash throughout central Java.',
        },'6676b19d3a43dbf4aa8c4750');

        console.log(result);
        */
        

        //EDIT RECORD
       /*
        const dataId = '6676b56b5d30fe20e169cf52';
        const formData = {
            name: 'Hunga Tonga',
            location: 'Tonga Islands',
            elevation: '113',
            lastEruption: '2022',
            image: 'http://localhost:3000/static/images/hunga-tonga.jpg',
            typeVolcano: 'Submarine',
            description: 'Hunga Tonga-Hunga is a submarine volcano in the South Pacific located about 30 km south of the submarine volcano of Fonuafo\'ou and 65 km north of Tongatapu, Tonga\'s main island. It is part of the highly active Kermadec-Tonga subduction zone and its associated volcanic arc, which extends from New Zealand north-northeast to Fiji, and is formed by the subduction of the Pacific Plate under the Indo-Australian Plate. It lies about 100 km above a very active seismic zone.',
        };

        const userId = '6676b19d3a43dbf4aa8c4751';

        const data = await api.update(dataId, formData, userId); 
        console.log(data);

        */

        //DELETE RECORD
        /*
        const dataId = '6676b6bcd06731dbd09fafa9';
        const userId = '6676b19d3a43dbf4aa8c4750';

        const data = await api.deleteById(dataId, userId); 
        console.log(data);
       */

        //ADD VOTE
        const dataId = '6676b755e82d5a0afd2c0d6a';
        const userId = '66774a783228f4da4766a24b';

        const data = await api.addVote(dataId, userId); 
        console.log(data.voteList.length);


    } catch (err) {
        console.log(err.message);
    }
}
