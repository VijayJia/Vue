var mysql = require('mysql');
var Blog = require('../entity/blog')

function MySqlAdapter() {

    var connection = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : 'root',
        database : 'blog'
    });

    this.getBlog = function (id, processResult) {
        var querySql = 'SELECT * FROM blog WHERE id=?';
        var sqlParams = [id];
        connection.connect();
        connection.query(querySql, sqlParams, function (error, results, fields) {
            if (error) {
                processResult(error, null);
            }
            else {
                var blog;
                if (results.length > 0)
                {
                    var result = results[0];
                    if (result) {
                        blog = new Blog();
                        blog.id = result.id;
                        blog.title = result.title;
                        blog.author = result.author;
                        blog.content = result.content;
                        blog.createTime = result.create_time;
                        blog.updateTime = result.update_time;
                    }
                }
               
                processResult(null, blog);
            }
            
        })
    }

    this.listBlogs = function (processResult) {
        var querySql = 'SELECT * FROM blog';
        connection.connect();
        connection.query(querySql, function (error, results, fields) {
            if (error) {
                processResult(error, null);
            }
            else {
                var blogs = new Array();
                results.forEach(element => {
                    var blog = new Blog();
                    blog.id = element.id;
                    blog.title = element.title;
                    blog.author = element.author;
                    blog.content = element.content;
                    blog.createTime = element.create_time;
                    blog.updateTime = element.update_time;
                    blogs.push(blog);
                });
                processResult(null, blogs);
            }
            
        })
    }

    this.updateBlogs = function (blog, processResult) {
        var querySql = 'UPDATE blog SET title =?, content = ?, update_time = ? WHERE id=?';
        connection.connect();
        var sqlParams = [blog.title, blog.content, new Date(), blog.id];
        connection.query(querySql, sqlParams, function (error, results, fields) {
            if (error) {
                processResult(error);
            } else {
                processResult(null);
            }
        })
    }

    this.deleteBlog = function (id, processResult) {
        var querySql = 'UPDATE blog SET is_active = false WHERE id=?';
        connection.connect();
        var sqlParams = [id];
        connection.query(querySql, sqlParams, function (error, results, fields) {
            if (error) {
                processResult(error);
            } else {
                processResult(null);
            }
        })
    }

    this.createBlog = function (blog, processResult) {
        var querySql = 'CALL createBlog(?, ?, ?, ?);';
        connection.connect();

        var now = new Date();
        var sqlParams = [blog.title, blog.author, blog.content, now];
        connection.query(querySql, sqlParams, function (error, results, fields) {
            if (error) {
                processResult(error, 0);
            }
            else {
                var result = results[0];
                var id = result[0].id;
                processResult(null, id);
            }
        })
    }
}

module.exports = MySqlAdapter;


