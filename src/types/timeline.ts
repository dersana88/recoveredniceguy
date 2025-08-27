export type TimelineOption = 'less-than-24h' | '3-days' | '1-week' | '2-weeks-plus';

export interface TimelineData {
  label: string;
  hours: number;
  recoveryChance: number;
}

export const timelineOptions: Record<TimelineOption, TimelineData> = {
  'less-than-24h': {
    label: 'Less than 24 hours',
    hours: 18,
    recoveryChance: 78
  },
  '3-days': {
    label: "It's been 3 days",
    hours: 72,
    recoveryChance: 67
  },
  '1-week': {
    label: 'A full week',
    hours: 168,
    recoveryChance: 31
  },
  '2-weeks-plus': {
    label: 'Beyond confused (2+ weeks)',
    hours: 336,
    recoveryChance: 12
  }
};