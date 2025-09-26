// import fs from 'fs';
import { io } from './index.js';
import Datastore from 'nedb';


// setup database
const db = new Datastore({ filename: 'database/counter.db', autoload: true });
// check if docuent exists



// read counter as integer from counter.txt
// const counter = parseInt(fs.readFileSync('counter.txt', 'utf8'));

// db.find({}, function (err, docs) {
//     console.log(docs.length);
// })

// No document found, initialize with default value
// global count variable

var lastAddition = null;
var count = 0;

// console.log(`Counter is ${counter} on startup`);


// write to counter file every 5 seconds
// setInterval(() => {
//   fs.writeFileSync('counter.txt', count.toString());
//   console.log(`Counter is ${count} and written to file`);
// }, 5000);

function updateCountFromDB() {
    db.find({}, function (err, docs) {
        if (err) {
            console.error('Error fetching documents:', err);
        } else {
            count = docs.length;
            console.log(`Counter updated to ${count}`);
            io.emit('countUpdated', count);
        }
    });
}

updateCountFromDB()

function sendComments() {
    // let docsend
    db.find({}, function (err, docs) {
        // console.log(docs)
        io.emit('commentList', docs)
        // docsend = docs
    })
    // return docsend
}



// functions to increment and decrement count
function increment(comment = 'No comment added'){
    
    db.insert({ createdAt: new Date(), comment: comment }, function (err, newDoc) {
        if (err) {
            console.error('Error inserting document:', err);
        } else {
            console.log('New document inserted with ID:', newDoc._id, comment);
            lastAddition = newDoc._id;
        }
    });


    updateCountFromDB();
    io.emit('countUpdated', count);
}

function decrement() {
    // count--;
    console.log('last addition was', lastAddition, 'removing');

    db.remove({ _id: lastAddition}, function (err, numRemoved) {});
    updateCountFromDB();
    io.emit('countUpdated', count);
}



export { count, increment, decrement, sendComments };