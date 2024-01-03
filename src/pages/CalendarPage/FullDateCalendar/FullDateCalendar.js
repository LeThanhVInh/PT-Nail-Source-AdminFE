import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default function FullDateCalendar() {
  const handleEventClick = (clickInfo) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  };

  const handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView={'dayGridMonth'}
        headerToolbar={{
          start: 'title', // will normally be on the left. if RTL, will be on the right
          center: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
          end: 'prev,next today', // will normally be on the right. if RTL, will be on the left
        }}
        events={[
          { title: 'event 1', date: '2024-01-01' },
          { title: 'event 2', start: '2024-01-07', end: '2024-01-10' },
        ]}
        eventContent={renderEventContent}
        selectable={true}
        eventClick={handleEventClick}
        select={handleDateSelect}
        height="708px"
        eventMinWidth="2000px"
      />
    </>
  );
}
