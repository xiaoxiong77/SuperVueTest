<template>
    <div class="transferContainer">
        <h3>穿梭框</h3>
        <div class="containerBox">
            <div class="transferLeft transferBox">
                <ul>
                    <li class="checkedALL">
                        <!-- <input type="checkbox" v-model="leftCheckedALL">
                        <span>全选</span> -->
                        <div :class="['checkContainer', allItemLeft && 'containerchecked']">
                            <input 
                                class="checkItem" 
                                id="checkAll" 
                                type="checkbox"
                                @change="handelLeftCheckedALL" 
                            />
                            <label for="checkAll"></label>
                        </div>
                        <span>全选</span>
                    </li>
                    <li v-for="item in data" :key="item.id">
                        <div :class="['checkContainer', item.checked && 'containerchecked']">
                            <input 
                                class="checkItem" 
                                :id="item.id" 
                                type="checkbox" 
                                :value="item.id" 
                                @change="(e) => getCheck(e,item)" 
                            />
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
                    <!-- <li class="checkedALL" @change="handelRightCheckedALL">
                        <input type="checkbox" v-model="rightCheckedAll">
                        <span>全选</span>
                    </li> -->
                    <li class="checkedALL">
                        <div :class="['checkContainer', allItemRight && 'containerchecked']">
                            <input 
                                class="checkItem" 
                                id="checkAllRight" 
                                type="checkbox"
                                @change="handelRightCheckedALL" 
                            />
                            <label for="checkAllRight"></label>
                        </div>
                        <span>全选</span>
                    </li>
                    <!-- <li v-for="item in rightData" :key="item.id">
                        <input type="checkbox" :value="item.id" v-model="checkedRight"/>
                        <span>{{item.name}}</span>
                    </li> -->
                     <li v-for="item in rightData" :key="item.id">
                        <div :class="['checkContainer', item.checked && 'containerchecked']">
                            <input 
                                class="checkItem" 
                                :id="item.id" 
                                type="checkbox" 
                                :value="item.id" 
                                @change="(e) => getCheckRight(e, item)" 
                            />
                            <label :for="item.id"></label>
                        </div>
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
                allItemLeft: false,
                allItemRight: false
            }
        },
        mounted() {
            
        },
        methods: {
            getCheck(e, tableItem){
                let arr = [];
                this.data.forEach(item => {
                    if(item.id == e.target.value){
                        item.checked = !tableItem.checked;
                    }
                    arr.push(item);
                })
                this.data = arr;
                
                if(tableItem.checked){
                    this.checkedLeft.push(e.target.value);
                }else{
                    this.checkedLeft = this.checkedLeft.filter(item => item != tableItem.id);
                }

                if(this.checkedLeft.length == this.data.length){
                    this.allItemLeft = true;
                }else{
                    this.allItemLeft = false;
                }
            },
            getCheckRight(e, tableItem){
                let arr = [];
                this.rightData.forEach(item => {
                    if(item.id == e.target.value){
                        item.checked = !tableItem.checked;
                    }
                    arr.push(item);
                })
                this.rightData = arr;
                
                if(tableItem.checked){
                    this.checkedRight.push(e.target.value);
                }else{
                    this.checkedRight = this.checkedRight.filter(item => item != tableItem.id);
                }
                
                if(this.checkedRight.length == this.rightData.length){
                    this.allItemRight = true;
                }else{
                    this.allItemRight = false;
                }
            },
            handelMoveRight(){
                this.data.forEach(item => {
                    this.checkedLeft.forEach(checked => {
                        if(item.id == checked){
                            item.checked = false;
                            this.rightData.push(item);
                            this.data = this.data.filter(dataItem => dataItem.id != checked);
                        }
                    });
                });
                this.checkedLeft = [];
                this.allItemLeft = false;
                this.allItemRight = false;
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
                this.allItemLeft = false;
                this.allItemRight = false;
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
            handelLeftCheckedALL(e){
                if(this.data.length){
                    let arr = [];
                    this.data.forEach(item => {
                        item.checked = !this.allItemLeft;
                        arr.push(item.id);
                    });
                    this.checkedLeft = arr;
                    this.allItemLeft = !this.allItemLeft;
                }
                if(!this.allItemLeft){
                    this.checkedLeft = [];
                }
            },
            handelRightCheckedALL(e){
                if(this.rightData.length){
                    let arr = [];
                    this.rightData.forEach(item => {
                        item.checked = !this.allItemRight;
                        arr.push(item.id);
                    });
                    this.checkedRight = arr;
                    this.allItemRight = !this.allItemRight;
                }
                if(!this.allItemRight){
                    this.checkedRight = [];
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
        }
        .containerchecked {
            label {
                background-color: #1890ff;
                border: 1px solid #1890ff;
            }
            label:after{
                content: '';
                position: absolute;
                width: 7px;
                height: 3px;
                background: transparent;
                top: 3px;
                left: 3px;
                border: 2px solid #fff;
                border-top: none;
                border-right: none;
                -webkit-transform: rotate(-45deg);
                -moz-transform: rotate(-45deg);
                -o-transform: rotate(-45deg);
                -ms-transform: rotate(-45deg);
                transform: rotate(-45deg);
            }
        }
    }
}
</style>
