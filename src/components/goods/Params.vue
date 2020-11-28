<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品参数</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-alert title="注意: 只允许为第三级分类设置相关参数!" type="info" effect="dark" show-icon :closable="false">
      </el-alert>

      <!-- 选择商品分类 -->
      <el-row class="mt-5">
        <el-col>
          <span>选择商品分类：</span>
          <!-- 选择商品分类的级联选择框 -->
          <!-- options 指定数据源 -->
          <!-- props 用来配置级联选择框 -->
          <el-cascader v-model="selectedCateKeys" :options="cateList" :props="cateProps" @change="handleChange"></el-cascader>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Params",
  data() {
    return {
      // 商品分类列表
      cateList:[],
      // 级联选择框配置对象
      cateProps:{ 
        expandTrigger: 'hover' ,
        value:'cat_id',//指定真实选中的值
        label:'cat_name',//指定看见的值
        children:'children'//父子节点的嵌套属性
      },
      // 级联选择框双向绑定到的数组
      selectedCateKeys:[]
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    // 获取所有的商品分类列表
    async getCateList() {
      const { data: res } = await this.$http.get("categories");
      if (res.meta.status !== 200) {
        return this.$message.error({
          message: res.meta.msg,
          druation: 1000,
        });
      }
      this.cateList = res.data
      console.log(this.cateList)
    },
    // 级联选择框选中项变化会触发该函数
    handleChange(){
      // 选中的不是三级分类
      if(this.selectedCateKeys.length !== 3){
        this.$message.warning('只能选中三级分类！')
        return this.selectedCateKeys = []
      }
    }
  },
};
</script>

<style lang="less" scoped>
.mt-5 {
  margin: 15px 0;
}
</style>