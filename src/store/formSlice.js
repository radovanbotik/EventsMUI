import { createSlice } from "@reduxjs/toolkit";
import getTodaysDate from "../utility/getTodaysDate";

const initialValues = {
  title: "",
  country: "SK",
  city: "",
  date: getTodaysDate(),
  tags: [],
  description: "",
};

const initialState = {
  isOpen: false,
  isEditing: false,
  event: {},
  values: initialValues,
};

const formSlice = createSlice({
  name: "formActions",
  initialState,
  reducers: {
    setFormOpen: state => {
      state.isOpen = true;
    },
    setFormClosed: state => {
      state.isOpen = false;
    },
    setEditingTrue: state => {
      state.isEditing = true;
    },
    setEditingFalse: state => {
      state.isEditing = false;
    },
    setEvent: (state, action) => {
      console.log(action.payload);
      state.event = action.payload;
    },
    resetEvent: state => {
      state.event = {};
    },
    setValues: (state, action) => {
      console.log(action.payload.value);
      state.values[action.payload.name] = action.payload.value;
      if (action.payload.name === "country") {
        state.values.country = action.payload.value;
        state.values.city = "";
      }
      if (action.payload.name === "tags")
        state.values.tags =
          typeof action.payload.value === "string" ? action.payload.value.split(",") : action.payload.value;
    },
    resetValues: state => {
      state.values = initialValues;
    },
  },
});

export const {
  setFormOpen,
  setFormClosed,
  setEditingTrue,
  setEditingFalse,
  setEvent,
  resetEvent,
  setValues,
  resetValues,
} = formSlice.actions;
export default formSlice.reducer;
