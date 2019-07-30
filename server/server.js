const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./database/database');
const bcrypt = require('bcryptjs');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods', 'POST, GET, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
getUsers = function (req, res) {
    let query = "SELECT * FROM users";
    db.query(query).spread(function (result, metadata) {
        if(result.length > 0){
            res.json(result)
        }else{
            res.status(400).send(" 400 error get users");
        }
    }).catch(function (err) {
        res.status(500).send(" 500 error get users");
    })
};
//get projects
getProjects = function (req, res) {
    let query = "SELECT * FROM projects";
    db.query(query).spread(function (result, metadata) {
        if (result.length <= 0) {
            res.status(400).send(" 400 error get projects");
        } else {
            res.status(200).send(result);
        }
    }).catch(function (err) {
        res.status(500).send(" 500 error get projects");
    })
};
//delete project
deleteProject = function (req, res) {
    const id = req.params.id;
    console.log('fucking id is' + id);
    let query = `DELETE FROM projects WHERE id = ${id}`;
    db.query(query).spread(function (err, result) {
        res.status(200).send("Project was deleted");
    }).catch(function (err) {
        res.status(500).send(" 500 delete project");
    })
};
//create project
createProject = function (req, res) {
    let query = "INSERT INTO public.projects(name, description , owner) VALUES ('" + req.body.name + "', '" + req.body.description + "', '" + req.body.owner + "')";
    db.query(query).spread(function (result, metadata) {
        res.status(200).send("successfully project create");
    }).catch(function (err) {
        res.status(500).send(" 505 error create project");
    })
};
createUser = function (req, res) {
    let query = "INSERT INTO public.users(name, password , email) VALUES ('" + req.body.name + "', '" + req.body.password + "', '" + req.body.email + "')";
    db.query(query).spread(function (result, metadata) {
        res.status(200).send("successfully user create");
    }).catch(function (err) {
        res.status(500).send(" 505 error create user");
    })
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//controllers
//routes
app.get('/users', getUsers);
app.get('/users/create', createUser);
app.post('/projects/create', createProject);
app.get('/projects', getProjects);
app.delete('/projects/delete/:id', deleteProject);
db.sync().then(function () {
    app.listen(3000, function () {
        console.log('All is ok');
    })
});
// Force Initialization of the models and wipe all data ///
