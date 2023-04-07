export class TimeFormatter {
  static HOUR_MINUTES = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  })
}
