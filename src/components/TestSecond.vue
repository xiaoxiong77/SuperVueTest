<template>
    <div class="container">
        <div>
            <el-table :data="productData">
                <el-table-column
                    prop="productName"
                    label="产品"
                >
                </el-table-column>
                <el-table-column
                    prop="price"
                    label="售价"
                >
                </el-table-column>
                <el-table-column
                    prop="startTime"
                    label="开始日期"
                >
                </el-table-column>
                <el-table-column
                    prop="endTime"
                    label="结束日期"
                >
                </el-table-column>
            </el-table>
            <div class="addProduct">
                <el-button>添加</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TestSecond',
    data(){
        return {
            productData: []
        }
    },
    methods: {

    }
}
</script>

<style lang="less" scoped>
    .container {
        .addProduct {
            margin-top: 20px;
        }
    }
</style>
