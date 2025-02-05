<template>
    <div class="settings-form">
        <div class="form-group">
            <label for="salary">月薪</label>
            <input id="salary" v-model="salary" type="number" placeholder="请输入月薪" />
        </div>

        <div class="form-group">
            <label for="expectedSalary">期望月薪</label>
            <input id="expectedSalary" v-model="expectedSalary" type="number" placeholder="请输入期望月薪" />
        </div>

        <!-- 保存按钮 -->
        <button @click="saveValues">保存设定</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useFinanceStore } from '../stores/financeStore';

const store = useFinanceStore();

// 从 store 获取月薪和期望月薪
const salary = ref(store.salary);
const expectedSalary = ref(store.expectedSalary);

// 保存月薪和期望月薪
const saveValues = () => {
    store.setSalary(salary.value, expectedSalary.value);

    // 清空输入框的值
    salary.value = '';
    expectedSalary.value = '';
};
</script>

<style scoped>
.settings-form {
    background: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    font-size: 14px;
    color: #555;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

button {
    margin-top: auto;
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}
</style>
