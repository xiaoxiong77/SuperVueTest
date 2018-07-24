<template>
    <div class="testContainer">
        <button @click="getBack">返回</button>
        <input type="text" v-model="textValue" class="textInput" @keyup.enter="handelAdd"/>
        <button @click="handelAdd">添加</button> 
        <ul class="content">
            <li v-if="show" v-for="item in dataList" :key="item.id" @click="getDetail(item.id)">{{item.value}}</li>
        </ul>
        <p class="underline"></p>
        <div class="detailMsg">
            <TestDetail :detailData="detailData" @removeTest="removeTest"/>
        </div>
    </div>
</template>

<script>
import TestDetail from './TestDetail';
import {mapState} from 'vuex';
export default {
    name: 'Test',
    components: {TestDetail},
    data(){
        return {
            textValue: '',
            show: false,
            dataList: [],
            id: 0,
            detailData: null
        }
    },
    mounted() {
        if(this.dataList && this.dataList.length !== 0 ){
            this.show = true;
        }
    },
    methods: {
        getBack(){
            this.$router.push('/');
        },
        handelAdd(){
            if(!this.show){
                this.show = true;
            }
            // this.$store.commit({
            //     type: 'Test/addData', 
            //     data: this.textValue
            // });
            this.id++;
            this.dataList.push({id: this.id, value: this.textValue});
            this.textValue = '';
        },
        getDetail(id){
            this.dataList.forEach(item => {
                if(item.id === id){
                    this.detailData = item;
                }
            })
        },
        removeTest(id){
            this.detailData = null;
            this.dataList = this.dataList.filter(item => item.id !== id);
        }
    },
    computed: {
        // ...mapState('Test', {
        //     dataList: state => state.dataList
        // })
    }
}
</script>

<style lang="less" scoped>
    .testContainer{
        .textInput{
            width: 200px;
            height: 30px;
        }
        .content{
            margin: 0;
            padding: 0;
            list-style: none;

        }
        .underline{
            border: 2px solid skyblue;
        }
    }
</style>
