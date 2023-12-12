import React from "react";
import AuthLayout from "@/layouts/AuthLayout";
import Header from "@/components/Header";
import { Box } from "@mui/material";

/**
 * Halaman create division
 */
export default function CreateDivision(props) {
	return (
		<Box sx={{ my: 5 }}>
			<Header title="Tambah Kanwil" />

			<h1>Tambah kanwil</h1>
		</Box>
	)
}

CreateDivision.layout = (page) => <AuthLayout title="Tambah Kanwil" />;
