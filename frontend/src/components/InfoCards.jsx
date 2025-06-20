const InfoCards = ({maxWidth, infoItems}) => {
	return (
		<div style={{maxWidth}} className="flex flex-wrap gap-3 overflow-y-scroll overscroll-contain max-h-[20vh] min-h-[3rem]">
			{infoItems.map((item) => {
				return (
					<div key={item} className="rounded w-fit p-2 bg-[var(--color-bg-sidebar)] shadow">
						<h4
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
