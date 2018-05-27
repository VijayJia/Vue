import axios from 'axios'

export default class BlogProxy {
  getBlogs (handleData) {
    axios.get('/listBlogs')
      .then(function (response) {
        handleData(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  getBlog (blogId, handleData) {
    axios.get('/getBlog', {
      params: {
        id: blogId
      }
    })
      .then(function (response) {
        handleData(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  createBlog (blog, handleData) {
    axios.post('/addBlog', {
      params: {
        data: blog
      }
    })
      .then(function (response) {
        handleData(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  updateBlog (blog, handleData) {
    axios.put('/updateBlog', {
      params: {
        data: blog
      }
    })
      .then(function (response) {
        handleData(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
