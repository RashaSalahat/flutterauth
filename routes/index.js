const express = require('express')
const actions = require('../methods/actions')  // having all our actions
const router = express.Router()
const multer = require('multer') ;
const mongoose = require ('mongoose');


// for image
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  
    }
  
  });
  
  const fileFilter = (req, file, cb) => {
    //to reject or accept an incoming file
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);//accept the file
    } else {
      cb(null, false); // ignore the file
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });
// 
router.get('/', (req, res) => {
    res.send('Hello World')
})

router.get('/dashboard', (req, res) => {
    res.send('Dashboard')
})

//@desc Adding new user
//@route POST /adduser
router.post('/adduser', actions.addNew)

//@desc Authenticate a user
//@route POST /authenticate
router.post('/authenticate', actions.authenticate)

//@desc Get info on a user
//@route GET /getinfo
router.get('/getinfo', actions.getinfo)

router.post('/updateOne/:name', upload.single('userImage'),actions.update)

router.get('/getall/:name',actions.getUsers)

router.get('/showprofiles', actions.getAllDoc)

router.post('/update/:name', actions.updateUser)


//fitness
//@desc Adding new fitess
//@route POST /adduser
router.post('/addWorkout', actions.addNewWorkout)

router.get('/showWorkout', actions.getAllWorkout)

router.get('/getWorkout/:name',actions.getOneWorkout)
//finduser
//router.get('/showusers/:id', actions.find)

//@desc Adding new user
//@route POST /addfitness
router.post('/addMass', actions.addNewMass)

router.get('/showMass', actions.getAllMass)

router.get('/getMass/:name',actions.getOneMass)

router.post('/addSleep', actions.addNewSleep)

router.get('/showSleep', actions.getAllSleep)

router.get('/getSleep/:name',actions.getOneSleep)

router.post('/addMilk', actions.addNewMilk)

router.get('/showMilk', actions.getAllMilk)

router.get('/getMilk/:name',actions.getOneMilk)

router.get('/api/food', actions.getAllDocFood)

router.post('/insertFood',upload.single('foodImage'),actions.addFood)

router.post('/updateuser/:name', actions.updateUser)

router.post('/updatee/:name', actions.updatewithoutimage)

router.post('/addapp', actions.addNewAppointment)

router.get('/app/:username', actions.getAllApp)

router.get('/getDRname/:username',actions.getDrName)


router.get('/pharm',actions.getAllDocpharm)
router.get('/clinic',actions.getAllDocclinic)
router.get('/city',actions.getAllDoccity)
router.get('/store',actions.getAllDocstore)
router.get('/game',actions.getAllDocgame)
router.get('/doctors',actions.getAllDoctors)

module.exports = router
