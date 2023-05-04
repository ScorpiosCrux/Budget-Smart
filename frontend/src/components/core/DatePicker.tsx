import { DatePicker } from "@mui/x-date-pickers";
import { useField, useFormikContext } from "formik";
import { StyledDatePicker } from "./StyledMUI";

export const DatePickerField = (props: any) => {
	const { setFieldValue } = useFormikContext();
	const [field] = useField(props);
	return (
		<StyledDatePicker
			{...field}
			{...props}
			selected={(field.value && new Date(field.value)) || null}
			onChange={(value: any) => {
				setFieldValue(field.name, value);
			}}
		/>
	);
};
