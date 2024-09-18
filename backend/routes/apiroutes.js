const routes = require("express").Router()
const jobController = require("../server/jobController")
const multer = require("multer")


const userstorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/users')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    var newname =  file.fieldname + '-' + uniqueSuffix + file.originalname
    req.body['image'] = newname
      cb(null, newname)
    }
  })
  
const userupload = multer({ storage: userstorage })


routes.post("/job/add",userupload.single("image"),jobController.add)
routes.post("/job/getall",jobController.getall)
routes.post("/job/getsingle",jobController.getsingle)
routes.post("/job/update",userupload.single("image"),jobController.update)
routes.post("/job/delete",jobController.deleteJob)


module.exports = routes