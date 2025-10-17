'use client';
import { useState } from 'react';
import Dashboard from '@/features/LayoutAdmin/containers/DashboardContainers';
import { css } from '@/styled-system/css';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { createRoot } from 'react-dom/client';

import CalendarAddButton from '../components/CalendarAddButton';
import EventFormDialog from '../components/EventFormDialog';

export default function CalendarFeatures() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState([
    { title: 'Họp tuần', date: '2025-10-17' },
    { title: 'Kiểm tra xe buýt', date: '2025-10-18' },
    { title: 'Bảo trì định kỳ', date: '2025-10-20' },
  ]);

  const handleAddEvent = (element: HTMLElement) => {
    const dayCell = element.closest('.fc-daygrid-day');
    if (dayCell instanceof HTMLElement) {
      const date = dayCell.dataset.date;
      if (date) {
        setSelectedDate(date);
        setIsDialogOpen(true);
      }
    }
  };

  const handleEventSubmit = (eventData: { title: string; description: string }) => {
    const newEvent = {
      title: eventData.title,
      date: selectedDate,
      extendedProps: {
        description: eventData.description,
      },
    };

    setEvents((prevEvents) => [...prevEvents, newEvent]);
    console.log('Saving event:', newEvent);
  };

  return (
    <Dashboard>
      <h1 className={title}>Lịch làm việc</h1>
      <div className={contentBox}>
        <div className={calendarContainer}>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            locale="vi"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,dayGridWeek,dayGridDay',
            }}
            titleFormat={{ year: 'numeric', month: 'long' }}
            buttonText={{ today: 'Hôm nay', month: 'Tháng', week: 'Tuần', day: 'Ngày' }}
            events={events}
            eventContent={(eventInfo) => {
              const wrapper = document.createElement('div');
              wrapper.className = 'event-content';
              wrapper.title = eventInfo.event.extendedProps?.description || '';

              const title = document.createElement('div');
              title.className = 'event-title';
              title.textContent = eventInfo.event.title;

              const delBtn = document.createElement('button');
              delBtn.className = 'event-delete-btn';
              delBtn.type = 'button';
              delBtn.innerHTML = '🗑️';
              delBtn.title = 'Xóa sự kiện';
              delBtn.style.marginLeft = '8px';
              delBtn.style.opacity = '0';
              delBtn.style.transition = 'opacity 0.15s';
              delBtn.onclick = (e) => {
                e.stopPropagation();
                eventInfo.event.remove();
                setEvents((prev) =>
                  prev.filter((ev) => ev.title !== eventInfo.event.title || ev.date !== eventInfo.event.startStr),
                );
              };

              wrapper.appendChild(title);
              wrapper.appendChild(delBtn);

              wrapper.onmouseenter = () => {
                delBtn.style.opacity = '1';
              };
              wrapper.onmouseleave = () => {
                delBtn.style.opacity = '0';
              };

              return { domNodes: [wrapper] };
            }}
            eventClick={(info) => {
              info.jsEvent.preventDefault();
              info.jsEvent.stopPropagation();
              setSelectedDate(info.event.startStr);
              setIsDialogOpen(true);
            }}
            dayCellDidMount={(info) => {
              const el = info.el as HTMLElement;
              if (el.querySelector('.fc-add-btn-container')) return;
              const top = el.querySelector('.fc-daygrid-day-top') ?? el;
              const mount = document.createElement('div');
              mount.className = 'fc-add-btn-container';
              top.appendChild(mount);
              createRoot(el).render(<CalendarAddButton onClick={() => handleAddEvent(el)} />);
            }}
            height="100%"
            firstDay={1}
          />
          s
        </div>
      </div>
      <EventFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleEventSubmit}
        selectedDate={selectedDate}
      />
    </Dashboard>
  );
}
const title = css({
  fontSize: '2xl',
  fontWeight: 'bold',
  color: 'gray.800',
  marginBottom: '24px',
  paddingLeft: '16px',
});

const contentBox = css({
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  backgroundColor: 'gray.50',
  padding: '32px',
  borderRadius: '3xl',
  boxShadow: 'lg',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

const calendarContainer = css({
  height: '800px',
  '& .fc': {
    fontFamily: 'inherit',
    height: '100%',
    maxWidth: '100%',
    backgroundColor: 'white',
    borderRadius: 'xl',
    overflow: 'hidden',
    boxShadow: 'sm',
  },
  '& .fc-toolbar': {
    padding: '20px 24px',
    marginBottom: '0 !important',
    borderBottom: '1px solid',
    borderColor: 'gray.200',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '12px',
    },
  },
  '& .fc-toolbar-title': {
    fontSize: '1.9em !important',
    fontWeight: '700',
    color: 'blue.600',
    padding: '6px 18px',
    background: 'linear-gradient(90deg, rgba(59,130,246,0.08), rgba(99,102,241,0))',
    borderRadius: 'lg',
    textTransform: 'capitalize',
    letterSpacing: '0.3px',
    display: 'inline-block',
    boxShadow: 'inset 0 -2px 0 rgba(59,130,246,0.08)',
  },
  '& .fc-button-primary': {
    backgroundColor: 'blue.500 !important',
    borderColor: 'blue.600 !important',
    padding: '6px 12px',
    fontWeight: 'medium',
    '&:hover': {
      backgroundColor: 'blue.600 !important',
      borderColor: 'blue.700 !important',
    },
    '&:disabled': {
      backgroundColor: 'gray.400 !important',
      borderColor: 'gray.500 !important',
    },
    '&:focus': {
      boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.5) !important',
    },
  },
  '& .fc-button-primary:not(:disabled).fc-button-active': {
    backgroundColor: 'blue.700 !important',
    borderColor: 'blue.800 !important',
  },
  '& .fc-view': {
    padding: '12px',
  },
  '& .fc-scrollgrid': {
    borderColor: 'gray.200 !important',
  },
  '& .fc-scrollgrid td, & .fc-scrollgrid th': {
    borderColor: 'gray.200 !important',
  },
  '& .fc-col-header-cell': {
    padding: '12px 0',
    backgroundColor: 'gray.50',
    '& .fc-col-header-cell-cushion': {
      padding: '8px',
      color: 'gray.700',
      fontWeight: 'semibold',
      textDecoration: 'none',
    },
  },
  '& .fc-daygrid-day': {
    position: 'relative',
    '& .fc-daygrid-day-top': {
      padding: '4px 8px',
      '& .fc-daygrid-day-number': {
        color: 'gray.700',
        textDecoration: 'none',
      },
    },
    '&:hover, &:focus-within': {
      backgroundColor: 'gray.50',
      '& .fc-add-btn': {
        opacity: 1,
        transform: 'scale(1)',
      },
    },
  },
  '& .fc-day-today': {
    backgroundColor: 'blue.50 !important',
    '& .fc-daygrid-day-number': {
      color: 'blue.600 !important',
      fontWeight: 'bold',
    },
  },
  '& .fc-event': {
    backgroundColor: 'blue.500',
    borderColor: 'blue.600',
    borderRadius: '8px',
    padding: '4px 8px',
    margin: '2px 4px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    minHeight: '28px',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      backgroundColor: 'blue.600',
    },
    '& .fc-event-main': {
      color: 'white',
      padding: '2px',
      fontSize: '0.875rem',
      fontWeight: '500',
    },
    '& .event-content': {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      gap: '4px',
      overflow: 'hidden',
    },
    '& .event-title': {
      color: 'white',
      fontWeight: '600',
      fontSize: '0.95em',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      flex: 1,
    },
    '& .event-delete-btn': {
      background: 'none',
      border: 'none',
      color: 'white',
      fontSize: '1em',
      cursor: 'pointer',
      opacity: 0,
      marginLeft: '4px',
      transition: 'opacity 0.15s',
      padding: 0,
      lineHeight: 1,
    },
    '&:hover .event-delete-btn': {
      opacity: 1,
    },
  },
  '& .fc-daygrid-event-harness': {
    marginTop: '4px',
  },
  '& .fc-day-other': {
    backgroundColor: 'gray.50',
    '& .fc-daygrid-day-number': {
      color: 'gray.400',
      opacity: 0.7,
    },
  },
  '& .fc-daygrid-week-number': {
    backgroundColor: 'gray.100',
    color: 'gray.600',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
});
