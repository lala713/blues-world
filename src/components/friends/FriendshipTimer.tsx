import { useState } from "react";
import { useInterval } from "../../hooks/useInterval";
import { getCalendarDuration } from "../../utils/time";

interface FriendshipTimerProps {
  startDate: string;
}

export const FriendshipTimer = ({ startDate }: FriendshipTimerProps) => {
  const [now, setNow] = useState(new Date());
  const hasStartDate = startDate.trim().length > 0;
  const yearOnly = /^\d{4}$/.test(startDate.trim());
  useInterval(() => {
    if (hasStartDate && !yearOnly) setNow(new Date());
  }, 1000);

  if (!hasStartDate) {
    return <p className="friend-date-pending">Friendship date will be added soon.</p>;
  }

  if (yearOnly) {
    return <p className="friendship-timer">Friends since {startDate}</p>;
  }

  const duration = getCalendarDuration(startDate, now);

  return (
    <p className="friendship-timer" aria-live="polite">
      Friends for {duration.years} years, {duration.months} months, {duration.days} days, {duration.hours} hours,{" "}
      {duration.minutes} minutes, and {duration.seconds} seconds
    </p>
  );
};
