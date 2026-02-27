import { Form, InputNumber, type InputNumberProps } from 'antd';
import { type Control, Controller, type FieldPath, type FieldValues, type RegisterOptions } from 'react-hook-form';

export interface FormInputNumberProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<InputNumberProps, 'name' | 'defaultValue'> {
    name: TName;
    control: Control<TFieldValues>;
    label?: string;
    rules?: Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    helperText?: string;
}

export const FormInputNumber = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    name,
    control,
    label,
    rules,
    helperText,
    ...inputProps
}: FormInputNumberProps<TFieldValues, TName>) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <Form.Item
                    label={label}
                    validateStatus={error ? 'error' : ''}
                    help={error?.message || helperText}
                >
                    <InputNumber {...field} {...inputProps} style={{ width: '100%', ...inputProps.style }} />
                </Form.Item>
            )}
        />
    );
};
