import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export default function validSchedule(schedule) {
  schedule.sort((a, b) => {
    const timeA = dayjs(a[0], 'HH:mm');
    const timeB = dayjs(b[0], 'HH:mm');
    return timeA.diff(timeB, 'second');
  });

  let betweenTime = 1000;
  for (let i = 0; i < schedule.length; i++) {
    const [startTime, duration] = schedule[i];
    for (let j = i + 1; j < schedule.length; j++) {
      const nextStartTime = schedule[j][0];
      betweenTime = dayjs(startTime, 'HH:mm')
        .add(Number(duration), 'second')
        .diff(dayjs(nextStartTime, 'HH:mm'), 'second');
      if (Math.abs(betweenTime) <= 300) {
        return false;
      }
    }
  }
  return true;
}
