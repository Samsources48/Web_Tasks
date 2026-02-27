import { Form, DatePicker, type DatePickerProps } from 'antd';
import { type Control, Controller, type FieldPath, type FieldValues, type RegisterOptions } from 'react-hook-form';
import dayjs from 'dayjs';

export interface FormDatePickerProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<DatePickerProps, 'name' | 'defaultValue' | 'value' | 'onChange'> {
    name: TName;
    control: Control<TFieldValues>;
    label?: string;
    rules?: Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    helperText?: string;
}

export const FormDatePicker = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    name,
    control,
    label,
    rules,
    helperText,
    ...datePickerProps
}: FormDatePickerProps<TFieldValues, TName>) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
                <Form.Item
                    label={label}
                    validateStatus={error ? 'error' : ''}
                    help={error?.message || helperText}
                >
                    <DatePicker
                        {...field}
                        {...datePickerProps}
                        value={value ? dayjs(value) : null}
                        onChange={(date) => {
                            onChange(date ? date.toString() : null);
                        }}
                        style={{ width: '100%', ...datePickerProps.style }}
                    />
                </Form.Item>
            )}
        />
    );
};
