import { parseISO, format } from 'date-fns'

export default function Date({ dateString }: { dateString: string }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}

export function formatSeconds(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return (hours > 0) ? `${hours}h ${minutes}m ${remainingSeconds}s` : (minutes > 0) ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
}