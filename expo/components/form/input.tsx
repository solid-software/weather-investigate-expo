import React from "react";
import { TextInput } from "react-native";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  inputProps?: React.ComponentProps<typeof TextInput>;
}

export const FormInput = <T extends FieldValues>({
  name,
  control,
  inputProps = {},
}: FormInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextInput value={value} onChangeText={onChange} {...inputProps} />
      )}
    />
  );
};
