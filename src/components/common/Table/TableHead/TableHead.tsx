import type { TSortParameters, TTableColumn } from "../table.types";

type TTableHeadProps = {
	columns:         TTableColumn[]
	sortParameters?: TSortParameters | null
	onSort?:         (sortParameters: TSortParameters | null) => void
}

export const TableHead = ({
	columns,
	sortParameters,
	onSort,
}: TTableHeadProps) => {
	const _onSort = onSort
		? (
			key: TTableColumn["key"],
			direction: TSortParameters["sortDirection"] | null,
		) => {
			let nextSortParameters: TSortParameters | null;

			if (direction === null) {
				nextSortParameters = null;
			} else {
				nextSortParameters = {
					sortBy:        key,
					sortDirection: direction,
				};
			}

			onSort(nextSortParameters);
		}
		: null;

	const getSortIcon = (key: TTableColumn["key"]) => {
		if (!sortParameters) return null;

		let sortIcon: string | null = null;

		if (sortParameters.sortBy === key) {
			if (sortParameters.sortDirection === "asc") {
				sortIcon = "↓";
			} else if (sortParameters.sortDirection === "desc") {
				sortIcon = "↑";
			}
		}

		return sortIcon;
	};

	const getNextSortDirection = (key: TTableColumn["key"]) => {
		let nextSortDirection: TSortParameters["sortDirection"] | null;

		if (sortParameters?.sortBy === key) {
			nextSortDirection = sortParameters.sortDirection === "asc" ? "desc" : null;
		} else {
			nextSortDirection = "asc";
		}

		return nextSortDirection;
	};
	return (
		<tr>
			{
				columns.map(column => {
					const sortIcon = getSortIcon(column.key);
					const nextSortDirection = getNextSortDirection(column.key);

					return (
						<th
							className={`
								h-8
								pl-2
								sm:pl-4
								${!column.isSortable ? "pr-2" : ""}
								${!column.isSortable ? "sm:pr-4" : ""}
								rounded
								bg-violet-300
								text-left
								font-bold

								${column.isSortable ? "hover:bg-violet-400" : ""}
								${column.isSortable ? "cursor-pointer" : ""}

								${column.paddingIsDisabled ? "pl-0! sm:pl-0! pr-0! sm:pr-0!" : ""}

								${column.backgroundIsDisabled ? "bg-transparent!" : ""}
							`}
							style={{
								width: column.width,
							}}
							key={column.key}
							onClick={
								column.isSortable && _onSort ? () => _onSort(column.key, nextSortDirection) : undefined
							}
						>
							<div
								className="flex justify-between items-center h-full gap-2"
							>
								{
									column.label
										? (
											<p>
												{column.label}
											</p>
										)
										: null
								}
								{
									// workaround to prevent some weird behaviour related with th and text baseline.
									!column.label && !sortIcon ? <p></p> : null
								}
								<p
									className={`
										text-xl
										leading-none
										aspect-square
										flex
										justify-center
										items-center
										font-bold
										h-full

										${!column.label ? "w-full" : ""}
										${!column.label ? "aspect-auto!" : ""}

										${!column.isSortable ? "hidden" : ""}
									`}
								>
									{sortIcon}
								</p>
							</div>
						</th>
					);
				})
			}
		</tr>
	);
};