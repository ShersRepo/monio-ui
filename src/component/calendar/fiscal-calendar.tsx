import React from 'react';
import { CalendarToolbar } from '@/component/calendar/calendar-toolbar';
import Calendar from '@/component/calendar/calendar';

export interface CalendarConfig {
	enableToolbar?: boolean;
}

const DEFAULT_CONFIG: CalendarConfig = {
    enableToolbar: true
}

export default function FiscalCalendar({
    options = DEFAULT_CONFIG,
    collapseToolbar = false,
}: Readonly<{
    options?: CalendarConfig,
    collapseToolbar?: boolean,
}>): React.ReactNode {

	return (
		<div>
		    { options.enableToolbar && <CalendarToolbar collapseToolbar={collapseToolbar}  /> }
		    <Calendar></Calendar>
        </div>
	)
}