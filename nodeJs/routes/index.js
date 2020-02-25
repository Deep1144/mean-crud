var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test");
var Schema = mongoose.Schema;

var UserDataSchema = new Schema({
  name: { type: String },
  position: { type: String }
});
var UserData = mongoose.model("testing", UserDataSchema);

/* GET home page. */
router.get("/", function(req, res) {
  UserData.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Error : " + JSON.stringify(err));
    }
  });
});

router.get("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  UserData.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Error in Retriving Employee :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

// router.put("/:id", (req, res) => {
//   var emp = {
//     name: req.body.name,
//     position: req.body.position
//   };
//   UserData.findByIdAndUpdate(
//     req.params.id,
//     { $set: emp },
//     { new: true },
//     (err, doc) => {
//       if (!err) {
//         res.send(doc);
//         alert(doc);
//       } else {
//         alert(err);
//         console.log(
//           "Error in Employee Update :" + JSON.stringify(err, undefined, 2)
//         );
//       }
//     }
//   );
// });


router.put('/:id', (req, res) => {
  var emp = {
      name: req.body.name,
      position: req.body.position,
  };
  UserData.findByIdAndUpdate(req.params.id, {$set: emp }, { new: true }, (err, doc) => {
        console.log("jello");
        res.send(doc); 
      // else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
  });



  // console.log("---------------yaha aa gaya-----------------");
  //   UserData.findByIdAndUpdate(req.params.id,{$set:emp},{new:false}).then((docs)=>{
  //     alert("In here ");
  //     console.log("---------------IN hERE-----------------");
  //      if(docs) {
  //       //  resolve({success:true,data:docs});
  //       alert("sucess");
  //      } else {
  //       //  reject({success:false,data:"no such user exist"});
  //       alert("not");
  //      }
  //   }).catch((err)=>{
  //       reject(err);
  //   })
    

  

});

router.post("/", (req, res) => {
  var emp = new UserData({
    name: req.body.name,
    position: req.body.position
  });

  emp.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("Error : " + JSON.stringify(err));
    }
  });
});

router.delete("/:id", (req, res) => {
  // console.log(req.params.id);
  // if (ObjectId.isValid(req.params.id))
  // {
  //   console.log('Deep is C');
  // }
  // return res.status(400).send(`No record with given id : ${req.params.id}`);

  UserData.findByIdAndRemove(req.params.id, (err, doc) => {
    console.log("Hello DEEEEEEP Data Deleted");
    if (!err) {
      res.send(doc);
      // res.redirect('/');
    }
    // else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
  });
});
module.exports = router;
