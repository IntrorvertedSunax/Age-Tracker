export interface AgeDetail {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const calculatePreciseAge = (birthDate: Date): AgeDetail => {
  const now = new Date();
  
  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();
  let hours = now.getHours() - birthDate.getHours();
  let minutes = now.getMinutes() - birthDate.getMinutes();
  let seconds = now.getSeconds() - birthDate.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    // Get days in the previous month
    const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += previousMonth.getDate();
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  return { years, months, days, hours, minutes, seconds };
};

export const getNextBirthday = (birthDate: Date): Date => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const nextBirthday = new Date(birthDate);
  nextBirthday.setFullYear(currentYear);

  if (nextBirthday < now) {
    nextBirthday.setFullYear(currentYear + 1);
  }
  
  // Set to start of day for cleaner display
  nextBirthday.setHours(0, 0, 0, 0);
  return nextBirthday;
};

export const getLastBirthday = (birthDate: Date): Date => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const lastBirthday = new Date(birthDate);
  lastBirthday.setFullYear(currentYear);

  if (lastBirthday > now) {
    lastBirthday.setFullYear(currentYear - 1);
  }

  lastBirthday.setHours(0, 0, 0, 0);
  return lastBirthday;
};

export const getMilestoneBirthday = (birthDate: Date, age: number): Date => {
  const milestone = new Date(birthDate);
  milestone.setFullYear(birthDate.getFullYear() + age);
  milestone.setHours(0, 0, 0, 0);
  return milestone;
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const getDaysUntil = (targetDate: Date): number => {
  const now = new Date();
  const diffTime = targetDate.getTime() - now.getTime();
  if (diffTime < 0) return 0;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
};

export const getFormattedDurationUntil = (targetDate: Date): string => {
  const now = new Date();
  if (targetDate <= now) return "Passed";

  // Normalize to start of day to calculate calendar difference
  const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endDate = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());

  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  let days = endDate.getDate() - startDate.getDate();

  if (days < 0) {
    // Borrow days from previous month of targetDate
    const prevMonthDate = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
    days += prevMonthDate.getDate();
    months--;
  }

  if (months < 0) {
    months += 12;
    years--;
  }

  const parts: string[] = [];
  
  if (years > 0) {
    parts.push(`${years} ${years === 1 ? 'Year' : 'Years'}`);
  }
  
  if (months > 0) {
    parts.push(`${months} ${months === 1 ? 'Month' : 'Months'}`);
  }
  
  if (days > 0) {
    parts.push(`${days} ${days === 1 ? 'Day' : 'Days'}`);
  }

  if (parts.length === 0) {
    return "Today";
  }

  return parts.join(', ');
};
