<template>
  <div class="center-view">
    <div class="title">标题</div>
    放地图 {{ data.d }}
  </div>
</template>

<script>
import indexjs from './index.js'
export default {
  ...indexjs
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
