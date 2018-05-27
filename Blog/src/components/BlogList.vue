<template>
   <ul>
        <li v-for="item in items" :key="item.id">
                <span class="time">
                    <span class="underline" t="5" times=""> {{convertTime(item.createTime)}} </span>
                </span>
               <span class="title">
                   <router-link :to="{ name: 'BlogDetail', params: { id: item.id } }" target="_blank">{{item.title}}</router-link>
               </span>
                <span class="content"> {{item.content}} </span>
        </li>
    </ul>
</template>

<script>
import BlogProxy from '../proxy/BlogProxy'
import {convertToLocalTime} from '../util/util'

let blogProxy = new BlogProxy()

export default {
  name: 'BlogList',
  data: function () {
    return {
      items: []
    }
  },
  created: function () {
    var self = this
    blogProxy.getBlogs(function (response) {
      if (response && response.data) {
        self.items = JSON.parse(response.data)
      }
    })
  },
  methods: {
    convertTime: function (time) {
      return convertToLocalTime(time, 'YYYY-MM-DD hh:mm:ss')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li {
  margin: 20px 0;
}
.time {
  font-size: 10.5pt;
  color: #008000;
  font-weight: bold;
  font-family: Courier New;
}
.underline {
  border-bottom: 1px dashed rgb(204, 204, 204);
  position: relative;
}
.title {
  font-weight: bold;
  margin: 2px 10px 5px 0;
  display: block;
}
.content {
  color: #666; font-size: 9pt;
}
</style>
