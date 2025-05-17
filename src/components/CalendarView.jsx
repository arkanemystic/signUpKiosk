import React from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const CalendarView = ({ events, onEventClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,timeGridDay'
        }}
        events={events}
        eventClick={onEventClick}
        height="auto"
        aspectRatio={1.5}
        allDaySlot={false}
        slotMinTime="08:00:00"
        slotMaxTime="21:00:00"
        firstDay={1}
        navLinks={true}
        nowIndicator={true}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: 'short'
        }}
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }}
      />
    </div>
  );
};

export default CalendarView;