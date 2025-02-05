import { defineStore } from 'pinia';

// 从 LocalStorage 加载数据
const loadState = () => {
    const savedState = localStorage.getItem('financeState');
    try {
        return savedState ? JSON.parse(savedState) : { transactions: [], salary: 0, expectedSalary: 0 };
    } catch (error) {
        console.error('Failed to parse financeState from localStorage:', error);
        return { transactions: [], salary: 0, expectedSalary: 0 };
    }
};

export const useFinanceStore = defineStore('finance', {
    state: () => ({
        transactions: [],
        salary: 0,
        expectedSalary: 0,
        ...loadState(),
    }),
    actions: {
        addTransaction(transaction) {
            if (!transaction || typeof transaction !== 'object') {
                console.error('Invalid transaction:', transaction);
                return;
            }
            this.transactions.push(transaction);
            this.saveState();
        },
        setSalary(salary, expectedSalary) {
            this.salary = salary;
            this.expectedSalary = expectedSalary;
            this.saveState();
        },
        saveState() {
            localStorage.setItem('financeState', JSON.stringify(this.$state));
        },
    },
    getters: {
        totalIncome: (state) =>
            state.transactions
                .filter((t) => t.type === 'income')
                .reduce((sum, t) => sum + (t.amount || 0), 0),

        totalExpense: (state) =>
            state.transactions
                .filter((t) => t.type === 'expense')
                .reduce((sum, t) => sum + (t.amount || 0), 0),
    },
});
