type TCheckboxProps = {
	isChecked: boolean
	onChange:  (isChecked: boolean) => void
}

export const Checkbox = ({
	isChecked,
	onChange,
}: TCheckboxProps) => {
	return (
		<div>
			<input
				type="checkbox"
				className="hidden"
			/>
			<div
				className="shadow rounded bg-gray-200 w-6 h-6 leading-none flex justify-center items-center text-xl cursor-pointer"
				onClick={() => {
					onChange(!isChecked);
				}}
			>
				<span>{isChecked ? "✓" : ""}</span>
			</div>
		</div>
	);
};