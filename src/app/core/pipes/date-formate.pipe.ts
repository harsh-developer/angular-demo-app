/**
 * A custom Angular pipe that formats a given input date string into a specific date format.
 * @param {string} inputDate - The input date string to be formatted.
 * @returns {string} The formatted date string in the format "DD MMM DDD".
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(inputDate: string): string {
    const date = new Date(inputDate);

    const day = this.formatDay(date);
    const month = this.formatMonth(date);
    const weekday = this.formatWeekday(date);

    return `${day} ${month} ${weekday}`;
  }

  /**
   * Formats the day of the month from a given date.
   * @param {Date} date - The date object to extract the day from.
   * @returns {string} The formatted day of the month.
   */
  private formatDay(date: Date): string {
    const dayOfMonth = date.getDate();
    return dayOfMonth < 10 ? `0${dayOfMonth}` : `${dayOfMonth}`;
  }

  /**
   * Formats the month of a given date into a three-letter abbreviation.
   * @param {Date} date - The date object to format.
   * @returns {string} The three-letter abbreviation of the month.
   */
  private formatMonth(date: Date): string {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return months[date.getMonth()];
  }

  /**
   * Formats the weekday of a given date into a three-letter abbreviation.
   * @param {Date} date - The date to format.
   * @returns {string} The formatted weekday abbreviation.
   */
  private formatWeekday(date: Date): string {
    const weekdays = [
      'Sun', 'Mon', 'Tue', 'Wed',
      'Thu', 'Fri', 'Sat'
    ];
    return weekdays[date.getDay()];
  }


}
