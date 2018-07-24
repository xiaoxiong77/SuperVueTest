<template>
    <div class="transferContainer">
        <h3>穿梭框</h3>
        <div class="containerBox">
            <div class="transferLeft transferBox">
                <ul>
                    <li class="checkedALL" @change="handelLeftCheckedALL">
                        <input type="checkbox" v-model="leftCheckedALL">
                        <span>全选</span>
                    </li>
                    <li v-for="item in  data" :key="item.id">
                        <div :class="['checkContainer', item.checked && 'containerchecked']">
                            <input class="checkItem" :id="item.id" type="checkbox" :value="item.id" @change="getCheck" v-model="checkedLeft"/>
                            <label :for="item.id"></label>
                        </div>
                        <span>{{item.name}}</span>
                    </li>
                </ul>
            </div>
            <div class="tansferbtnList">
                <div class="tansferbtn">
                    <button @click="handelMoveRight">右移</button>
                </div>
                <div>
                    <button @click="handelMoveLeft">左移</button>
                </div>
            </div>
            <div class="transferRight transferBox">
                <ul>
                    <li class="checkedALL" @change="handelRightCheckedALL">
                        <input type="checkbox" v-model="rightCheckedAll">
                        <span>全选</span>
                    </li>
                    <li v-for="item in  rightData" :key="item.id">
                        <input type="checkbox" :value="item.id" v-model="checkedRight"/>
                        <span>{{item.name}}</span>
                    </li>
                </ul>
            </div>
            <div class="tansferbtnList">
                <div class="tansferbtn">
                    <button @click="handelUp">上移</button>
                </div>
                <div>
                    <button @click="handelDown">下移</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Transfer',
        data(){
            return {
                data: [
                    {id: 1, name: '备选项1'},
                    {id: 2, name: '备选项2'},
                    {id: 3, name: '备选项3'},
                    {id: 4, name: '备选项4'},
                    {id: 5, name: '备选项5'},
                    {id: 6, name: '备选项6'},
                    {id: 7, name: '备选项7'}
                ],
                checkedLeft: [],
                rightData: [],
                checkedRight: [],
                leftCheckedALL: false,
                rightCheckedAll: false
            }
        },
        mounted() {
            
        },
        methods: {
            getCheck(e){
                console.log(this.checkedLeft)
                if(e.target.value){
                    this.data = this.data.map(item => {
                        if(item.id == e.target.value){
                            console.log(item.id)
                            item.checked = true;
                            return item;
                        }
                    })
                }
            },
            handelMoveRight(){
                this.data.forEach(item => {
                    this.checkedLeft.forEach(checked => {
                        if(item.id === checked){
                            this.rightData.push(item);
                            this.data = this.data.filter(dataItem => dataItem.id !== checked);
                        }
                    });
                });
                this.checkedLeft = [];
                this.leftCheckedALL = false;
                this.rightCheckedAll = false;
            },
            handelMoveLeft(){
                this.rightData.forEach(item => {
                   this.checkedRight.forEach(checked => {
                       if(item.id === checked){
                           this.data.push(item);
                           this.rightData = this.rightData.filter(dataItem => dataItem.id !== checked);
                       }
                   });
                });
                this.checkedRight = [];
                this.leftCheckedALL = false;
                this.rightCheckedAll = false;
            },
            handelUp(){
                if(this.checkedRight.length){
                    if(this.checkedRight.length > 1){
                        this.$alert('每次只能选择一项', '提示', {
                            confirmButtonText: '确定',
                            // callback: action => {
                            //     this.$message({
                            //         type: 'info',
                            //         message: `action: ${ action }`
                            //     });
                            // }
                        });
                    }else{
                        let pos = null;
                        this.rightData.forEach((item, index) => {
                            if(item.id === this.checkedRight[0]){
                                pos = index;
                            }
                        });
                        if(this.rightData.length !== 1){
                            if(pos === 0){
                                this.rightData.push(this.rightData.shift());
                                this.checkedRight = [];
                            }else{
                                const temp = this.rightData[pos - 1];
                                this.rightData[pos - 1] = this.rightData[pos];
                                this.rightData[pos] = temp;
                                this.checkedRight = [];
                            }
                        }
                    }  
                }
            },
            handelDown(){
                if(this.checkedRight.length){
                    if(this.checkedRight.length > 1){
                        this.$alert('每次只能选择一项', '提示', {
                            confirmButtonText: '确定',
                        });
                    }else{
                        let pos = null;
                        this.rightData.forEach((item, index) => {
                            if(item.id === this.checkedRight[0]){
                                pos = index;
                            }
                        });
                        if(this.rightData.length !== 1){
                            if(pos === (this.rightData.length - 1)){
                                this.rightData.unshift(this.rightData.pop())
                                this.checkedRight = [];
                            }else{
                                const temp = this.rightData[pos + 1];
                                this.rightData[pos + 1] = this.rightData[pos];
                                this.rightData[pos] = temp;
                                this.checkedRight = [];
                            }
                        }
                    }  
                }
            },
            handelLeftCheckedALL(){
                if(this.data.length){
                    if(this.leftCheckedALL){
                        let arr = [];
                        this.data.map(item => {
                            arr.push(item.id)
                        });
                        this.checkedLeft = arr;
                    }else{
                        this.checkedLeft = [];
                    }
                }else{
                    this.leftCheckedALL = false;
                }
            },
            handelRightCheckedALL(){
                if(this.rightData.length){
                    if(this.rightCheckedAll){
                        let arr = [];
                        this.rightData.map(item => {
                            arr.push(item.id)
                        });
                        this.checkedRight = arr;
                    }else{
                        this.checkedRight = [];
                    }
                }else{
                    this.rightCheckedAll = false;
                }
            }
        }
    }
</script>

<style lang="less" scoped>
.transferContainer {
    .containerBox {
        display: flex;
        flex-direction: row;
        ul {
            margin: 0;
            padding: 0;
            list-style: none;
        }
        li {
            width: '100%';
            text-align: left;
            padding: 10px 0 10px 20px;
            height: 20px;
        }
        .checkedALL {
            border-bottom: 1px solid #ccc;
        }
        .transferBox {
            width: 300px;
            height: 500px;
            border: 1px solid #dadada;
            border-radius: 5px;
        }
        .tansferbtnList {
            width: 100px;
            height: 70px;
            margin: auto 0;
            text-align: center;
            .tansferbtn {
                margin-bottom: 20px;
            }
        }
        .checkContainer {
            display: inline-block;
            width: 14px;
            position: relative;
            margin-right: 10px;
            .checkItem {
                visibility: hidden;
            }
            label {
                cursor: pointer;
                position: absolute;
                width: 14px;
                height: 14px;
                top: 2px;
                left: 0;
                background-color: #fff;
                border: 1px solid #ccc;
                border-radius: 3px;
            }
            label:after{
                opacity: 0;
                content: '';
                position: absolute;
                width: 7px;
                height: 3px;
                background: transparent;
                top: 3px;
                left: 3px;
                border: 2px solid #333;
                border-top: none;
                border-right: none;
                -webkit-transform: rotate(-45deg);
                -moz-transform: rotate(-45deg);
                -o-transform: rotate(-45deg);
                -ms-transform: rotate(-45deg);
                transform: rotate(-45deg);
            }
            input[type=checkbox]:checked + label:after {
                opacity: 1;
            }
        }
    }
}
</style>
