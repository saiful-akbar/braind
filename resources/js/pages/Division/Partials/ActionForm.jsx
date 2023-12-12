import React from "reac";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

/**
 * Komponen partials untuk halaman division
 */
const ActionForm = React.memo((props) => {
	const form = useSelector((state) => state.division.form);
	const dispatch = useDispatch();
});

export default ActionForm;