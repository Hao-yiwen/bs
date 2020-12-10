<template>
  <div class="welcome">
    <div id="github">
      <github-corner></github-corner>
    </div>
    <!-- 四个卡片 -->
    <el-row :gutter="12">
      <el-col :span="6">
        <el-card shadow="always">
          <div class="left">
            <span class="iconfotn icon-showpassword"></span>
          </div>
          <div class="right">
            <div class="message">总访问量</div>
            <div class="data">251562次</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div class="left">
            <span class="iconfotn icon-user"></span>
          </div>
          <div class="right">
            <div class="message">今日访问量</div>
            <div class="data">1532次</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div class="left">
            <span class="icon-user"></span>
          </div>
          <div class="right">
            <div class="message">总成交量</div>
            <div class="data">1532￥</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div class="left">
            <span class="icon-user"></span>
          </div>
          <div class="right">
            <div class="message">今日成交量</div>
            <div class="data">1532￥</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 折线图 -->
    <el-card id="line">
      <div ref="lineRef" style="height: 400px"></div>
    </el-card>
  </div>
</template>

<script>
import GithubCorner from 'components/common/GithubCorner'
require('assets/lib/theme/macarons') // echarts theme

export default {
  name: 'Welcome',
  data() {
    return {
      // 折线图实例
      chartInstance: null,
      // 折线图数据
      allData: null,
    }
  },
  components: {
    GithubCorner,
  },
  mounted() {
    this.$nextTick(() => {
      // 初始化图表
      this.initChart()
      // 获取数据
      this.getData()
    })
  },
  methods: {
    // 初始化图标的方法
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.lineRef, 'macarons')
      var xDataArr = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      var yDataArr = [3000, 2800, 900, 1000, 800, 700, 1400, 1300, 900, 1000, 800, 600]
      var y2 = [1200, 1400, 1800, 2500, 800, 700, 900, 1000, 800, 600, 2000, 2400]

      // 初始化图表的配置项
      const initOption = {
        title:{
          text:'今日访问量',
          textStyle:{
            fontSize:'28'
          }
        },
        legend: {
          left: 'center',
          top: '5%',
          data: ['真实访问量', '预估访问量'],
        },
        grid: {
          top: '20%',
          left: '0%',
          right: '2%',
          bottom: '0%',
          // 把x轴和y轴纳入 grid
          containLabel: true,
        },
        // 工具提示
        tooltip: {
          // 当鼠标移入坐标轴的显示提示
          trigger: 'axis',
          // 鼠标放上去十字交叉指示器
          axisPointer: {
            type: 'cross',
          },
        },
        xAxis: {
          type: 'category',
          data: xDataArr,
          // 紧挨边缘
          boundaryGap: false,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '真实访问量',
            smooth: true,
            type: 'line',
            animationDuration: 2800,
            animationEasing: 'quadraticOut',
            data: y2,
            itemStyle: {
              normal: {
                color: '#3888fa',
                lineStyle: {
                  color: '#3888fa',
                  width: 2,
                },
                areaStyle: {
                  color: '#f3f8ff',
                },
              },
            },
          },
          {
            name: '预估访问量',
            smooth: true,
            type: 'line',
            animationDuration: 2800,
            animationEasing: 'cubicInOut',
            data: yDataArr,
            itemStyle: {
              normal: {
                color: '#FF005A',
                lineStyle: {
                  color: '#FF005A',
                  width: 2,
                },
              },
            },
          },
        ],
      }
      this.chartInstance.setOption(initOption)
    },
    // 发送请求获取折线图需要的数据
    async getData() {
      // const { data: res } = await this.$httpInstance.get('/home/line')
      // this.allData = res
      // this.updateChart()
    },
    // 更新图表配置项
    updateChart() {
      const dataOption = {}
      this.chartInstance.setOpiton(dataOption)
    },
  },
}
</script>

<style lang="less" scope>
#github {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
}
.welcome {
  margin-top: 10px;
  padding: 0 10px;

  .el-row {
    .el-card__body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      .iconfotn {
        font-size: 48px;
      }
      div.right {
        height: 68px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
      }
    }
  }
  #line {
    margin-top: 15px;
  }
}
</style>