import type { ChangeEvent } from "react";

type TTextFieldProps = {
	value:    string
	onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const TextField = ({
	value,
	onChange,
}: TTextFieldProps) => {
	return (
		<input
			className="bg-violet-200 h-8 px-2 rounded"
			type="text"
			onChange={onChange}
			value={value}
		/>
	);
};