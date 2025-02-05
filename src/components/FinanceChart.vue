<template>
    <div class="finance-chart">
        <h2>财务统计</h2>

        <!-- 卡片式布局 -->
        <div class="card">
            <div class="stats">
                <div class="row">
                    <p><strong>总收入：</strong><span class="wordtype">RM {{ Number(totalIncome).toFixed(2) }} </span></p>
                    <p><strong>总支出：</strong><span class="wordtype">RM {{ Number(totalExpense).toFixed(2) }} </span></p>
                </div>

                <div class="row">
                    <p><strong>月薪：</strong><span class="wordtype">RM {{ Number(salary).toFixed(2) }}</span> </p>
                    <p><strong>期望月薪：</strong><span class="wordtype">{{ expectedSalary > 0 ? "RM " +
                            Number(expectedSalary).toFixed(2) :
                            "无设定" }}</span> </p>
                </div>

                <div class="single">
                    <p><strong>月薪 总收入：</strong><span class="wordtypeTotal">RM {{ Number(salary + totalIncome -
                            totalExpense).toFixed(2) }}
                        </span></p>
                </div>
            </div>

            <!-- 图表 -->
            <div class="chart-container">
                <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useFinanceStore } from '../stores/financeStore';
import { ref, computed, watch } from 'vue';

// 注册 Chart.js 组件
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const store = useFinanceStore();

// 计算属性，确保 `salary` 和 `expectedSalary` 是数字
const salary = computed(() => Number(store.salary || 0));
const expectedSalary = computed(() => Number(store.expectedSalary || 0));

// 计算总收入和总支出
const totalIncome = computed(() =>
    store.transactions?.filter((t) => t.type === 'income').reduce((sum, t) => sum + (t.amount || 0), 0) || 0
);

const totalExpense = computed(() =>
    store.transactions?.filter((t) => t.type === 'expense').reduce((sum, t) => sum + (t.amount || 0), 0) || 0
);

// 初始化 chartData
const chartData = ref({
    labels: ['收入', '支出'],
    datasets: [
        {
            label: '金额',
            backgroundColor: ['#4CAF50', '#F44336'],
            data: [0, 0],
        },
    ],
});

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        tooltip: {
            enabled: true,
        },
    },
});

// 监听 Store 数据变化，更新图表数据
watch(
    () => [totalIncome.value, totalExpense.value],
    ([income, expense]) => {
        chartData.value = {
            labels: ['收入', '支出'],
            datasets: [
                {
                    label: '金额',
                    backgroundColor: ['#4CAF50', '#F44336'],
                    data: [income, expense],
                },
            ],
        };
    },
    { immediate: true }
);
</script>

<style scoped>
.finance-chart {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.card {
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

.stats {
    margin-bottom: 20px;
    font-family: 'Arial', sans-serif;
}

.stats .row {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    /* 调整间距 */
    margin-bottom: 10px;
}

.stats .row p {
    flex: 1;
    /* 让两个 p 均分空间 */
    font-size: 18px;
    color: #333;
    margin: 0;
    line-height: 1.6;
}

.stats .single {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #4CAF50;
    margin-top: 15px;
}

.chart-container {
    height: 300px;
    margin-top: 20px;
    border-radius: 8px;
    background-color: #f7f7f7;
    padding: 10px;
}

.wordtype{
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.wordtypeTotal{
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
</style>
