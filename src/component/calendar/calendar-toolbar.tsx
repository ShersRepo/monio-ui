import React ,{ useEffect }from 'react';

export function CalendarToolbar({ collapseToolbar }: Readonly<{ collapseToolbar: boolean }>): React.ReactNode {
	const [ isCollapsed, setIsCollapsed ] = React.useState<boolean>(false);

	useEffect(() => {
		setIsCollapsed(collapseToolbar);
	}, [collapseToolbar]);

	return (
		<></>
	)

}