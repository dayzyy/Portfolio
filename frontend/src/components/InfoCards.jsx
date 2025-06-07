const InfoCards = ({maxWidth, maxHeight, infoItems}) => {
	return (
		<div style={{maxWidth, maxHeight}} className="flex flex-wrap gap-3 overflow-y-scroll overscroll-contain">
			{infoItems.map((item) => {
				return (
					<div className="rounded w-fit p-2 bg-[var(--color-bg-sidebar)] shadow">
						<h4
							key={item}
							className="font-bold text-[var(--color-icon-lang)]"
						>
							{item}
						</h4>
					</div>
				);
			})}
		</div>
	)
}

export default InfoCards
