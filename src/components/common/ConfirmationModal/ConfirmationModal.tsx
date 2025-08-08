import { Button, type TButtonType } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import { Title } from "../Title/Title";

type TConfirmationModalProps = {
	title:       string
	description: string
	submit:      () => void
	cancel:      () => void
	buttonType?: TButtonType
}

export const ConfirmationModal = ({
	title,
	description,
	submit,
	cancel,
	buttonType = "primary",
}: TConfirmationModalProps) => {
	return (
		<Modal
			close={cancel}
		>
			<div className="space-y-4">
				<Title title={title} />
				<p>{description}</p>
				<div className="flex space-x-4 justify-center">
					<Button
						onClick={submit}
						type={buttonType}
					>
						Confirmer
					</Button>
					<Button
						onClick={cancel}
						type="secondary"
					>
						Annuler
					</Button>
				</div>
			</div>
		</Modal>
	);
};