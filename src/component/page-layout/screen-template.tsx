import React from 'react';

export default function ScreenTemplate({children}: Readonly<{children: React.ReactNode}>): React.ReactNode {

	return <div className={"p-12"}>{children}</div>

}