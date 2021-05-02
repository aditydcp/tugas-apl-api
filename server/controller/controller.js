var Userdb = require('../model/model');

// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Data cannot be empty!"});
        return;
    }

    // new user
    const user = new Userdb({
        name : req.body.name,
        posisi : req.body.posisi
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/add-user');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Error occurred when trying to insert the data!"
            });
        });

}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : `User Not Found: user with id ${id} don't exist`})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error: Cannot retrieve user data with id " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error occurred while retriving user information" })
            })
    }

    
}

// Update a new idetified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data cannot be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `User Not Found: user with id ${id} don't exist`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error: Cannot update user information"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `User Not Found: user with id ${id} don't exist`})
            }else{
                res.send({
                    message : "User data deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Error: Could not delete user with id " + id
            });
        });
}