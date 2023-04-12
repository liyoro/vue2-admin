import { mapGetters } from 'vuex'
// import axios from 'axios'
// import { findElem } from '@/utils/index'

// const getMapJson = (url) => {
//   return axios.get(`data/map/${url}.json`)
// }

export default {
  name: 'CenterView',
  components: {
    'g-map-view': () => import('@/components/chart/map/g-map-view.vue')
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      mapOpt: {},
      areaCode: 4400,
      mapName: '广东省',
      mapData: []
    }
  },
  computed: {
    ...mapGetters(['curLevel', 'levelData'])
  },
  mounted() {},
  created() {
    this.initData()
  },
  updated() {},
  methods: {
    initData() {},
    // 中间 url
    initMap() {}
  },
  watch: {}
}
