import { describe, expect, it } from 'vitest';
import { kisiselIzinPlani } from '../app/converter/time/izinPlani';
import { ymdKey, weekdayOf } from '../app/converter/time/dateMath';
const weekdays = [false, true, true, true, true, true, false];
describe('kişisel izin planı', () => {
  it('finds a four-day July bridge for one leave day', () => {
    const p = kisiselIzinPlani(2027, 1, weekdays, '2027-07-15', '2027-07-18');
    expect(p.enUzun).toMatchObject({ tage: 4, urlaub: 1 });
    expect(p.enUzun!.urlaubstage.map(ymdKey)).toEqual(['2027-07-16']);
  });
  it('does not extend the vacation outside the chosen dates', () => {
    const p = kisiselIzinPlani(2027, 1, weekdays, '2027-07-16', '2027-07-17');
    expect(p.enUzun).toMatchObject({ tage: 2, urlaub: 1 });
    expect(ymdKey(p.enUzun!.von)).toBe('2027-07-16');
    expect(ymdKey(p.enUzun!.bis)).toBe('2027-07-17');
  });
  it('handles a Sunday work schedule and non-holiday vacations', () => {
    const work = [true, false, false, false, false, false, false];
    const p = kisiselIzinPlani(2027, 1, work, '2027-02-01', '2027-02-14');
    expect(p.enUzun).toMatchObject({ tage: 13, urlaub: 1 });
    expect(p.enUzun!.urlaubstage.every(d => weekdayOf(d) === 0)).toBe(true);
  });
  it('charges a half day on Republic Day eve', () => {
    const p = kisiselIzinPlani(2027, 0.5, weekdays, '2027-10-28', '2027-10-31');
    expect(p.enUzun).toMatchObject({ tage: 4, urlaub: 0.5 });
  });
  it('rejects invalid dates, empty schedules and invalid budgets', () => {
    for (const [start, end] of [['2027-02-30', '2027-03-01'], ['2027-03-01', '2027-02-01'], ['2026-12-31', '2027-01-02']])
      expect(kisiselIzinPlani(2027, 7, weekdays, start, end).enUzun).toBeNull();
    expect(kisiselIzinPlani(2027, 7, Array(7).fill(false), '2027-01-01', '2027-12-31').enUzun).toBeNull();
    expect(kisiselIzinPlani(2027, NaN, weekdays, '2027-01-01', '2027-12-31').enUzun).toBeNull();
  });
  it('keeps the budget and selects maximum efficiency', () => {
    const p = kisiselIzinPlani(2027, 7, weekdays, '2027-01-01', '2027-12-31');
    expect(p.enUzun!.urlaub).toBeLessThanOrEqual(7);
    expect(p.enVerimli!.urlaub).toBeLessThanOrEqual(7);
    expect(p.enVerimli!.tage / p.enVerimli!.urlaub).toBeGreaterThanOrEqual(p.enUzun!.tage / p.enUzun!.urlaub);
  });
});
