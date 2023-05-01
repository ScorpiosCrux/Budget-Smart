import { DatePicker } from "@mui/x-date-pickers";
import { useField, useFormikContext } from "formik";

export const DatePickerField = (props: any) => {
	const { setFieldValue } = useFormikContext();
	const [field] = useField(props);
	return (
		<DatePicker
			{...field}
			{...props}
			selected={(field.value && new Date(field.value)) || null}
			onChange={(value: any) => {
				setFieldValue(field.name, value);
			}}
		/>
	);
};
