<template>
  <div>
    <h1>Test</h1>
    <h1>{{item.title}}</h1>
    <span>{{item.content}}</span>
  </div>
</template>

<script>
import BlogProxy from '../proxy/BlogProxy'
let blogProxy = new BlogProxy()

export default {
  name: 'BlogDetail',
  data: function () {
    return {
      item: {
        title: '',
        content: ''
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
      blogProxy.getBlog(this.$route.params.id, function (response) {
        if (response && response.data) {
          self.item = JSON.parse(response.data)
        }
      })
    }
  }
}
</script>

<style>

</style>
