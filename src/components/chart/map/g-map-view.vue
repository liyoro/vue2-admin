<!-- create by liyoro -->
<!-- echarts地图控件
    使用说明
    1、
    import GMapView from '@/components/chart/map/g-map-view.vue'
    "g-map-view": () => import("@/components/chart/map/g-map-view.vue"),
    2、
    components: {
        GMapView
    }
    3、
    <g-map-view :data="testData" class="g-map-chart-view" />
 -->
<template>
  <div :id="generateId" :style="getStyleObj" class="g-map-chart-view"></div>
</template>
<script>
import * as echarts from 'echarts'
import axios from 'axios'
import { v4 as uuidV4 } from 'uuid'

const COMPONENT_NAME = 'g-map-view'

const getMapJson = url => {
  return axios.get(`data/map/${url}.json`)
}

export default {
  name: COMPONENT_NAME,
  props: {
    data: {
      type: Array,
      default: () => []
    },
    width: {
      type: Number,
      default: 650
    },
    height: {
      type: Number,
      default: 770
    }
  },
  computed: {
    generateId() {
      return `${COMPONENT_NAME}-${uuidV4()}`
    },
    getStyleObj() {
      let { width, height } = this
      if (typeof width === 'number') width = `${width}px`
      if (typeof height === 'number') height = `${height}px`
      return { width, height }
    }
  },
  watch: {
    data: {
      immediate: false,
      handler(newVal) {
        if (newVal) {
          this.render()
        }
      }
    },
    width: {
      immediate: false,
      handler(newVal) {
        if (newVal) {
          this.render()
        }
      }
    },
    height: {
      immediate: false,
      handler(newVal) {
        if (newVal) {
          this.render()
        }
      }
    }
  },
  data() {
    return {
      chart: null,
      echartMapData: {
        features: []
      },
      areaCode: '4400'
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.clear()
    this.chart.dispose()
    this.chart = null
  },
  mounted() {
    this.render()
  },
  methods: {
    render() {
      if (this.chart != null) {
        this.chart.clear()
      }
      this.chart = echarts.init(document.getElementById(this.generateId), 'echarts-theme-white', {
        renderer: 'svg'
      })

      let url = ''
      if (this.areaCode === '4400') {
        url = `${this.areaCode}/index`
      } else {
        url = `4400/${this.areaCode}`
      }
      getMapJson(url)
        .then(res => {
          this.echartMapData = res.data
          echarts.registerMap(this.areaCode, this.echartMapData)

          const mapData = []
          const data = this.echartMapData
          // let mapIcon = this.mapIcon
          // let hotIcon = this.hotIcon
          // let mapArr = []
          // this.homeMapData.forEach((itemOpt) => {
          //   if (!itemOpt.longitude) return
          //   mapArr.push({
          //     id: itemOpt.id,
          //     schoolId: itemOpt.schoolId,
          //     areaCode: itemOpt.areaCode,
          //     name: itemOpt.diningRoomName,
          //     symbol: 'image://' + mapIcon,
          //     symbolSize: [48, 68],
          //     symbolOffset: [0, -45],
          //     value: [itemOpt.longitude, itemOpt.latitude]
          //   })
          // })

          for (let i = 0; i < data.features.length; i++) {
            const obj = {
              name: data.features[i].properties.name,
              adcode: data.features[i].properties.adcode,
              value: 100 * i,
              longitude: data.features[i].properties.center[0],
              latitude: data.features[i].properties.center[1],
              itemStyle: {
                // normal: {
                //   borderColor: 'red', // #30dfff
                //   borderWidth: 20,
                //   areaColor: 'red'
                // },
                // emphasis: {
                //   areaColor: 'rgba(17, 155, 247, 0.9)',
                //   borderWidth: 10,
                //   borderColor: 'red' // #30dfff
                // }
              },
              symbolSize: [64, 77]
            }
            mapData.push(obj)
          }
          const option = {
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              borderColor: 'rgba(0, 0, 0, 0.9)',
              padding: 20,
              textStyle: {
                color: '#fff',
                fontSize: 18
              },
              formatter: params => {
                return params.name
              }
            },
            geo: [
              {
                map: this.areaCode,
                silent: true,
                zoom: 1,
                layoutCenter: ['50%', '50%'],
                roam: false,
                z: 1,
                label: {
                  show: false
                },
                itemStyle: {
                  shadowColor: 'rgba(4, 68, 167, 0.9)',
                  shadowOffsetX: 0,
                  shadowOffsetY: 20,
                  // shadowBlur: 120,
                  areaColor: 'rgba(4, 68, 167, 1.0)'
                },
                emphasis: {
                  label: {
                    show: false
                  },
                  itemStyle: {
                    borderWidth: 0
                  }
                }
              }
              // {
              //   map: this.areaCode,
              //   silent: true,
              //   zoom: 1,
              //   layoutCenter: ['50%', '50%'],
              //   roam: false,
              //   z: 0,
              //   label: {
              //     show: false
              //   },
              //   itemStyle: {
              //     shadowColor: 'rgba(4, 68, 167, 0.9)',
              //     shadowOffsetX: 0,
              //     shadowOffsetY: 30,
              //     // shadowBlur: 120,
              //     areaColor: 'rgba(9, 45, 130, 1.0)'
              //   },
              //   emphasis: {
              //     label: {
              //       show: false
              //     },
              //     itemStyle: {
              //       borderWidth: 0
              //     }
              //   }
              // }
            ],
            series: [
              {
                // name: '地图',
                type: 'map',
                zoom: 1,
                // geoIndex: 1,
                map: this.areaCode,
                data: mapData,
                // selectedMode: 'multiple',
                // z: 3,
                // zlevel: 0,
                // 默认字
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff',
                    fontSize: 18
                  }
                },
                itemStyle: {
                  borderWidth: 1,
                  borderColor: '#30dfff',
                  areaColor: {
                    type: 'linear',
                    x: 0,
                    y: 300,
                    x2: 0,
                    y2: 0,
                    colorStops: [
                      {
                        offset: 0,
                        color: 'rgba(5, 172, 255, 1.0)' // 0% 处的颜色
                      },
                      {
                        offset: 0.5,
                        color: 'rgba(4, 122, 234, 1.0)' // 50% 处的颜色
                      },
                      {
                        offset: 1,
                        color: 'rgba(1, 97, 226, 1.0)' // 50% 处的颜色
                      }
                    ],
                    global: true // 缺省为 false
                  }
                },
                // hover字
                emphasis: {
                  label: {
                    show: true,
                    textStyle: {
                      color: '#fff',
                      fontSize: 20
                    }
                  },
                  itemStyle: {
                    areaColor: {
                      type: 'linear',
                      x: 0,
                      y: 300,
                      x2: 0,
                      y2: 0,
                      colorStops: [
                        {
                          offset: 0,
                          color: 'rgba(47, 194, 255, 1.0)' // 0% 处的颜色
                        },
                        {
                          offset: 0.5,
                          color: 'rgba(12, 153, 247, 1.0)' // 50% 处的颜色
                        },
                        {
                          offset: 1,
                          color: 'rgba(6, 149, 247, 1.0)' // 50% 处的颜色
                        }
                      ],
                      global: true // 缺省为 false
                    },
                    borderWidth: 0.1
                  }
                }
              }
            ]
          }
          this.chart.setOption(option, true)

          this.chart.on('click', param => {
            const adcode = param?.data?.adcode + ''
            console.log(2222222, param, adcode)

            if (adcode) {
              this.areaCode = adcode
              this.render()
            }
          })

          // this.chart.on('mouseover', param => {
          //   console.log(param)
          // it.myChart.dispatchAction({
          //   type: 'downplay',
          //   seriesIndex: 0 // 地图
          // })
          // it.myChart.dispatchAction({
          //   type: 'highlight',
          //   seriesIndex: 1, // 地图
          //   dataIndex: regionIndex
          // })
          // })
        })
        .catch(err => {
          console.log('==> init mapJson ERR...', err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.g-map-chart-view {
}
</style>
