type TTitleRank = "h1" | "h2" | "h3" | "h4"

type TTitleProps = {
	title:      string
	rank?:      TTitleRank
	className?: string
}

export const Title = ({
	title,
	rank = "h2",
	className,
}: TTitleProps) => {
	const Rank = rank;

	let rankClassNames: string;

	switch (rank) {
		case "h1":
			rankClassNames = `
				text-4xl
				mb-8
			`;
			break;
		case "h2":
			rankClassNames = `
				text-3xl
				mb-8
			`;
			break;
		case "h3":
			rankClassNames = `
				text-2xl
				mb-6
			`;
			break;
		case "h4":
			rankClassNames = `
				text-xl
				mb-4
			`;
			break;
	}

	return (
		<Rank
			className={`
				${rankClassNames}
				font-bold
				${className}
			`}
		>
			{title}
		</Rank>
	);
};