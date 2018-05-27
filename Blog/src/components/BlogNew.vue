<template>
  <div>
    <div>
      <input class="title" id="title" type="text" name="title" placeholder="标题" value="" maxlength="100" v-model="item.title">
    </div>
    <div>
      <textarea name="content" class="editor-content md-input" id="mdeditor" rows="5" style="height: 568px; resize: none;" v-model="item.content"></textarea>
    </div>
     <div>
       <button v-on:click="updateOrCreatBlog">Submit</button>
    </div>
  </div>
</template>

<script>
import BlogProxy from '../proxy/BlogProxy'
let blogProxy = new BlogProxy()

export default {
  name: 'BlogNew',
  data: function () {
    return {
      item: {
        id: '',
        title: '',
        content: '',
        author: 'author'
      }
    }
  },
  created: function () {
    var self = this
    self.fetchData(self)
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData: function (self) {
      var id = this.$route.params.id
      if (id != null) {
        blogProxy.getBlog(this.$route.params.id, function (response) {
          if (response && response.data) {
            self.item = JSON.parse(response.data)
          }
        })
      }
    },

    createBlog: function (data, handleData) {
      blogProxy.createBlog(data, handleData)
    },

    updateBlog: function (data, handleData) {
      blogProxy.updateBlog(data, handleData)
    },

    handleData: function (response) {
      var id = this.$route.params.id
      var message = ''
      if (id) {
        message = 'Fail to update blog'
      } else {
        message = 'Fail to create blog'
      }

      if (response && response.data && response.data.id) {
        var blogId = JSON.parse(response.data.id)
        if (blogId) {
          this.$router.push({name: 'BlogDetail', params: {id: blogId}})
        } else {
          alert(message)
        }
      } else {
        alert(message)
      }
    },
    updateOrCreatBlog: function () {
      var id = this.$route.params.id
      this.item.id = id
      var data = JSON.stringify(this.item)
      if (id) {
        this.updateBlog(data, this.handleData)
      } else {
        this.createBlog(data, this.handleData)
      }
    }
  }
}
</script>

<style>

</style>
