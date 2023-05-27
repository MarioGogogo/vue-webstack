<template>
  <div>
    <h4 class="text-gray">
      <i class="linecons-tag" :id="transName(item)"></i>{{ transName(item) }}
    </h4>
    <div class="row" v-if="item.password">
      <div class="col-sm-12 text-center">
        <img
          class="password"
          src="@/assets/images/password.png"
          width="60"
          alt=""
          @click="openDialog"
        />
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-sm-3" v-for="(web, idx) in item.web" :key="idx">
        <div
          class="xe-widget xe-conversations box2 label-info"
          title=""
          @click="openweb(web.url)"
          data-toggle="tooltip"
          data-placement="bottom"
          :data-original-title="web.url"
        >
          <div class="xe-comment-entry">
            <a class="xe-user-img">
              <img :src="web.logo" class="lozad img-circle" width="40" />
            </a>
            <div class="xe-comment">
              <a href="#" class="xe-user-name overflowClip_1">
                <strong>{{ web.title }}</strong>
              </a>
              <p class="overflowClip_2">{{ web.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
export default {
  name: 'WebItem',
  props: {
    item: Object,
    transName: Function,
  },
  methods: {
    openweb (url) {
      window.open(url, '_blank');
    },
    openDialog () {
      this.$prompt('请输入车牌号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        inputErrorMessage: '车牌号错误'
      }).then(({ value }) => {
        //请求验证密码是否正确
        this.$message({
          type: 'success',
          message: '你的车牌号是: ' + value
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    }
  },
};
</script>

<style scoped>
i {
  margin-right: 7px;
}

.password {
  text-align: center;
  cursor: pointer;
}
</style>
