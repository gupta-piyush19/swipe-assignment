import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invoices: [],
};

export const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    addInvoice: (state, action) => {
      state.invoices.push(action.payload);
    },
    saveInvoice: (state, action) => {
      const index = state.invoices.findIndex(
        (invoice) => invoice.id === action.payload.id
      );
      if (index !== -1) {
        state.invoices[index] = action.payload;
      } else {
        state.invoices.push(action.payload);
      }
    },
    deleteInvoice: (state, action) => {
      state.invoices = state.invoices.filter(
        (invoice) => invoice.id !== action.payload
      );
    },
  },
});

export const { addInvoice, saveInvoice, deleteInvoice } = invoiceSlice.actions;

export default invoiceSlice.reducer;
