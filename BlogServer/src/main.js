var express = require('express');
var cookieParser = require('cookie-parser');
var util = require('util');
var MySqlAdapter = require('./dal/my_sql_adapter');
var Blog = require('./entity/blog');
var bodyParser = require('body-parser')

var app = express();
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'));

app.get('/listBlogs', function (req, res) {
    var apapter = new MySqlAdapter();
    apapter.listBlogs(function (error, blogs) {
        if (error) {
            res.json(500, "Failed to list blogs.");
        }
        else {
            var result = JSON.stringify(blogs);
            res.json(result);
        }         
    });
})

app.post('/addBlog', function (req, res) {
    console.log("主页 POST 请求");
    if (req && req.body && req.body.params && req.body.params.data) {
        var apapter = new MySqlAdapter();
        var blog = JSON.parse(req.body.params.data);
        apapter.createBlog(blog, function (error, id) {
            if (error) {
                res.json(500, "Failed to create blog.");
            }
            else {
                res.json({'id': id});
            }         
        });
    } else {
        res.json(500, "Failed to create blog.");
    }
})

app.put('/updateBlog', function (req, res) {
    if (req && req.body && req.body.params && req.body.params.data) {
        var apapter = new MySqlAdapter();
        var blog = JSON.parse(req.body.params.data);
        apapter.updateBlogs(blog, function (error, id) {
            if (error) {
                res.json(500, "Failed to update blog.");
            }
            else {
                res.json({'id': blog.id});
            }         
        });
    } else {
        res.json(500, "Failed to update blog.");
    }
})

app.delete('/delBlog', function (req, res) {
    var id = req.query.id;
    var apapter = new MySqlAdapter();
    apapter.deleteBlog(id, function (error) {
        if (error) {
            res.json(500, "Failed to delete blog.");
        }
        else {
            res.send(200);
        }         
    });
})

app.get('/getBlog', function (req, res) {
    var id = req.query.id;
    var apapter = new MySqlAdapter();
    apapter.getBlog(id, function (error, blog) {
        if (error) {
            res.json(500, "Failed to get blog.");
        }
        else {
            if (blog) {
                res.json(JSON.stringify(blog));
            }
            else {
                res.send(404);
            }
        }         
    });
})


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例， 访问地址为 http://%s:%s", host, port)
  
})

