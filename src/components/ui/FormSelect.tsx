import { Form, Select, type SelectProps } from 'antd';
import { type Control, Controller, type FieldPath, type FieldValues, type RegisterOptions } from 'react-hook-form';

export interface FormSelectProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<SelectProps, 'name' | 'defaultValue'> {
    name: TName;
    control: Control<TFieldValues>;
    label?: string;
    rules?: Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    helperText?: string;
}

export const FormSelect = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    name,
    control,
    label,
    rules,
    helperText,
    ...selectProps
}: FormSelectProps<TFieldValues, TName>) => {
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
                    <Select {...field} {...selectProps} />
                </Form.Item>
            )}
        />
    );
};
