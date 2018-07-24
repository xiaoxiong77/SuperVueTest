import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/Test'
import TestSecond from '@/components/TestSecond'
import Transfer from '@/components/Transfer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/testSecond',
      name: 'TestSecond',
      component: TestSecond
    },
    {
      path: '/transfer',
      name: 'Transfer',
      component: Transfer
    }
  ]
})
