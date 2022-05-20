export default {
  components: {
    BsHeader: () => import('./components/header.vue'),
    LeftView: () => import('./components/leftView/index.vue'),
    RightView: () => import('./components/rightView/index.vue'),
    BottomView: () => import('./components/bottomView/index.vue'),
    CenterView: () => import('./components/centerView/index.vue')
  },
  data() {
    return {
      styleObj: { transform: 'scale(1.0) translate(-50%, -50%)' },
      width: 1920,
      height: 1080,
      data: {}
    }
  },
  mounted() {},
  created() {
    this.changeScale()
    window.addEventListener('resize', this.changeScale)
    this.initData()
  },
  methods: {
    changeScale() {
      const body = document.documentElement
      const scale1 = body.clientWidth / this.width
      const scale2 = body.clientHeight / this.height
      const scale = scale1 < scale2 ? scale1 : scale2
      this.styleObj.transform = `scale(${scale}) translate(-50%, -50%)`
    },
    initData() {
      this.data = { 'a': 1, 'b': 2, 'c': 3, 'd': 4, 'f': 5, 'g': 6, 'h': 7 }
    }
  },
  watch: {}
}
