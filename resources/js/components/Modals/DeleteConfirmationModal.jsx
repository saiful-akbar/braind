import React from "react";
import PropTypes from "prop-types";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	IconButton,
	Typography,
	Grid,
	Tooltip,
	Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from "@mui/lab";

/**
 * Komponen modal untuk konfirmasi hepus
 */
const DeleteConfirmationModal = React.memo((props) => {
	const { open, title, loading, onDelete, onClose, ...rest } = props;

	/**
	 * fungsi untuk menutup modal
	 */
	const handleClose = () => {
		if (!loading) onClose();
	}

	return (
		<Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
			<DialogTitle
				component="div"
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center"
				}}
			>
				<Typography variant="h6" component="span">
					{title}
				</Typography>

				<Tooltip title="Tutup" disableInteractive>
					<IconButton
						type="button"
						onClick={handleClose}
						disabled={loading}
					>
						<CloseIcon />
					</IconButton>
				</Tooltip>
			</DialogTitle>

			<DialogContent>
				<DialogContentText>
					Apakah Anda yakin ingin menghapus item ini?
				</DialogContentText>
			</DialogContent>

			<DialogActions sx={{ p: 3 }} >
				<LoadingButton
					fullWidth
					disableElevation
					type="button"
					variant="contained"
					color="error"
					loading={loading}
					onClick={onDelete}
					startIcon={<DeleteIcon />}
					loadingIndicator="Menghapus..."
				>
					Hapus
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
});

/**
 * Prop types
 */
DeleteConfirmationModal.propTypes = {
	open: PropTypes.bool.isRequired,
	title: PropTypes.string,
	loading: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
};

/**
 * Default props.
 */
DeleteConfirmationModal.defaultProps = {
	title: "Hapus",
	loading: false,
};

export default DeleteConfirmationModal;
