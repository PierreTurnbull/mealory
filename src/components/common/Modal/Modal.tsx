import { useEffect, useRef, type ReactNode } from "react";
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
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const containerEl = containerRef.current!;

		const onKeydown = (event: KeyboardEvent) => {
			if (event.code === "Escape") {
				close();
			}
		};
		const onClick = (event: MouseEvent) => {
			if (event.target === containerEl) {
				close();
			}
		};

		window.addEventListener("keydown", onKeydown);
		containerEl.addEventListener("click", onClick);
		document.body.style = "overflow-y: hidden;";

		return () => {
			window.removeEventListener("keydown", onKeydown);
			containerEl.removeEventListener("click", onClick);
			document.body.style = "overflow-y: initial;";
		};
	}, [close]);

	return createPortal(
		<div
			className="absolute w-full h-full flex justify-center items-center"
			ref={containerRef}
		>
			<div
				className=""
			>
				<Paper>
					<div className="p-4 sm:p-8 max-w-[calc(100vw-10vw)] max-h-[calc(100vh-10vh)] overflow-y-auto">
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
				<div className="absolute top-4 right-4">
					<IconButton
						icon="🗙"
						onClick={close}
					/>
				</div>
			</div>
		</div>,
		modalContainerEl,
	);
};