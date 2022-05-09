var User = require('../models/user')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
const user = require('../models/user')
var Mass = require('../models/mass')
var Sleep = require('../models/sleep')
var Workout = require('../models/workout')
var Milk = require('../models/milk')
var express = require('express')
var Food = require('../models/food')
const mongoose = require('mongoose')
const multer =require('multer')

var functions = {
    addNew: function (req, res) {
        
        if ( ((req.body.password==false))   ||   ((req.body.name==false)) ) {

                res.json({success: false, msg: 'Enter all fields'}) }
        else {
            var newUser = User({
                name: req.body.name,
                password: req.body.password
            });
            newUser.save(function (err, newUser) {
                if (err) {
                    res.json({success: false, msg: 'Failed to save'})
                }
                else {
                    res.json({success: true, msg: 'Successfully saved'}),
                    console.log("name:" +  req.body.name),
                    console.log("password:" +  req.body.password ),
                    console.log("password:" +  req.body.id )
                
                    
                }
            })
            
        }
    },
    authenticate: function (req, res) {
        User.findOne({
            name: req.body.name
        }, function (err, user) {
                if (err) throw err
                if (!user) {
                    res.status(403).send({success: false, msg: 'Authentication Failed, User not found'})
                }

                else {
                    user.comparePassword(req.body.password, function (err, isMatch) {
                        if (isMatch && !err) {
                            //secret is in dbconfig
                            var token = jwt.encode(user, config.secret)
                            res.json({success: true, token: token}) //send token back to the user
                        }
                        else {
                            return res.status(403).send({success: false, msg: 'Authentication failed, wrong password'})
                        }
                    })
                }
        }
        )
    },
    
    getinfo: function (req, res) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            var token = req.headers.authorization.split(' ')[1]
            var decodedtoken = jwt.decode(token, config.secret)
            return res.json({success: true, msg: 'Hello ' + decodedtoken.name})
        }
        else {
            return res.json({success: false, msg: 'No Headers'})
        }
    },
getUsers : async (req, res) =>{
    const name = req.params.name;
    console.log(name);
   await User.findOne({name: req.params.name},)
    .then(user => {
        res.send(user),
        console.log(user);
    })
    .catch(err => {
        res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
    })
  },

  //var myquery = { address: "Valley 345" },
  //var newvalues = { $set: { address: "Canyon 123" } },
// Update a new idetified user by user id
update : function(req, res){
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }
    console.log(req.file); 
    //new obj available to you due to upload.single('productImage') this middleware being executed first
    req.file.path = req.file.path.replace(/\\/g, '/') ;
    console.log("New: " +req.file ); 
    User.updateOne({name: req.body.name},{ $set: {email: req.body.email, about: req.body.about , userImage: req.file.path  }}  , { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
},
update : function(req, res){
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }
    console.log(req.file); 
    //new obj available to you due to upload.single('productImage') this middleware being executed first
    req.file.path = req.file.path.replace(/\\/g, '/') ;
    console.log("New: " +req.file ); 
    User.updateOne({name: req.body.name},{ $set: {email: req.body.email, about: req.body.about , userImage: req.file.path  }}  , { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
},
getAllDoc : async(req, res) =>{
    try {
      const result = await User.find()
      res.send(result)
    } catch (error) {
      console.log(error)
    }
  },
  updatewithoutimage : function(req, res){
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }
    const name = req.params.name;
    console.log(name);

    User.updateOne({name: name},{ $set: {email: req.body.email, about: req.body.about   }}  , { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
},

addNewMass:  (req, res) =>{
        
    if ( ((req.body.name==false))   ||   ((req.body.Age==false))   ||   ((req.body.Height==false))  ||   ((req.body.Mass==false)) ) {

            res.json({success: false, msg: 'Enter all fields'}) }
    else {
        var newMass = Mass({
            userid : req.body.userid,
            name: req.body.name,
            Age: req.body.Age,
            AgeType: req.body.AgeType,
            Height:req.body.Height,
            Mass:req.body.Mass,
        });
        newMass.save(function (err, newMass) {
            if (err) {
                res.json({success: false, msg: 'Failed to save'})
            }
            else {
                res.json({success: true, msg: 'Successfully saved'})
                
            }
        })
        
    }
},
getAllMass : async(req, res) =>{
    try {
      const result = await Mass.find()
      res.send(result)
    } catch (error) {
      console.log(error)
    }
  },
//FindOneMass
getOneMass : async (req, res) =>{
const userid = req.params.userid;
console.log(userid);
try{
    const result = await Mass.findOne({userid: req.params.userid},)
    res.send(result)
  }catch(error){
    console.log(error)
  }
},

addNewSleep: function (req, res) {
        var newSleep = Sleep({
            userid: req.body.userid,
            name: req.body.name,
            Mon: req.body.Mon,
            Tue:req.body.Tue,
            Wed:req.body.Wed,
            Thur:req.body.Thur,
            Fri:req.body.Fri,
            Sat:req.body.Sat,
            Sun:req.body.Sun,
        });
        newSleep.save(function (err, newSleep) {
            if (err) {
                res.json({success: false, msg: 'Failed to save'})
            }
            else {
                res.json({success: true, msg: 'Successfully saved'})
                
            }
        })
        
    
},
getAllSleep : async(req, res) =>{
    try {
      const result = await Sleep.find()
      res.send(result)
    } catch (error) {
      console.log(error)
    }
  },

  
getOneSleep : async (req, res) =>{
const userid = req.params.userid;
console.log(userid);
try{
const result = await Sleep.findOne({userid: req.params.userid},)
res.send(result)
}catch(error){
console.log(error)
}
},

  addNewWorkout: function (req, res) {
    var newWorkout = Workout({
        userid: req.body.userid,
        name: req.body.name,
        Mon: req.body.Mon,
        Tue:req.body.Tue,
        Wed:req.body.Wed,
        Thur:req.body.Thur,
        Fri:req.body.Fri,
        Sat:req.body.Sat,
        Sun:req.body.Sun,
    });
    newWorkout.save(function (err, newWorkout) {
        if (err) {
            res.json({success: false, msg: 'Failed to save'})
        }
        else {
            res.json({success: true, msg: 'Successfully saved'})
            
        }
    })
    

},
getAllWorkout: async(req, res) =>{
try {
  const result = await Workout.find()
  res.send(result)
} catch (error) {
  console.log(error)
}
},

  addNewWorkout: function (req, res) {
    var newWorkout = Workout({
        userid: req.body.userid,
        name: req.body.name,
        Mon: req.body.Mon,
        Tue:req.body.Tue,
        Wed:req.body.Wed,
        Thur:req.body.Thur,
        Fri:req.body.Fri,
        Sat:req.body.Sat,
        Sun:req.body.Sun,
    });
    newWorkout.save(function (err, newWorkout) {
        if (err) {
            res.json({success: false, msg: 'Failed to save'})
        }
        else {
            res.json({success: true, msg: 'Successfully saved'})
            
        }
    })
    

},

getOneWorkout : async (req, res) =>{
const userid = req.params.userid;
console.log(userid);
try{
const result = await Workout.findOne({userid: req.params.userid},)
res.send(result)
}catch(error){
console.log(error)
}
},
addNewMilk: function (req, res) {
var newMilk = Milk({
    userid: req.body.userid,
    name: req.body.name,
    Mon: req.body.Mon,
    Tue:req.body.Tue,
    Wed:req.body.Wed,
    Thur:req.body.Thur,
    Fri:req.body.Fri,
    Sat:req.body.Sat,
    Sun:req.body.Sun,
});
newMilk.save(function (err, newMilk) {
    if (err) {
        res.json({success: false, msg: 'Failed to save'})
    }
    else {
        res.json({success: true, msg: 'Successfully saved'})
        
    }
})


},
getAllMilk : async(req, res) =>{
try {
const result = await Milk.find()
res.send(result)
} catch (error) {
console.log(error)
}
},
getOneMilk : async (req, res) =>{
const userid = req.params.userid;
console.log(userid);
try{
const result = await Milk.findOne({userid: req.params.userid},)
res.send(result)
}catch(error){
console.log(error)
}
},
 getAllDocFood : async(req, res) =>{
    try {
      const result = await Food.find()
      res.send(result)
    } catch (error) {
      console.log(error)
    }
  },
  addFood : async (req, res, next) => {
        console.log(req.file); 
        //new obj available to you due to upload.single('productImage') this middleware being executed first
        req.file.path = req.file.path.replace(/\\/g, '/') ;
       const Food= new FoodModel({
          _id: new mongoose.Types.ObjectId(),
          foodname: req.body.foodname,
          time: req.body.time,
          duration:req.body.duration,
          calories:req.body.calories,
          description:req.body.description,
          foodImage: req.file.path 
        });
        Food
          .save()
          .then(result => {
            console.log(result);
            res.status(201).json({
              message: "Created product successfully",
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
  }
}

module.exports = functions