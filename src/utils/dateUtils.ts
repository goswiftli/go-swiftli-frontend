import { format, parseISO } from 'date-fns';

export const formatDate = (dateString: string = '') => {
  const date = parseISO(dateString);

  const dateTime = format(date, 'M/d/yy - HH:mm');

  const fullDate = format(date, 'd-MMM-yyy');
  return { dateTime, fullDate };
};
