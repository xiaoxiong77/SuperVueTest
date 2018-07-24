<template>
    <div>
        <h2>hello{{message}}</h2>
        <div id="main" style="height: 500px;"></div>
        <button @click="handleClick">example1</button>
        <button @click="handelSecondClick">example2</button>
        <button @click="handelTransfer">穿梭框</button>
    </div>
</template>

<script>
import echarts from 'echarts';
export default {
    name: 'HelloWorld',
    data(){
        return {
            message: 'world',
            textValue: null
        }
    },
    created(){
        // setTimeout(this.b, 2000);
        // setInterval(this.b, 2000);
    },
    mounted() {
        const myChart = echarts.init(document.getElementById('main'));
        const colorList = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];
        const labelFont = 'bold 12px Sans-serif';
        myChart.setOption({
            color: colorList,
            title: {
                left: 'center',
                text: '测试图例'
            },
            legend: {
                top: 30,
                data: ['A','B','C']
            },
            // dataZoom: [
            //     {
            //         type: 'slider',
            //         xAxisIndex: [0, 1],
            //         realtime: false,
            //         start: 20,
            //         end: 70,
            //         top: 65,
            //         height: 20,
            //         handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            //         handleSize: '120%'
            //     }, 
            //     {
            //         type: 'inside',
            //         xAxisIndex: [0, 1],
            //         start: 40,
            //         end: 70,
            //         top: 30,
            //         height: 20
            //     }
            // ],
            xAxis: [
                {
                    type: 'category',
                    data: ["2016-04-01", "2016-04-02", "2016-04-03", "2016-04-04", "2016-04-05", "2016-04-06", "2016-04-07", "2016-04-08"],
                    boundaryGap: false,
                    axisLine: { lineStyle: { color: '#777' } },
                    min: 'dataMin',
                    max: 'dataMax'
                },
                {
                    type: 'category',
                    gridIndex: 1,
                    data: ["2016-04-01", "2016-04-02", "2016-04-03", "2016-04-04", "2016-04-05", "2016-04-06", "2016-04-07", "2016-04-08"],
                    scale: true,
                    boundaryGap : false,
                    splitLine: {show: false},
                    axisLabel: {show: false},
                    axisTick: {show: false},
                    axisLine: { lineStyle: { color: '#777' } },
                    // splitNumber: 20,
                    min: 'dataMin',
                    max: 'dataMax'
                }
            ],
            yAxis: [
                {
                    scale: true,
                    splitNumber: 4,
                    axisLine: { lineStyle: { color: '#777' } },
                    splitLine: { show: true },
                    axisTick: { show: false },
                    axisLabel: {
                        inside: true,
                        formatter: '{value}\n'
                    }
                }, 
                {
                    scale: true,
                    gridIndex: 1,
                    splitNumber: 4,
                    axisLabel: {show: false},
                    axisLine: {show: false},
                    axisTick: {show: false},
                    splitLine: {show: false}
                }
            ],
            grid: [{
                left: 40,
                right: 40,
                top: 110,
                height: 120
            }, {
                left: 40,
                right: 40,
                height: 40,
                top: 260
            }],
            // graphic: [{
            //     type: 'group',
            //     left: 'center',
            //     top: 70,
            //     width: 300,
            //     bounding: 'raw',
            //     children: [{
            //         id: 'B',
            //         type: 'text',
            //         style: {fill: colorList[1], font: labelFont},
            //         left: 0
            //     }, {
            //         id: 'C',
            //         type: 'text',
            //         style: {fill: colorList[2], font: labelFont},
            //         left: 'center'
            //     }]
            // }],
            series: [
                {
                    type: 'bar',
                    name: 'Volume',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    itemStyle: {
                        normal: {
                            color: '#7fbe9e'
                        },
                        emphasis: {
                            color: '#140'
                        }
                    },
                    data: [190, 280, 700, 470, 900, 1000, 330, 660]
                },
                {
                    type: 'candlestick',
                    name: 'A',
                    data: [[790, 600, 550, 590], [680, 600, 800, 820], [700, 770, 800, 830], [470, 500, 580, 600], [850, 800, 900, 880], [1700, 1200, 1500, 1600], [330, 500, 580, 600], [660, 700, 720, 780]],
                    itemStyle: {
                        normal: {
                            color: '#ef232a',
                            color0: '#14b143',
                            borderColor: '#ef232a',
                            borderColor0: '#14b143'
                        },
                        emphasis: {
                            color: 'black',
                            color0: '#444',
                            borderColor: 'black',
                            borderColor0: '#444'
                        }
                    }
                },
                {
                    type: 'line',
                    name: 'B',
                    data: ['-', 880, 300, 470, 200, 1000, 930, 770],
                    // showSymbol: false,
                    smooth: true
                },
                {
                    type: 'line',
                    name: 'C',
                    data:['-', '-', 700, 870, 900, 1000, 630, 690],
                    // showSymbol: false,
                    smooth: true
                }
            ]
        })
    },
    methods: {
        handleClick(){
            this.$router.push('/test')
        },
        handelSecondClick(){
            this.$router.push('/testSecond')
        },  
        handelTransfer(){
            this.$router.push('/transfer')
        },
        b(){
            try{
                b.error.here;
            } catch(e){
                console.log(e.toString())
                throw e;
            }
            // setTimeout(b, 2000);
        }
    }
}
</script>

<style scoped>
    h2 {
        color: skyblue;
    }
    li{
        list-style: none;
    }
    .textInput{
        width: 200px;
        height: 30px;
    }
</style>
