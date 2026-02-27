import { Form, Input, type InputProps } from 'antd';
import { type Control, Controller, type FieldPath, type FieldValues, type RegisterOptions } from 'react-hook-form';

export interface FormInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<InputProps, 'name' | 'defaultValue'> {
    name: TName;
    control: Control<TFieldValues>;
    label?: string;
    rules?: Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    helperText?: string;
}

export const FormInput = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    name,
    control,
    label,
    rules,
    helperText,
    ...inputProps
}: FormInputProps<TFieldValues, TName>) => {
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
                    <Input {...field} {...inputProps} />
                </Form.Item>
            )}
        />
    );
};
