<template>
    <div>
        <div class="finance-wrapper">
            <FinanceForm />
            <FinanceSettingsForm />
        </div>
        <div class="finance-wrapper">
            <FinanceChart />
            <FinanceList />
        </div>
    </div>
</template>

<script setup>
import FinanceForm from '../components/FinanceForm.vue';
import FinanceSettingsForm from '../components/FinanceSettingsForm.vue';
import FinanceChart from '../components/FinanceChart.vue';
import FinanceList from '../components/FinanceList.vue';
</script>

<style scoped>
.finance-wrapper {
    display: flex;
    justify-content: space-between;
    gap: 20px;
}

.finance-chart,
.finance-list {
    flex: 1;
    /* 确保两个组件等宽 */
}

.finance-form,
.settings-form {
    flex: 1;
    display: flex;
    flex-direction: column;
    /* 确保按钮在底部 */
}
</style>