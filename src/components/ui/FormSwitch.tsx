import { Form, Switch, type SwitchProps } from 'antd';
import { type Control, Controller, type FieldPath, type FieldValues, type RegisterOptions } from 'react-hook-form';

export interface FormSwitchProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<SwitchProps, 'name' | 'defaultValue' | 'checked'> {
    name: TName;
    control: Control<TFieldValues>;
    label?: string;
    rules?: Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    helperText?: string;
}

export const FormSwitch = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    name,
    control,
    label,
    rules,
    helperText,
    ...switchProps
}: FormSwitchProps<TFieldValues, TName>) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { value, onChange, ...field }, fieldState: { error } }) => (
                <Form.Item
                    label={label}
                    validateStatus={error ? 'error' : ''}
                    help={error?.message || helperText}
                    valuePropName="checked"
                >
                    <Switch
                        {...field}
                        {...switchProps}
                        checked={value}
                        onChange={onChange}
                    />
                </Form.Item>
            )}
        />
    );
};
