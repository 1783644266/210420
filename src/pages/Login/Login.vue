<template>
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">硅谷外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
            <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form @submit.prevent="login">
            <div :class="{on:loginWay}">
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                <button :disabled='!testPhone' class="get_verification"
                 :class="{true_phone:testPhone}" @click.prevent="getCode">{{computedTime?`已发送(${computedTime}s)`:'发送验证码'}}</button>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on:!loginWay}">
              <section>
                <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                </section>
                <section class="login_verification">
                  <input type="password" maxlength="8" placeholder="密码" v-if="noShow" v-model="pwd">
                  <input type="text" maxlength="8" placeholder="密码" v-else v-model="pwd">
                  <div class="switch_button " :class="noShow?'off':'on'" @click="noShow=!noShow">
                    <div class="switch_circle" :class="{right:!noShow}"></div>
                    <span class="switch_text" >{{noShow?'...':'abc'}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                  <img class="get_verification" src="http://localhost:4000/captcha"
                   alt="captcha" @click="getCaptcha" ref="captcha">
                </section>
              </section>
            </div>
            <button class="login_submit">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back" @click="$router.back()">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
      <AlertTip v-show="alertShow" :alertText='alertText' @closeTip='closeTip'></AlertTip>
    </section>
</template>

<script >
import {reqPwdLogin, reqSendCode, reqSmsLogin} from '../../api'
import AlertTip from '../../components/AlertTip/AlertTip.vue'
export default {
  data() {
    return {
      loginWay:true, //true为短信登陆，false为密码
      computedTime:0 ,//验证码时间
      phone:'', //手机
      pwd:'', //密码
      noShow:true,
      code:'',//短信验证码
      name:'',//用户名
      captcha:'',//字母验证码
      alertShow:false, //提示框是否显示
      alertText:'' //提示框显示文字
    }
  },
  computed:{
    testPhone(){
      return /^1\d{10}$/.test(this.phone)
    }
  },
  methods:{
    closeTip(){
      this.alertShow = false
      this.alertText = ''
    },
    //获取手机验证码
   async getCode(){    
      if(!this.computedTime){
         this.computedTime = 30
         this.setIntervalId = setInterval(() => {
          this.computedTime--
          if(this.computedTime <=0){
            clearInterval(this.setIntervalId)
          }
        },1000)
      
      let result = await reqSendCode(this.phone)
      if(result.code == 1){
          this.showAlert(result.msg)
        if(this.computedTime){
        this.computedTime = 0
        clearInterval(this.setIntervalId)
      }
      }
      }
    },
    showAlert(alertText){
      this.alertShow = true
      this.alertText = alertText
    },
   async login(){
     let result
      if(this.loginWay){
        //短信登陆
        let {phone, code, testPhone} = this
        if(!testPhone){
          this.showAlert('手机号码不正确')
        }
        else if(!/^\d{6}$/.test(code)){
          this.showAlert('请输入6位数字')
        }
        result = await reqSmsLogin(phone, code)
      }
      else{
        //密码登陆
        let {name, pwd, captcha} = this
        if(!name){
          this.showAlert('请输入用户名')
        }
        else if(!pwd){
          this.showAlert('请输入密码')
        }
        else if(!captcha){
          this.showAlert('请输入验证码')
        }
        result = await reqPwdLogin({name, pwd, captcha})
      }
      //清除计时器
      if(this.computedTime){
        this.computedTime = 0
        clearInterval(this.setIntervalId)
      }

      if(result.code == 1){
        //提交信息有误
        this.showAlert(result.msg)
        this.getCaptcha()
        this.captcha = ''
      }
      else{
        //登陆成功
        const user = result.data
        //提交action,更改userInfo
        this.$store.dispatch('recordUserInfo',user)
        this.$router.replace('/profile')
      }
    },
    getCaptcha(){
      this.$refs.captcha.src='http://localhost:4000/captcha?time='+Date.now()
    },
  },
  components:{
    AlertTip
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixins.styl';
    .loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.true_phone
                    color black
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right
                      transform translateX(27px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
</style>