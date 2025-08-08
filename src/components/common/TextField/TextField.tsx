import type { ChangeEvent } from "react";

type TInputType = "text" | "number"

type TTextFieldProps = {
	value:        string
	onChange:     (event: ChangeEvent<HTMLInputElement>) => void
	placeholder?: string
	type?:        TInputType
	min?:         number
	max?:         number
	className?:   string
}

export const TextField = ({
	value,
	onChange,
	placeholder,
	type = "text",
	min,
	max,
	className,
}: TTextFieldProps) => {
	return (
		<input
			className={`
				shadow
				bg-violet-200
				h-8
				px-2
				rounded
				min-w-16
				${className}
			`}
			type={type}
			onChange={onChange}
			value={value}
			placeholder={placeholder}
			min={min}
			max={max}
		/>
	);
};