import { createSlice } from '@reduxjs/toolkit'
import { fetchFinance, getStatistics, fetchTotalFinance, fetchCategories, addTransaction } from './finance-operation'

import { toast } from 'react-toastify'

const initialState = {
	isLoading: false,
	error: null,
	statistics: {
		statisticsByCategory: [],
		incomeTotal: 0,
		outlayTotal: 0,
	},

	data: [],
	totalBalance: '',
	categories: [],
}

const financeSlice = createSlice({
	name: 'finance',
	initialState,
	extraReducers: {
		//================AllFinance
		[fetchFinance.pending]: (state) => {
			state.isLoading = true
		},
		[fetchFinance.fulfilled]: (state, action) => {
			state.isLoading = false
			state.data = [...state.data, ...action.payload]
			toast.success('Ok')
		},
		[fetchFinance.rejected]: (state, action) => {
			state.isLoading = false
			state.error = action.payload
			toast.error('Error')
		},
		//=========Statistics
		[getStatistics.pending]: (state) => {
			state.isLoading = true
		},
		[getStatistics.fulfilled]: (state, action) => {
			state.isLoading = false
			state.statistics.incomeTotal = action.payload.incomeStatistics
			state.statistics.outlayTotal = action.payload.totalOutlayStatistics
			state.statistics.statisticsByCategory = action.payload.statisticsByCategory
			toast.success('Ok')
		},
		[getStatistics.rejected]: (state, action) => {
			state.isLoading = false
			state.error = action.payload
			toast.error('Error')
		},
		//=================Balance
		[fetchTotalFinance.pending]: (state) => {
			state.isLoading = true
			state.totalBalance = []
		},
		[fetchTotalFinance.fulfilled]: (state, action) => {
			state.isLoading = false
			state.totalBalance = action.payload
			toast.success('Ok')
		},
		[fetchTotalFinance.rejected]: (state, action) => {
			state.isLoading = false
			state.error = action.payload
			toast.error('Error')
		},
		//====================Categories
		[fetchCategories.pending]: (state) => {
			state.isLoading = true
			state.categories = []
		},
		[fetchCategories.fulfilled]: (state, action) => {
			state.isLoading = false
			state.categories = action.payload
			console.log(action.payload)
			toast.success('Ok')
		},
		[fetchCategories.rejected]: (state, action) => {
			state.isLoading = false
			state.error = action.payload
			toast.error('Error')
		},
		//=======================Add_transaction
		[addTransaction.pending]: (state) => {
			state.isLoading = true
		},
		[addTransaction.fulfilled]: (state, action) => {
			state.isLoading = false
			state.data = action.payload
			toast.success('Transaction added')
		},
		[addTransaction.rejected]: (state, action) => {
			state.isLoading = false
			state.error = action.payload
			toast.error('Error')
		},
	},
})

export default financeSlice.reducer
