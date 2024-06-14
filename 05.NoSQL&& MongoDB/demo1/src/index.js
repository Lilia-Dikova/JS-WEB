const mongoose = require ('mongoose');
const { Person } = require ('./models/person');
const { Article } = require ( './models/article');
async function start () {
    const connectionString = 'mongodb://localhost:27017/testdb';

    await mongoose.connect (connectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

    console.log('Database Connected');

    // const otherPerson = new Person ({
    //     firstName: 'Ushe',
    //     lastName: 'Bushe',
    //     age: 8,
    //     hobbies: ['Eating']
    // });

    // await Person.create({
    //     firstName: 'Tom',
    //     lastName: 'not Jerry',
    //     age: 11,
    //     hobbies:['Napping']
    // });


    //const myPerson = await Person.findOne({firstName: 'Mimi'});
    //myPerson.hobbies[0] = 'Sleeping';

    // try {
    //     await myPerson.save();
    //     mongoose.disconnect();

    // } catch (err){
    //     for ( const path in err.errors) {
    //         console.log(err.errors[path].properties);
    //     }
    // }

    //console.log(myPerson.sayHello());
   // console.log(myPerson.fullName);

//    const mimiCat = await Person.findOne({firstName: 'Mimi'});
//    console.log(mimiCat);

   //await Person.findByIdAndUpdate('66689861346806bca0de2f4a', {$set: {lastName: 'Lee', age:5}});

   //console.log(await Person.find({age: {$lt: 9, $gt: 4}}));
   //const result = await Person.find({}).where('age').gt(8).select('firstName lastName');

   //const result = await Person.find().sort({age: -1}); // decending  1 is for acending
   

//    const mimi = await Person.findOne({firstName: 'Mimi'});

//    await Article.create ( {
//     content: 'First Article',
//     author: mimi
//    });

   //await mimiCat.save();

   const result = await Article.find().populate('author', 'firstName lastName');

   console.log(result);
   mongoose.disconnect();
}

start();