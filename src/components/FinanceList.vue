<template>
    <div class="finance-list">
        <h2>财务记录</h2>

        <!-- 卡片式布局 -->
        <div class="card">
            <ul>
                <li v-for="(t, index) in transactions" :key="index" :class="t.type">
                    <span class="date">{{ t.date }}</span>
                    <span class="type">{{ t.type === 'income' ? '收入' : '支出' }}</span>
                    <span class="amount">RM {{ Number(t.amount).toFixed(2) }}</span>
                    <span class="description" :title="t.description">
                        {{ t.description.length > 20 ? t.description.substring(0, 20) + '...' : t.description }}
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { useFinanceStore } from '../stores/financeStore';
import { computed } from 'vue';

const store = useFinanceStore();
const transactions = computed(() => store.transactions);
</script>

<style scoped>
.finance-list {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.card {
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    max-height: 455px;
    overflow-y: auto;
}

/* 优化滚动条 */
.card::-webkit-scrollbar {
    width: 8px;
}

.card::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.card::-webkit-scrollbar-thumb {
    background: #272e27;
    border-radius: 10px;
    transition: background 0.3s;
}

.card::-webkit-scrollbar-thumb:hover {
    background: #45a049;
}

/* 列表样式 */
ul {
    list-style: none;
    padding: 0;
}

li {
    display: flex;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    background-color: #f9f9f9;
}

/* 绿色和红色边框区分收入和支出 */
li.income {
    border-left: 4px solid #4CAF50;
}

li.expense {
    border-left: 4px solid #F44336;
}

/* 调整各个元素的位置 */
.date {
    font-size: 14px;
    color: #777;
    width: 100px;
    /* 保持对齐 */
}

.type {
    font-size: 14px;
    font-weight: bold;
    width: 60px;
    /* 靠左一点 */
    text-align: left;
}

.amount {
    font-size: 14px;
    font-weight: bold;
    width: 90px;
    /* 靠左一点 */
    text-align: left;
}

.description {
    font-size: 14px;
    color: #555;
    flex: 1;
    /* 让 description 占满剩余空间 */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    /* 超出省略 */
}
</style>
