import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";

export type TChoice<T> = {
	value: T
	label: string
}

type TDropdownProps<T extends string | number> = {
	value:    T
	choices:  TChoice<T>[]
	onChange: (value: T) => void
}

const modalContainerEl = document.querySelector("#modal-container")!;

export const Dropdown = <T extends string | number>({
	value,
	choices,
	onChange,
}: TDropdownProps<T>) => {
	const [isOpen, setIsOpen] = useState(false);

	const inputRef = useRef<HTMLInputElement>(null);

	const [style, setStyle] = useState<CSSProperties>({});

	const toggleIsOpen = () => {
		const nextIsOpen = !isOpen;

		const nextStyle: CSSProperties = {};

		if (nextIsOpen) {
			const index = choices.findIndex(choice => choice.value === value);
			const choiceOffset = index * inputRef.current!.clientHeight;

			nextStyle.top = inputRef.current!.offsetTop - choiceOffset;
			nextStyle.left = inputRef.current!.offsetLeft;
			nextStyle.minWidth = inputRef.current!.clientWidth;
		}

		setStyle(nextStyle);
		setIsOpen(nextIsOpen);
	};

	const isOpenRef = useRef(isOpen);
	useEffect(() => {
		isOpenRef.current = isOpen;
	}, [isOpen]);

	useEffect(() => {
		const onKeydown = (event: KeyboardEvent) => {
			if (event.code === "Escape" && isOpenRef.current) {
				setIsOpen(false);
				event.stopImmediatePropagation();
			}
		};
		window.addEventListener("keydown", onKeydown);

		return () => {
			window.removeEventListener("keydown", onKeydown);
		};
	}, []);

	return (
		<div className="flex flex-col">
			<input
				ref={inputRef}
				type="text"
				value={choices.find(choice => choice.value === value)!.label}
				readOnly
				onClick={toggleIsOpen}
				className="bg-violet-200 rounded h-8 px-2 cursor-pointer"
			/>
			{
				isOpen
					? (
						createPortal(
							<div
								className="bg-gray-50 rounded absolute shadow-lg overflow-hidden"
								style={style}
							>
								{
									choices.map(choice => {
										return (
											<div
												key={choice.value}
												className="h-8 px-2 cursor-pointer hover:bg-violet-200 flex items-center"
												onClick={() => {
													onChange(choice.value);
													setIsOpen(false);
												}}
											>
												{choice.label}
											</div>
										);
									})
								}
							</div>,
							modalContainerEl,
						)
					)
					: null
			}
		</div>
	);
};