import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialValues = {
  title: "",
  country: "SK",
  city: "",
  date: dayjs().toISOString(),
  // time: new Date(),
  tags: [],
  description: "",
};

const initialState = {
  isOpen: false,
  isEditing: false,
  event: {},
  // values: initialValues,
};

const formSlice = createSlice({
  name: "formActions",
  initialState,
  reducers: {
    openForm: state => {
      state.isOpen = true;
    },
    closeForm: state => {
      state.isOpen = false;
    },
    editingTrue: state => {
      state.isEditing = true;
    },
    editingFalse: state => {
      state.isEditing = false;
    },
    setEvent: (state, action) => {
      console.log(action.payload);
      // state.event = { ...action.payload, date: dayjs(action.payload.date) };
      state.event = action.payload;
    },
    resetEvent: state => {
      state.event = {};
    },
    setValues: (state, action) => {
      state.values[action.payload.name] = action.payload.value;
      if (action.payload.name === "country") {
        state.values.country = action.payload.value;
        state.values.city = "";
      }
      if (action.payload.name === "tags") {
        state.values.tags =
          typeof action.payload.value === "string" ? action.payload.value.split(",") : action.payload.value;
      }
    },
    resetValues: state => {
      state.values = initialValues;
    },
  },
});

export const { openForm, closeForm, editingTrue, editingFalse, setEvent, resetEvent, setValues, resetValues } =
  formSlice.actions;
export default formSlice.reducer;
