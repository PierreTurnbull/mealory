import { Button, type ButtonOwnProps } from "@mui/material";
import { Modal } from "../Modal/Modal";
import { Title } from "../Title/Title";

type TConfirmationModalProps = {
	title:       string
	description: string
	submit:      () => void
	cancel:      () => void
	color?:      ButtonOwnProps["color"]
}

export const ConfirmationModal = ({
	title,
	description,
	submit,
	cancel,
	color,
}: TConfirmationModalProps) => {
	return (
		<Modal
			close={cancel}
		>
			<div className="space-y-4">
				<Title title={title} />
				<p>{description}</p>
				<div className="flex gap-2 justify-center">
					<Button
						onClick={submit}
						color={color}
					>
						Confirmer
					</Button>
					<Button
						onClick={cancel}
						color="secondary"
					>
						Annuler
					</Button>
				</div>
			</div>
		</Modal>
	);
};