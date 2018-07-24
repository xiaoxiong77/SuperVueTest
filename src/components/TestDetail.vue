<template>
    <div>
        <h2>详情</h2>
        <span>{{detailData && detailData.value}}</span>
        <button @click="handelDelete">删除</button>
    </div>
</template>

<script>
    export default {
        name: 'TestDetail',
        data(){
            return {

            }
        },
        props: ['detailData'],
        methods: {
            handelDelete(){
                this.$emit('removeTest',this.detailData.id);
            }
        }
    }
</script>

<style>

</style>
