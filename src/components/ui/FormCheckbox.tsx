import { Form, Checkbox, type CheckboxProps } from 'antd';
import { type Control, Controller, type FieldPath, type FieldValues, type RegisterOptions } from 'react-hook-form';

export interface FormCheckboxProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<CheckboxProps, 'name' | 'defaultValue' | 'checked'> {
    name: TName;
    control: Control<TFieldValues>;
    label?: string;
    rules?: Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    helperText?: string;
}

export const FormCheckbox = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    name,
    control,
    label,
    rules,
    helperText,
    ...checkboxProps
}: FormCheckboxProps<TFieldValues, TName>) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { value, onChange, ...field }, fieldState: { error } }) => (
                <Form.Item
                    validateStatus={error ? 'error' : ''}
                    help={error?.message || helperText}
                    valuePropName="checked"
                >
                    <Checkbox
                        {...field}
                        {...checkboxProps}
                        checked={value}
                        onChange={(e) => onChange(e.target.checked)}
                    >
                        {label}
                    </Checkbox>
                </Form.Item>
            )}
        />
    );
};
