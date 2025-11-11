'use client';
import { useEffect, useState } from 'react';
import Button from '@/components/Button/Button';
import { css } from '@/styled-system/css';

interface RouteOption {
  id: string | number;
  name: string;
}

interface DriverOption {
  id: string | number;
  name: string;
}

interface BusOption {
  id: string | number;
  plate: string;
}

interface EventFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (eventData: {
    routerId: number;
    driverId: number;
    busId: number;
    scheduleDate: string;
    startTime: string;
    endTime: string;
  }) => void | Promise<void>;
  selectedDate: string;
  routes?: RouteOption[];
  drivers?: DriverOption[];
  buses?: BusOption[];
  initialValues?: {
    routerId: number;
    driverId?: number | null;
    busId: number;
    scheduleDate: string; // YYYY-MM-DD
    startTime: string; // HH:mm or HH:mm:ss
    endTime: string; // HH:mm or HH:mm:ss
  } | null;
}

export default function EventFormDialog({
  isOpen,
  onClose,
  onSubmit,
  selectedDate,
  routes = [],
  drivers = [],
  buses = [],
  initialValues = null,
}: EventFormDialogProps) {
  const [routeId, setRouteId] = useState<string | number | ''>('');
  const [driverId, setDriverId] = useState<string | number | ''>('');
  const [busId, setBusId] = useState<string | number | ''>('');
  const [startDateTime, setStartDateTime] = useState<string>('');
  const [endDateTime, setEndDateTime] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    // If editing (initialValues provided) and dialog opened, prefill with those values
    if (initialValues && isOpen) {
      const sRaw = initialValues.startTime || '';
      const eRaw = initialValues.endTime || '';

      const normalizeToHHmm = (raw: string) => {
        if (!raw) return '';
        // raw formats supported: HH:mm:ss, HH:mm, HH
        const hhmmss = raw.match(/^(\d{1,2}):(\d{2}):(\d{2})$/);
        if (hhmmss) return `${hhmmss[1].padStart(2, '0')}:${hhmmss[2]}`;
        const hhmm = raw.match(/^(\d{1,2}):(\d{2})$/);
        if (hhmm) return `${hhmm[1].padStart(2, '0')}:${hhmm[2]}`;
        const hh = raw.match(/^(\d{1,2})$/);
        if (hh) return `${hh[1].padStart(2, '0')}:00`;
        return '';
      };

      const s = normalizeToHHmm(sRaw);
      const e = normalizeToHHmm(eRaw);

      // Ensure datetime-local receives YYYY-MM-DDTHH:mm
      setStartDateTime(s ? `${initialValues.scheduleDate}T${s}` : '');
      setEndDateTime(e ? `${initialValues.scheduleDate}T${e}` : '');
      setRouteId(String(initialValues.routerId));
      setBusId(String(initialValues.busId));
      setDriverId(String(initialValues.driverId));
      return;
    }

    if (selectedDate) {
      const defaultStart = `${selectedDate}T09:00`;
      const defaultEnd = `${selectedDate}T10:00`;
      setStartDateTime(defaultStart);
      setEndDateTime(defaultEnd);
    }
  }, [selectedDate, initialValues, isOpen, routes, drivers, buses]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate required fields
    if (!routeId || !driverId || !busId) {
      setError('Vui lòng chọn đầy đủ thông tin: Tuyến đường, Tài xế và Xe buýt.');
      return;
    }

    if (!startDateTime || !endDateTime) {
      setError('Vui lòng chọn thời gian bắt đầu và kết thúc.');
      return;
    }

    if (startDateTime && endDateTime && startDateTime > endDateTime) {
      setError('Ngày/giờ bắt đầu phải nhỏ hơn hoặc bằng ngày/giờ kết thúc.');
      return;
    }

    // Extract date and time
    const scheduleDate = startDateTime.split('T')[0]; // YYYY-MM-DD
    const startTime = startDateTime.split('T')[1]; // HH:mm
    const endTime = endDateTime.split('T')[1]; // HH:mm

    onSubmit({
      routerId: Number(routeId),
      driverId: Number(driverId),
      busId: Number(busId),
      scheduleDate,
      startTime,
      endTime,
    });

    setRouteId('');
    setDriverId('');
    setBusId('');
    setStartDateTime(selectedDate ? `${selectedDate}T09:00` : '');
    setEndDateTime(selectedDate ? `${selectedDate}T10:00` : '');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={overlay}>
      <div className={modal}>
        <h2 className={modalTitle}>Thêm lịch trình mới</h2>
        <p className={dateText}>Ngày: {selectedDate}</p>

        <form onSubmit={handleSubmit}>
          <div className={formGroup}>
            <label htmlFor="route" className={label}>
              Tuyến đường
            </label>
            <select id="route" value={routeId} onChange={(e) => setRouteId(e.target.value)} className={select}>
              <option value="">-- Chọn tuyến --</option>
              {routes.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div className={twoColumn}>
            <div className={formGroup}>
              <label htmlFor="driver" className={label}>
                Tài xế
              </label>
              <select id="driver" value={driverId} onChange={(e) => setDriverId(e.target.value)} className={select}>
                <option value="">-- Chọn tài xế --</option>
                {drivers.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={formGroup}>
              <label htmlFor="bus" className={label}>
                Xe buýt
              </label>
              <select id="bus" value={busId} onChange={(e) => setBusId(e.target.value)} className={select}>
                <option value="">-- Chọn xe --</option>
                {buses.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.plate}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={twoColumn}>
            <div className={formGroup}>
              <label htmlFor="start" className={label}>
                Ngày/giờ bắt đầu
              </label>
              <input
                id="start"
                type="datetime-local"
                value={startDateTime}
                onChange={(e) => setStartDateTime(e.target.value)}
                className={input}
              />
            </div>

            <div className={formGroup}>
              <label htmlFor="end" className={label}>
                Ngày/giờ kết thúc
              </label>
              <input
                id="end"
                type="datetime-local"
                value={endDateTime}
                onChange={(e) => setEndDateTime(e.target.value)}
                className={input}
              />
            </div>
          </div>

          {error && <p className={errorText}>{error}</p>}

          <div className={buttonGroup}>
            <Button variant="secondary" size="small" onClick={onClose} type="button">
              Hủy
            </Button>
            <Button variant="primary" size="small" type="submit">
              Lưu
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

const overlay = css({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
});

const modal = css({
  backgroundColor: 'white',
  padding: '28px',
  borderRadius: '16px',
  width: '90%',
  maxWidth: '540px',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
});

const modalTitle = css({
  fontSize: '20px',
  fontWeight: '600',
  marginBottom: '8px',
  color: 'gray.900',
  letterSpacing: '-0.01em',
});

const dateText = css({
  marginBottom: '24px',
  fontSize: '14px',
  color: 'gray.500',
  fontWeight: '500',
});

const formGroup = css({
  marginBottom: '20px',
});

const label = css({
  display: 'block',
  marginBottom: '8px',
  color: 'gray.700',
  fontSize: '14px',
  fontWeight: '500',
});

const input = css({
  width: '100%',
  padding: '10px 14px',
  border: '1.5px solid',
  borderColor: 'gray.300',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '400',
  transition: 'all 0.2s ease',
  '&:focus': {
    outline: 'none',
    borderColor: 'blue.500',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
  },
});

const select = css({
  width: '100%',
  padding: '10px 14px',
  border: '1.5px solid',
  borderColor: 'gray.300',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '400',
  backgroundColor: 'white',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:focus': {
    outline: 'none',
    borderColor: 'blue.500',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
  },
});

const twoColumn = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
});

const buttonGroup = css({
  display: 'flex',
  justifyContent: 'center',
  gap: '12px',
  paddingTop: '20px',
});

const errorText = css({
  color: 'red.600',
  marginTop: '12px',
  fontSize: '13px',
  fontWeight: '500',
  padding: '10px 14px',
  backgroundColor: 'red.50',
  borderRadius: '8px',
  border: '1px solid',
  borderColor: 'red.200',
});
