import HelpIcon from "@mui/icons-material/Help";
import { Tooltip } from "@mui/material";
import { useState } from "react";

type THelperIconProps = {
	text: string
}

export const HelperIcon = ({
	text,
}: THelperIconProps) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Tooltip
			open={isOpen}
			onClick={() => setIsOpen(prev => !prev)}
			onClose={() => setIsOpen(false)}
			title={text}
			leaveTouchDelay={0}
		>
			<HelpIcon
				className="text-[16px]! cursor-pointer"
				onClick={() => setIsOpen(true)}
			/>
		</Tooltip>
	);
};