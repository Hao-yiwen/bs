<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="~/assets/images/my-logo.png" alt="" />
        <span>优乐购电商后台管理系统</span>
        <span id="version">Version：1.2.0</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>

    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏菜单 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 切换按钮 -->
        <div class="toggle-button" @click="toggleCollapse()">
          {{ isCollapse ? "&rArr;" : "&lArr;" }}
        </div>

        <el-menu
          :collapse="isCollapse"
          :collapse-transition="false"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :router="true"
          :default-active="activePath"
          :unique-opened="true"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/'+subItem.path) ">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 匹配到的子路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      // 左侧菜单数据
      menuList: [],
      //
      iconsObj: {
        125: "iconfont icon-user",
        103: "iconfont icon-tijikongjian",
        101: "iconfont icon-shangpin",
        102: "iconfont icon-danju",
        145: "iconfont icon-baobiao",
      },
      //控制左侧边栏的切换状态
      isCollapse: false,
      // 被激活的链接地址
      activePath:null
    };
  },
  created() {
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    // 退出
    logout() {
      window.sessionStorage.clear();
      this.$message.success({
        message: "退出成功",
        duration: 1000,
      });
      this.$router.push("/login");
    },
    // 获取左侧菜单列表
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");

      // 获取失败
      if (res.meta.status !== 200) {
        return this.$message({
          message: res.meta.msg,
          duration: 1000,
        });
      }

      this.menuList = res.data;
    },
    // 点击按钮切换菜单的折叠与咱开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 保存链接的激活状态
    saveNavState(activePath){
      window.sessionStorage.setItem('activePath',activePath)
      // 点击过后就赋值，不然只有组件被创建的时候状态才会更改
      this.activePath = activePath
    }
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-size: 22px;
    font-weight: bold;
    #version {
      font-weight: normal;
      font-size: 16px;
      margin-left: 20px;
    }
    img {
      width: 58px;
      height: 58px;
      border-radius: 50%;
      margin-right: 20px;
    }
  }
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}
.el-menu {
  border-right: none;
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #4a5064;
  color: white;
  font-size: 22px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.1em;
  cursor: pointer;
  user-select: none;
}
</style>