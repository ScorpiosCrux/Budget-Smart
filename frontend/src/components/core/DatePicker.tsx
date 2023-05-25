import { DatePicker } from "@mui/x-date-pickers";
import { FieldHookConfig, FieldInputProps, FieldMetaProps, FormikProps, useField, useFormikContext } from "formik";
import { StyledDatePicker } from "./StyledMUI";
import { FormValues } from "../widgets/TransactionsWidget/TransactionForm";

interface Props {
	name: string;
}

export const DatePickerField = (props: Props) => {
	const { name } = props;
	const { setFieldValue } = useFormikContext();
	const [field, meta, helpers] = useField(name);
	return (
		<DatePicker
			{...field}
			{...props}
			// error={true}
			onChange={(value: any) => {
				setFieldValue(field.name, value);
			}}
		/>
	);
};
