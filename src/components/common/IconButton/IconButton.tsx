type TIconButtonProps = {
	icon:     string
	onClick?: (event: React.MouseEvent) => void
}

export const IconButton = ({
	icon,
	onClick,
}: TIconButtonProps) => {
	const _onClick = (event: React.MouseEvent) => {
		event.preventDefault();
		onClick?.(event);
	};

	return (
		<button
			className={`
				bg-violet-500
				hover:bg-violet-400
				rounded-md
				text-violet-50
				w-8
				h-8
				flex
				justify-center
				items-center
				cursor-pointer
			`}
			onClick={_onClick}
		>
			{icon}
		</button>
	);
};