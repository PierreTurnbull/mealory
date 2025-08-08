type TDatePickerProps = {
	date:    Date
	setDate: (date: Date) => void
}

export const DatePicker = ({
	date,
	setDate,
}: TDatePickerProps) => {
	const formattedDate = new Date(date);
	const timezoneHourOffset = formattedDate.getTimezoneOffset() / 60;
	formattedDate.setHours(-timezoneHourOffset);

	return (
		<input
			className="bg-violet-200 h-8 px-2 rounded"
			type="date"
			value={formattedDate.toISOString().split("T")[0]}
			onChange={event => {
				let nextDate = new Date(event.target.value);
				nextDate = new Date(nextDate.getFullYear(), nextDate.getMonth(), nextDate.getDate());

				setDate(nextDate);
			}}
		/>
	);
};