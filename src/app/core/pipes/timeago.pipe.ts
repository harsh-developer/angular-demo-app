import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'timeAgo'
})


export class TimeAgoPipe implements PipeTransform {
  transform(input: any, allowFuture: boolean = false): string {
    const substitute = (
      stringOrFunction: string | ((number: number, dateDifference: number) => string),
      number: number,
      strings: any
    ): string => {
      const string = typeof stringOrFunction === 'function' ? stringOrFunction(number, dateDifference) : stringOrFunction;
      const value = (strings.numbers && strings.numbers[number]) || number;
      return string.replace(/%d/i, value);
    };

    const nowTime = Date.now();
    const date = new Date(input).getTime();
    const dateDifference = nowTime - date;

    const seconds = Math.abs(dateDifference) / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const years = days / 365;

    const strings = {
      prefixAgo: '',
      prefixFromNow: '',
      suffixAgo: 'ago',
      suffixFromNow: 'from now',
      seconds: 'less than a minute',
      minute: 'a minute',
      minutes: '%d minutes',
      hour: 'an hour',
      hours: '%d Hrs',
      day: 'a day',
      days: '%d days',
      month: 'a month',
      months: '%d months',
      year: 'a year',
      years: '%d years'
    };

    let prefix = strings.prefixAgo;
    let suffix = strings.suffixAgo;

    if (allowFuture && dateDifference < 0) {
      prefix = strings.prefixFromNow;
      suffix = strings.suffixFromNow;
    }

    const words =
      seconds < 45 && substitute(strings.seconds, Math.round(seconds), strings) ||
      seconds < 90 && substitute(strings.minute, 1, strings) ||
      minutes < 45 && substitute(strings.minutes, Math.round(minutes), strings) ||
      minutes < 90 && substitute(strings.hour, 1, strings) ||
      hours < 24 && substitute(strings.hours, Math.round(hours), strings) ||
      (days === 1 || days <= 1.5) && substitute(strings.day, 1, strings) ||
      days < 30 && substitute(strings.days, Math.round(days), strings) ||
      days < 45 && substitute(strings.month, 1, strings) ||
      days < 365 && substitute(strings.months, Math.round(days / 30), strings) ||
      years < 1.5 && substitute(strings.year, 1, strings) ||
      substitute(strings.years, Math.round(years), strings);

    return `${prefix} ${words} ${suffix}`;
  }
}
