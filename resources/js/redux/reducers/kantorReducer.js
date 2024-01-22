import { createSlice } from "@reduxjs/toolkit";

export const kantorSlice = createSlice({
	name: 'kantor',
	initialState: {
		form: {
			type: 'create',
			open: false,
			data: {
				id: "",
				nama: "",
			},
		},
	},

	reducers: {
		createKantor: (state) => {
			state.form = {
				type: "create",
				open: true,
				data: {
					id: "",
					nama: "",
				},
			}
		},
		updateKantor: (state, action) => {
			state.form = {
				type: "update",
				open: true,
				data: {
					id: action.payload.id,
					nama: action.payload.nama,
				},
			}
		},
		closeFormKantor: (state) => {
			state.form.open = false;
		}
	}
});

export const {
	createKantor,
	updateKantor,
	closeFormKantor,
} = kantorSlice.actions;

export default kantorSlice.reducer;
