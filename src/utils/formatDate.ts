import { format } from 'date-fns';

export const formatDate = (date: Date | number, formatString: string = 'MM/dd/yyyy') => {
  try {
    return format(date, formatString);
  } catch {
    return 'Invalid Date';
  }
};
