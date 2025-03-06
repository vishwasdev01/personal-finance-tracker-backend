const Transaction = require('../models/transaction');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Create a Transaction (POST)
exports.createTransaction = catchAsync(async (req, res) => {
    const { type, amount, category, date, description } = req.body;

    if (!type || !['income', 'expense'].includes(type) || amount == null || amount < 0 || !category || !date) {
        return res.status(400).json({ error: 'Invalid input. Type (income/expense), category, date, and non-negative amount are required.' });
    }

    const newTransaction = new Transaction({ type, amount, category, date, description });
    await newTransaction.save();
    res.status(201).json(newTransaction);
});

// Get All Transactions with Filters (GET)
exports.getTransactions = catchAsync(async (req, res) => {
    let { type, from, to, category } = req.query;
    let filter = {};

    if (type && ['income', 'expense'].includes(type)) {
        filter.type = type;
    }
    
    if (from && to) {
        filter.date = { $gte: new Date(from), $lte: new Date(to) };
    }

    if (category) {
        filter.category = { $regex: new RegExp(category, 'i') }; // Case-insensitive search
    }

    const transactions = await Transaction.find(filter);
    res.json(transactions);
});

// Get a Single Transaction by ID (GET)
exports.getTransactionById = catchAsync(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    res.json(transaction);
});

// Update a Transaction (PUT)
exports.updateTransaction = catchAsync(async (req, res) => {
    const { type, amount, category, date, description } = req.body;

    if (!type || !['income', 'expense'].includes(type) || amount == null || amount < 0 || !category || !date) {
        return res.status(400).json({ error: 'Invalid input. Type (income/expense), category, date, and non-negative amount are required.' });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
        req.params.id, 
        { type, amount, category, date, description }, 
        { new: true }
    );

    if (!updatedTransaction) return res.status(404).json({ error: 'Transaction not found' });

    res.json(updatedTransaction);
});

// Delete a Transaction (DELETE)
exports.deleteTransaction = catchAsync(async (req, res) => {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!deletedTransaction) return res.status(404).json({ error: 'Transaction not found' });
    
    res.json({ message: 'Transaction deleted' });
});

// Get Transaction Summary (GET)
exports.getTransactionSummary = catchAsync(async (req, res) => {
    let { from, to } = req.query;
    let filter = {};

    // Apply date filtering if provided
    if (from) {
        filter.date = { ...filter.date, $gte: new Date(from) };
    }
    if (to) {
        filter.date = { ...filter.date, $lte: new Date(to) };
    }

    // Aggregate transactions to calculate total income, total expense, and net balance
    const transactions = await Transaction.find(filter);

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(transaction => {
        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        } else if (transaction.type === "expense") {
            totalExpense += transaction.amount;
        }
    });

    const netBalance = totalIncome - totalExpense;

    res.status(200).json({
        totalIncome,
        totalExpense,
        netBalance,
        filterApplied: { from, to }
    });
});

