import { useCallback, useEffect, useRef, useState, type ChangeEvent, type CSSProperties } from "react";
import { createPortal } from "react-dom";

export type TChoice<T> = {
	value:      T
	label:      string
	isDisabled: boolean
}

type TDropdownProps<T extends string | number | null> = {
	value:         T
	choices:       TChoice<T>[]
	onChange:      (value: T) => void
	isSearchable?: boolean
	placeholder?:  string
}

const modalContainerEl = document.querySelector("#modal-container")!;

export const Dropdown = <T extends string | number | null>({
	value,
	choices,
	onChange,
	isSearchable = false,
	placeholder,
}: TDropdownProps<T>) => {
	const currentChoice = choices.find(choice => choice.value === value);

	const [hasChangedInputValue, setHasChangedInputValue] = useState(false);

	useEffect(() => {
		setHasChangedInputValue(false);
	}, [value]);

	const getInputValue = useCallback(() => {
		return currentChoice && currentChoice.value !== null
			? String(currentChoice.label)
			: "";
	}, [currentChoice]);

	const [isOpen, setIsOpen] = useState(false);
	const [inputValue, setInputValue] = useState<string>(getInputValue());

	useEffect(() => {
		setInputValue(getInputValue());
	}, [getInputValue]);

	const inputRef = useRef<HTMLInputElement>(null);
	const choicesRef = useRef<HTMLDivElement>(null);

	const [style, setStyle] = useState<CSSProperties>({});

	const toggleIsOpen = () => {
		const nextIsOpen = !isOpen;

		const nextStyle: CSSProperties = {};

		if (nextIsOpen) {
			const choiceOffset = inputRef.current!.clientHeight - window.scrollY;

			nextStyle.top = inputRef.current!.offsetTop + choiceOffset;
			nextStyle.left = inputRef.current!.offsetLeft;
			nextStyle.minWidth = inputRef.current!.clientWidth;
		}

		setStyle(nextStyle);
		setIsOpen(nextIsOpen);
	};

	useEffect(() => {
		const onClick = (event: MouseEvent) => {
			if (!isOpen) {
				return;
			}

			const isInputEl = event.target === inputRef.current;
			const isChoicesEl = choicesRef.current && choicesRef.current.contains(event.target as Node);

			if (!isInputEl && !isChoicesEl) {
				setIsOpen(false);
			}
		};

		window.addEventListener("click", onClick);

		return () => {
			window.removeEventListener("click", onClick);
		};
	}, [isOpen]);

	const isOpenRef = useRef(isOpen);
	useEffect(() => {
		isOpenRef.current = isOpen;

		if (isOpen) {
			document.body.style = "overflow-y: hidden;";
		}

		return () => {
			document.body.style = "overflow-y: initial;";
		};
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

	const onInputChange = isSearchable
		? (event: ChangeEvent<HTMLInputElement>) => {
			setInputValue(event.target.value);
			setHasChangedInputValue(true);
		}
		: undefined;

	const filteredChoices = choices.filter(choice => {
		return choice.label.toLowerCase().includes(inputValue.toLowerCase());
	});

	return (
		<div className="flex flex-col min-w-16">
			<input
				ref={inputRef}
				type="text"
				value={inputValue}
				readOnly={!isSearchable}
				onClick={toggleIsOpen}
				onChange={onInputChange}
				className="shadow bg-violet-200 rounded h-8 px-2 cursor-pointer min-w-16"
				placeholder={placeholder}
			/>
			{
				isOpen
					? (
						createPortal(
							<div
								className="bg-gray-50 rounded absolute shadow-lg overflow-hidden max-h-32 overflow-y-auto"
								style={style}
								ref={choicesRef}
							>
								{
									(hasChangedInputValue ? filteredChoices : choices).map(choice => {
										return (
											<div
												key={choice.value}
												className={`
													h-8
													px-2
													${choice.isDisabled ? "cursor-not-allowed" : `
														hover:bg-violet-200
														cursor-pointer
													`}
													flex
													items-center
													${(!choice.isDisabled && choice.value === value) ? "bg-violet-200" : ""}
													${choice.isDisabled ? "bg-gray-200" : ""}
												`}
												onClick={
													choice.isDisabled
														? undefined
														: () => {
															onChange(choice.value);
															setIsOpen(false);
														}
												}
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