<template>
    <div class="finance-form">

        <!-- 卡片式布局 -->
        <div class="card">
            <div class="form-group">
                <label for="type">类型</label>
                <select id="type" v-model="type">
                    <option value="income">收入</option>
                    <option value="expense">支出</option>
                </select>
            </div>

            <div class="form-group">
                <label for="amount">金额</label>
                <input id="amount" v-model="amount" type="text" placeholder="请输入金额" @input="formatAmount" />
            </div>

            <div class="form-group">
                <label for="description">描述</label>
                <input id="description" v-model="description" type="text" placeholder="请输入描述" />
            </div>

            <button @click="addTransaction">添加记录</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useFinanceStore } from '../stores/financeStore';

const type = ref('income');
const amount = ref('');
const description = ref('');

const store = useFinanceStore();

// 格式化金额，确保是数字并最多两位小数
const formatAmount = () => {
    // 替换非数字和小数点字符
    let formattedAmount = amount.value.replace(/[^0-9.]/g, '');

    // 只允许一个小数点，并限制最多两位小数
    if (formattedAmount.indexOf('.') !== -1) {
        formattedAmount = formattedAmount.replace(/(\.\d{2})\d+$/, '$1'); // 保留两位小数
    }

    amount.value = formattedAmount;
};

const addTransaction = () => {
    const transaction = {
        type: type.value,
        amount: parseFloat(amount.value) || 0, // 转换为数字
        description: description.value,
        date: new Date().toLocaleDateString(),
    };
    store.addTransaction(transaction);
    amount.value = '';
    description.value = '';
};
</script>

<style scoped>
.finance-form {
    margin: 0 auto;
}

.card {
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
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

select,
input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

input {
    width: 95%;
}

button {
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
