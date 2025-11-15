'use client';
import { useEffect, useState } from 'react';
import Dashboard from '@/features/LayoutAdmin/containers/DashboardContainers';
import { css } from '@/styled-system/css';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { createRoot, type Root } from 'react-dom/client';

import CalendarAddButton from '../components/CalendarAddButton';
import EventFormDialog from '../components/EventFormDialog';
import EventItem from '../components/EventItem';
import { useResourcesQuery } from '../hooks/useResourcesQuery';
import { useSchedule } from '../hooks/useSchedule';
import { type ScheduleRequest } from '../types/scheduleTypes';

export default function CalendarFeatures() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [editingEventId, setEditingEventId] = useState<number | null>(null);

  const { events, loading, createMutation, updateMutation, deleteMutation, useGetScheduleById } = useSchedule();

  const { routes, drivers, buses } = useResourcesQuery();

  const [initialValues, setInitialValues] = useState<{
    routerId: number;
    driverId?: number | null;
    busId: number;
    scheduleDate: string;
    startTime: string;
    endTime: string;
  } | null>(null);

  // ===== CREATE EVENT =====
  const handleCreateEvent = async (eventData: ScheduleRequest) => {
    try {
      await createMutation.mutateAsync(eventData);
      closeDialog();
    } catch (err) {
      console.error('Failed to create schedule:', err);
    }
  };

  // ===== EDIT EVENT =====
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const { data: eventDetail, isLoading: isLoadingDetail } = useGetScheduleById(selectedEventId ?? 0, {
    enabled: selectedEventId !== null,
  });

  useEffect(() => {
    if (eventDetail && selectedEventId) {
      if (!eventDetail.router?.id || !eventDetail.bus?.id) {
        console.error('Missing required schedule details:', eventDetail);
        setSelectedEventId(null);
        return;
      }

      setEditingEventId(selectedEventId);
      setInitialValues({
        routerId: eventDetail.router.id,
        driverId: eventDetail.driver?.id ?? null,
        busId: eventDetail.bus.id,
        scheduleDate: eventDetail.scheduleDate,
        startTime: eventDetail.startTime,
        endTime: eventDetail.endTime,
      });
      setSelectedDate(eventDetail.scheduleDate);
      setIsDialogOpen(true);
      setSelectedEventId(null);
    }
  }, [eventDetail, selectedEventId]);

  const handleEditEvent = (eventId: number) => {
    setSelectedEventId(eventId);
  };

  const handleUpdateEvent = async (eventData: ScheduleRequest) => {
    if (!editingEventId) return;

    try {
      await updateMutation.mutateAsync({ id: editingEventId, data: eventData });
      closeDialog();
    } catch (err) {
      console.error('Failed to update schedule:', err);
    }
  };

  // ===== DELETE EVENT =====
  const handleDeleteEvent = async (eventId: number) => {
    try {
      await deleteMutation.mutateAsync(eventId); 
    } catch (err) {
      console.error('Failed to delete schedule:', err);
    }
  };

  // ===== DIALOG HANDLERS =====
  const openCreateDialog = (date: string) => {
    setSelectedDate(date);
    setInitialValues(null);
    setEditingEventId(null);
    setIsDialogOpen(true);
  };

  const handleEventSubmit = async (eventData: ScheduleRequest) => {
    if (editingEventId) {
      await handleUpdateEvent(eventData);
    } else {
      await handleCreateEvent(eventData);
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingEventId(null);
    setInitialValues(null);
  };

  const fullCalendarEvents = events.map(
    (event: {
      id: number;
      title: string;
      date: string;
      description?: string;
      startTime?: string;
      endTime?: string;
    }) => ({
      id: String(event.id),
      title: event.title,
      date: event.date,
      extendedProps: {
        description: event.description,
        eventId: event.id,
        startTime: event.startTime,
        endTime: event.endTime,
      },
    }),
  );

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
            events={fullCalendarEvents}
            loading={(isLoading) => {
              if (isLoading || loading || isLoadingDetail) {
                console.log('Loading calendar events...');
              }
            }}
            eventContent={(eventInfo) => {
              const container = document.createElement('div');
              container.className = 'fc-event-custom';
              const root = createRoot(container);
              (container as unknown as { __fcRoot?: Root }).__fcRoot = root;

              const eventId = eventInfo.event.extendedProps?.eventId as number | undefined;

              const remove = () => {
                if (eventId) {
                  handleDeleteEvent(eventId);
                }
                eventInfo.event.remove();
              };

              const start = (eventInfo.event.extendedProps?.startTime as string) || '';
              const end = (eventInfo.event.extendedProps?.endTime as string) || '';
              const timeLabel =
                start && end ? `${start.replace(/:00$/, '')} - ${end.replace(/:00$/, '')}` : eventInfo.event.title;

              root.render(
                <EventItem
                  title={timeLabel}
                  description={eventInfo.event.extendedProps?.description}
                  onDelete={remove}
                />,
              );

              return { domNodes: [container] };
            }}
            eventWillUnmount={(info) => {
              const mount = info.el.querySelector('.fc-event-custom') as HTMLElement | null;
              if (mount && document.contains(mount)) {
                const mountEl = mount as HTMLElement & { __fcRoot?: Root };
                const root = mountEl.__fcRoot;
                if (root) {
                  queueMicrotask(() => {
                    try {
                      root.unmount();
                    } catch {
                      // ignore
                    } finally {
                      delete mountEl.__fcRoot;
                    }
                  });
                }
              }
            }}
            eventClick={(info) => {
              info.jsEvent.preventDefault();
              info.jsEvent.stopPropagation();

              const eventId = info.event.extendedProps?.eventId as number | undefined;
              if (eventId) {
                handleEditEvent(eventId);
              } else {
                openCreateDialog(info.event.startStr);
              }
            }}
            dayCellDidMount={(info) => {
              const el = info.el as HTMLElement;
              if (el.querySelector('.fc-add-btn-container')) return;
              const top = el.querySelector('.fc-daygrid-day-top') ?? el;
              const mount = document.createElement('div');
              mount.className = 'fc-add-btn-container';
              top.appendChild(mount);
              const root = createRoot(mount);
              const mountEl = mount as HTMLElement & { __fcRoot?: Root };
              mountEl.__fcRoot = root;
              root.render(
                <CalendarAddButton
                  className="fc-add-btn"
                  onClick={() => {
                    const date = el.dataset.date;
                    if (date) openCreateDialog(date);
                  }}
                />,
              );
            }}
            dayCellWillUnmount={(info) => {
              const el = info.el as HTMLElement;
              const mount = el.querySelector('.fc-add-btn-container') as HTMLElement | null;
              if (mount) {
                const mountEl = mount as HTMLElement & { __fcRoot?: Root };
                const root = mountEl.__fcRoot;
                if (root) {
                  queueMicrotask(() => {
                    try {
                      root.unmount();
                    } catch {
                      // ignore
                    }
                    delete mountEl.__fcRoot;
                  });
                }
              }
            }}
            height="100%"
            firstDay={1}
          />
        </div>
      </div>
      <EventFormDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onSubmit={handleEventSubmit}
        selectedDate={selectedDate}
        initialValues={initialValues}
        isEditing={editingEventId !== null}
        routes={routes.map((r: { id: number; title: string }) => ({ id: r.id, name: r.title }))}
        drivers={drivers.map((d: { id: number; title: string }) => ({ id: d.id, name: d.title }))}
        buses={buses.map((b: { id: number; title: string }) => ({ id: b.id, plate: b.title }))}
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
