Query 1 - Remove middle element using pull

db.users.updateOne({_id: ObjectId('59b99db6cfa9a34dcd7885bb')},{$set: {myarr: [{num1:1}, {num2:2}, {num3:3}]}}) //for creating array of object
db.users.updateMany({},{$pull: {myarr: {num2:2}}}) // deleting middle element from array
db.users.findOne({_id: ObjectId('59b99db6cfa9a34dcd7885bb')}) // again checking

Query 2 - Use anding and oring in one query

//Firstly we are going to add some data

db.users.updateOne({_id: ObjectId('59b99dc2cfa9a34dcd7885d2')}, {$set: {qty: 19, price:140, discount:100}})
db.users.updateOne({_id: ObjectId('59b99dc0cfa9a34dcd7885d1')}, {$set: {qty: 19, price:140, discount:100}})
db.users.updateOne({_id: ObjectId('59b99dc0cfa9a34dcd7885d1')}, {$set: {qty: 99, price:40, discount:90}})

//then we are going to pefrom oring and nding together
db.users.find({$and: [{ $or: [ { qty: { $gt : 50 } }, { price : { $lt: 40 } } ] },{ $or: [ { price: { $gt : 100 } }, {discount  : { $gte: 50 } } ] }]})

Query 3 - to perfeom limit,skip,count

db.movies.find().limit(4) //limit method for getting how much amount of data you want
db.movies.find().limit(2).skip(3) //skip method for skip that much amount of resource
db.movies.find().limit(2).skip(3).sort({title: 1}) //sort method is for sorting the schema according to given field


query 4 - to use regex


db.movies.find({plot: {$regex:"access"}}) //regex method 
db.movies.find({plot: {$regex:"access"}}).limit(2).skip(4).sort({title: 1})//applied some additional function on regex

query 4 - Performing all update method of mongo

1.push = db.users.updateMany({},{$push:{myarr: {num5:5}}}) //for pushing new element in collection
2.pop = db.users.updateOne({_id: ObjectId('59b99db6cfa9a34dcd7885bb')},{$pop: {myarr:-1}}) //removing element from start
        db.users.updateOne({_id: ObjectId('59b99db6cfa9a34dcd7885bb')},{$pop: {myarr:1}}) //removing element from last

3.inc = db.users.updateOne({_id: ObjectId('59b99db6cfa9a34dcd7885bb'), "myarr.num3":3},{$inc: {"myarr.$.num3": 2}})//use to increment
        db.users.updateOne({_id: ObjectId('59b99db6cfa9a34dcd7885bb'), "myarr.num4":4},{$inc: {"myarr.$.num4": -2}})//use to decrement

4.addToSet = db.users.updateOne({_id: ObjectId('59b99db6cfa9a34dcd7885bb')},{ $addToSet: { myarr: {num4:4} } })//use to set the value if doesnt exist

5.rename = db.movies.updateOne({_id: ObjectId('59b99db6cfa9a34dcd7885bb')}, {$rename: {'myarr': 'yourarr'}})// for renaming field names

6.each = db.users.updateOne({_id: ObjectId('59b99db6cfa9a34dcd7885bb')}, { $push: { colors: { $each: ['pink','green']} } })//each method is used with push used to append

7.set = db.users.updateOne({_id: ObjectId('59b99db6cfa9a34dcd7885bb')}, {$set: {'email': 'yashgupta@gkmit.co' }})//use to update the field
        db.users.updateOne({_id: ObjectId('59b99db6cfa9a34dcd7885bb'), "testy.name": 'test'}, { $set: { "testy.$.name": "again" }})//for updating array of object fields

8.unset = db.users.updateOne({_id: ObjectId('59b99db6cfa9a34dcd7885bb')}, {$unset: {'password': ''}})//for removing the field from collection


