import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { IconButton } from "../IconButton/IconButton";
import { Paper } from "../Paper/Paper";
import { Title } from "../Title/Title";

type TModalProps = {
	children: ReactNode
	title?:   string
	close:    () => void
}

const modalContainerEl: HTMLDivElement = document.querySelector("#modal-container")!;

export const Modal = ({
	children,
	title,
	close,
}: TModalProps) => {
	useEffect(() => {
		const onKeydown = (event: KeyboardEvent) => {
			if (event.code === "Escape") {
				close();
			}
		};
		const onClick = (event: MouseEvent) => {
			if (event.target === modalContainerEl) {
				close();
			}
		};

		window.addEventListener("keydown", onKeydown);
		modalContainerEl.addEventListener("click", onClick);

		return () => {
			window.removeEventListener("keydown", onKeydown);
			modalContainerEl.removeEventListener("click", onClick);
		};
	}, [close]);

	return createPortal(
		<div>
			<Paper>
				<div className="p-8">
					<div className="absolute top-4 right-4">
						<IconButton
							icon="🗙"
							onClick={close}
						/>
					</div>
					{
						title
							? (
								<Title
									title={title}
									rank="h3"
								/>
							)
							: null
					}
					{children}
				</div>
			</Paper>
		</div>,
		modalContainerEl,
	);
};