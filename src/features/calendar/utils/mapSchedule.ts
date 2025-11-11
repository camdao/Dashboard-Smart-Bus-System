import type { CalendarEvent, ScheduleResponse } from '@/features/calendar/types/scheduleTypes';

export function mapScheduleToEvent(schedule: ScheduleResponse): CalendarEvent {
  return {
    id: schedule.scheduleId,
    title: `Lịch #${schedule.scheduleId}`,
    date: schedule.scheduleDate,
    description: `Xe: ${schedule.busId} | Tài xế: ${schedule.driverId} | Tuyến: ${schedule.routerId}\nGiờ: ${schedule.startTime} - ${schedule.endTime}`,
    busId: schedule.busId,
    driverId: schedule.driverId,
    routerId: schedule.routerId,
    startTime: schedule.startTime,
    endTime: schedule.endTime,
  };
}
