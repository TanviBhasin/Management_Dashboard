const Job = require('./jobModel')

add = (req,res)=>{

    var validationerrors = []

    if (!req.body.name)
        validationerrors.push("client name is required")
    if (!req.body.phone)
        validationerrors.push("phone no. is required")
    if (!req.body.date)
        validationerrors.push("Received date is required")
    if (!req.body.inventory)
        validationerrors.push("inventory received is required")
    if (!req.body.image)
        validationerrors.push("inventory/image/document/video is required")
    if (!req.body.report)
        validationerrors.push("Reported issue is required")
    if (!req.body.notes)
        validationerrors.push("client note is required")
    if (!req.body.technician)
        validationerrors.push("Assigned technician is required")
    if (!req.body.amount)
        validationerrors.push("Estimated amount is required")
    if (!req.body.deadline)
        validationerrors.push("Deadline is required")
    if (!req.body.status)
        validationerrors.push("Status is required")


    if (validationerrors.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "Validation error",
            errors: validationerrors
        })
    }
    else {
        //duplicate
        Job.findOne({ name: req.body.name })
            .then(content => {
                if (!content) {
                    let jobObj = new Job()
                    jobObj.name = req.body.name
                    jobObj.phone = req.body.phone
                    jobObj.date = req.body.date
                    jobObj.inventory = req.body.inventory
                    jobObj.image = "users/"+req.body.image
                    jobObj.report = req.body.report
                    jobObj.notes = req.body.notes
                    jobObj.technician = req.body.technician
                    jobObj.amount = req.body.amount
                    jobObj.deadline = req.body.deadline
                    jobObj.status = req.body.status
                    jobObj.save()
                        .then(jobData => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Record Inserted",
                                data: jobData
                            })
                        })
                        .catch(err => {
                            res.json({
                                status: 500,
                                success: false,
                                message: "Internal Server Error",
                                errors: err.message
                            })
                        })
                }
                else {
                    res.json({
                        status: 422,
                        success: false,
                        message: "Record already exists",
                        data: content
                    })
                }

            })
            .catch(err => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal Server Error",
                    errors: err.message
                })
            })

    }

}

getall = async (req,res)=>{

    var totalcount = await Job.find(req.body).countDocuments().exec()
 
    Job.find(req.body)
    .then(jobData=>{
        res.json({
            status : 200,
            success:true,
            message : "Data loaded",
            total : totalcount,
            data : jobData
        })
    })
    .catch(err=>{
        res.json({
            status:500,
            success:false,
            message : "Internal Server Error",
            errors :err.message
        })
    })
}

getsingle = (req,res)=>{
    validationerrors = []

    if(!req.body._id)
        validationerrors.push("_id is required")

    if(validationerrors.length>0){
        res.json({
            status : 422,
            success:false,
            message :"Validation error",
            errors : validationerrors
        })
    }else{
        //existance of record
        Job.findOne({_id:req.body._id})
        .then(jobData=>{
            if(!jobData)
            {
                res.json({
                    status:404,
                    success:false,
                    message : "Record not found"
                })
            }
            else{
                res.json({
                    status : 200,
                    success:true,
                    message : "Data loaded",
                    data : jobData
                })
            }
        })
        .catch(err=>{
            res.json({
                status:500,
                success:false,
                message : "Internal Server Error",
                errors : err.message
            })
        })
    }
}

update = (req,res)=>{
    validationerrors = []

    if(!req.body._id)
        validationerrors.push("_id is required")

    if(validationerrors.length>0)
    {
        res.json({
            status : 422,
            success:false,
            message : "Validation error",
            errors : validationerrors
        })
    }
    else{
        //existance of record w.r.t ID
        Job.findOne({_id:req.body._id})
        .then(jobData=>{
            if(!jobData)
            {
                res.json({
                    status : 404,
                    success:false,
                    message : "Record not found"
                })
            }
            else{
                //Update
                if(req.body.name)
                    jobData.name = req.body.name
                if(req.body.phone)
                    jobData.phone = req.body.phone
                if(req.body.date)
                    jobData.date = req.body.date
                if(req.body.inventory)
                    jobData.inventory = req.body.inventory
                if(req.body.report)
                    jobData.report = req.body.report
                if(req.body.notes)
                    jobData.notes = req.body.notes
                if(req.body.technician)
                    jobData.technician = req.body.technician
                if(req.body.amount)
                    jobData.amount = req.body.amount
                if(req.body.deadline)
                    jobData.deadline = req.body.deadline
                if(req.body.status)
                    jobData.status = req.body.status
                if (req.file) {
                    //oldpath
                    oldpath = "public/" + jobData.image
                    console.log(oldpath)

                    if (fs.existsSync(oldpath)) {
                        console.log(oldpath)
                        fs.unlink(oldpath, (err) => {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                jobData.image = "users/" + req.file.filename
                                saveAndRespond();
                            }
                        })
                    }
                    else{
                        console.log("path not exists")
                    }
                }else {
                        // no new image uploaded save without affecting
                        saveAndRespond();
                    }

                    
        function saveAndRespond() {        
            jobData.save()
            .then(saveRes=>{
                res.json({
                    status : 200,
                    success:true,
                    message : "Record Updated",
                    data : saveRes
                })
            })
            .catch(err=>{
                res.json({
                    status:500,
                    success:false,
                    message : "Internal Server error",
                    errors : err.message
                })
            })
        }
    }
})
        .catch(err=>{
            res.json({
                status:500,
                success:false,
                message : "Internal Server Error",
                errors : err.message
            })
        })
    }
}

deleteJob = (req, res) => {
    // Validation: Ensure that the _id is provided
    let validationerrors = [];

    if (!req.body._id) {
        validationerrors.push("_id is required");
    }

    if (validationerrors.length > 0) {
        return res.status(422).json({
            status: 422,
            success: false,
            message: "Validation error",
            errors: validationerrors
        });
    } else {
        // Find and delete the job using _id
        Job.findOneAndDelete({ _id: req.body._id })
            .then(deletedJob => {
                if (!deletedJob) {
                    return res.status(404).json({
                        status: 404,
                        success: false,
                        message: "Record Not found"
                    });
                } else {
                    return res.status(200).json({
                        status: 200,
                        success: true,
                        message: "Record deleted successfully",
                        data: deletedJob
                    });
                }
            })
            .catch(err => {
                return res.status(500).json({
                    status: 500,
                    success: false,
                    message: "Internal Server Error",
                    errors: err.message
                });
            });
    }
}



module.exports = {
    add,
    getall,
    getsingle,
    update,
    deleteJob
}