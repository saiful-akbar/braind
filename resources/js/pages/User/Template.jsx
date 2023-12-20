import React from "react";
import PropTypes from "prop-types";
import Header from "@/components/Header";
import { Button, Box, Grid } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link, usePage } from "@inertiajs/react";

/**
 * Komponen template untuk halaman user
 */
const UserTemplate = ({ children }) => {
	const { access } = usePage().props;

	return (
		<>
			<Header
				title="Master User"
				action={
					access.create && (
						<Button
							type="button"
							color="primary"
							variant="contained"
							startIcon={<Add />}
							component={Link}
							href={route("user.create")}
						>
							Tambah
						</Button>
					)
				}
			/>
	
			<Box component="main" sx={{ mt: 5 }}>
				<Grid
					container
					spacing={3}
					justifyContent="space-between"
				>
					<Grid item xs={12}>
						{children}
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

/**
 * Prop types
 */
UserTemplate.propTypes = {
	children: PropTypes.node.isRequired
};

export default UserTemplate;
