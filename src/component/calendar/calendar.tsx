"use client";

import FullCalendar from '@fullcalendar/react';
import { mockFiscalEvents } from '@/component/calendar/model/mock-fiscal-events';
import dayGridPlugin from '@fullcalendar/daygrid';
import rrulePlugin from '@fullcalendar/rrule';
import { EventContentArg } from '@fullcalendar/core';
import { FiscalItem } from '@/component/calendar/model/fiscal-item';
import { Text } from '@chakra-ui/react';
import { clsx } from 'clsx';

const FiscalCalendarItem = ({fiscalEvent}: Readonly<{fiscalEvent: FiscalItem}>): React.ReactNode => {

	return (
		<div className={clsx(
				"rounded cursor-pointer",
				fiscalEvent.expenditure ? 'bg-red-100' : 'bg-green-100'
			)}
		>
			<div className="font-bold text-sm truncate text-gray-700">{fiscalEvent.name}</div>

			<Text color={fiscalEvent.expenditure ? 'red.600' : 'green.600'}>

				{fiscalEvent.expenditure ? '-' : '+'}{fiscalEvent.amount} {fiscalEvent.currency}
			</Text>
		</div>
	);
}

export default function Calendar(): React.ReactNode {
    // Map fiscal items to calendar events
    const calendarEvents = mockFiscalEvents.map(item => ({
        id: item.id,
        title: item.name,
        start: item.dateOfPayment,
        extendedProps: { ...item }
    }));

    // Render custom event content
    const renderEventContent = (eventInfo: EventContentArg) => {
        const { event } = eventInfo;

        return (
            <FiscalCalendarItem fiscalEvent={event.extendedProps as FiscalItem } ></FiscalCalendarItem>
        );
    };

    return (
        <div className="p-4">
            <FullCalendar
            	themeSystem="bootstrap"
                plugins={[dayGridPlugin, rrulePlugin]}
                initialView="dayGridMonth"
                events={calendarEvents}
                eventContent={renderEventContent}
                eventDisplay="auto"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,dayGridWeek'
                }}
                height="auto"
                eventClick={(info) => {
                    console.log('Event clicked:', info.event.extendedProps);
                }}
                eventBackgroundColor={"blue.900"}
            />
        </div>
    );
}