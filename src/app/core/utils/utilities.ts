import { Injectable } from "@angular/core";
// import * as $ from 'jquery';
@Injectable({
  providedIn: 'root'
})
export class Utilities {
  constructor() {
  }
  getRandomInt(max: any) {
    return Math.floor(Math.random() * max);
  }
  base64_decode(encodedData: any) {
    // eslint-disable-line camelcase
    // tslint:disable-next-line:prefer-const
    var b64 =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1;
    var o2;
    var o3;
    var h1;
    var h2;
    var h3;
    var h4;
    var bits;
    var i = 0;
    var ac = 0;
    var dec = "";
    var tmpArr = [];

    if (!encodedData) {
      return encodedData;
    }

    encodedData += "";

    do {
      // unpack four hexets into three octets using index points in b64
      h1 = b64.indexOf(encodedData.charAt(i++));
      h2 = b64.indexOf(encodedData.charAt(i++));
      h3 = b64.indexOf(encodedData.charAt(i++));
      h4 = b64.indexOf(encodedData.charAt(i++));

      bits = (h1 << 18) | (h2 << 12) | (h3 << 6) | h4;

      o1 = (bits >> 16) & 0xff;
      o2 = (bits >> 8) & 0xff;
      o3 = bits & 0xff;

      if (h3 === 64) {
        tmpArr[ac++] = String.fromCharCode(o1);
      } else if (h4 === 64) {
        tmpArr[ac++] = String.fromCharCode(o1, o2);
      } else {
        tmpArr[ac++] = String.fromCharCode(o1, o2, o3);
      }
    } while (i < encodedData.length);

    dec = tmpArr.join("");

    return decodeURIComponent(escape(dec.replace(/\0+$/, "")));
  }
  replaceSpecialCharacters(str: string, replacement: any) {
    return str && str.length
      ? str.replace(/[^a-zA-Z0-9]/g, replacement).toLowerCase()
      : str;
  }
  workingDaysBetweenDates(d0: any, d1: any, holidays: any = []) {

    /* Two working days and an sunday (not working day) */
    // var holidays = ['2016-05-03', '2016-05-05', '2016-05-07'];
    let startDate: any = this.parseDate(d0);
    let endDate: any = this.parseDate(d1);

    // Validate input
    if (endDate < startDate) {
      return 0;
    }

    // Calculate days between dates
    let millisecondsPerDay = 86400 * 1000; // Day in milliseconds
    startDate.setHours(0, 0, 0, 1);  // Start just after midnight
    endDate.setHours(23, 59, 59, 999);  // End just before midnight
    let diff = endDate - startDate;  // Milliseconds between datetime objects
    let days = Math.ceil(diff / millisecondsPerDay);

    // Subtract two weekend days for every week in between
    let weeks = Math.floor(days / 7);
    days -= weeks * 2;

    // Handle special cases
    let startDay = startDate.getDay();
    let endDay = endDate.getDay();

    // Remove weekend not previously removed.
    if (startDay - endDay > 1) {
      days -= 2;
    }
    // Remove start day if span starts on Sunday but ends before Saturday
    if (startDay == 0 && endDay != 6) {
      days--;
    }
    // Remove end day if span ends on Saturday but starts after Sunday
    if (endDay == 6 && startDay != 0) {
      days--;
    }
    /* Here is the code */
    holidays.forEach((day: any) => {
      if ((day >= d0) && (day <= d1)) {
        /* If it is not saturday (6) or sunday (0), substract it */
        if ((this.parseDate(day).getDay() % 6) != 0) {
          days--;
        }
      }
    });
    return days;
  }
  endDateFromDuration(sDate: any, duration: any) {
    let startDate: any = this.parseDate(sDate);
    let edate = new Date(startDate);
    for (let index = 0; index < duration; index++) {
      edate.setDate(startDate.getDate() + index);
      let dy = edate.getDay();
      // Remove start day if span starts on Sunday but ends before Saturday
      if (dy == 0 || dy == 6) {
        duration++;
      }
    }
    return edate;

  }
  parseDate(input: any) {
    // Transform date from text to date
    var parts = input.match(/(\d+)/g);
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  dateDiff(startDt: any, endDt: any) {
    /* Two working days and an sunday (not working day) */
    // var holidays = ['2016-05-03', '2016-05-05', '2016-05-07'];
    let startDate: any = this.parseDate(startDt);
    let endDate: any = this.parseDate(endDt);

    // Validate input
    if (endDate < startDate) {
      return 0;
    }

    // Calculate days between dates
    let millisecondsPerDay = 86400 * 1000; // Day in milliseconds
    // startDate.setHours(0, 0, 0, 1);  // Start just after midnight
    // endDate.setHours(23, 59, 59, 999);  // End just before midnight
    let diff = endDate - startDate;  // Milliseconds between datetime objects
    let days = Math.ceil(diff / millisecondsPerDay);

    return days;
  }

  dateInTwoDigit(date: any) {
    var d = new Date(date);
    date = [
      d.getFullYear(),
      ('0' + (d.getMonth() + 1)).slice(-2),
      ('0' + d.getDate()).slice(-2)
    ].join('-');
    return date;
  };

  days_between(date1: any, date2: any) {

    date1 = new Date(date1.split(" ")[0]);
    date2 = new Date(date2.split(" ")[0]);

    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date1 - date2);

    // Convert back to days and return
    return Math.round(differenceMs / ONE_DAY) + 1;

  }

  date_diff_indays = function (date1: any, date2: any) {
    let dt1 = new Date(date1.split(" ")[0]);
    let dt2 = new Date(date2.split(" ")[0]);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
  }

  dataURItoBlob(dataURI: any) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var binary = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: mimeString });
  }

  getAllOpportunityStatusList() {
    return [
      { value: "Approved", type: 'OPPORTUNITY', className: 'no-job-assigned' },
      { value: "Partial Planning", type: 'PARTIAL_PLANNED', className: 'partial-job-assigned' },
      { value: "Planning", type: 'PLANNED', className: 'all-job-assigned' },
      { value: "Partial Planning Approved", type: 'PARTIAL_EXECUTION', className: 'partial-job-execution' },
      { value: "Planning Approved", type: 'EXECUTION', className: 'all-job-execution' },
      { value: "Partial Execution Complete", type: 'PARTIAL_COMPLETE', className: 'partial-job-complete' },
      { value: "Execution Complete", type: 'COMPLETE', className: 'all-job-complete' },
      { value: "Partial Cancelled", type: 'PARTIAL_CANCEL', className: 'partial-job-cancel' },
      { value: "Cancelled", type: 'CANCEL', className: 'all-job-cancel' },
      { value: "Partial Deferred", type: 'PARTIAL_DEFERRED', className: 'partial-job-deffered' },
      { value: "Deferred", type: 'DEFERRED', className: 'all-job-deffered' }
    ];
  }

  getOpportunityStatus(type: any) {
    let opportunity_status: any = this.getAllOpportunityStatusList();
    let status: any = 'NA';
    opportunity_status.forEach((element: any) => {
      if (element.type === type) {
        status = element.value;
      }
    });
    return status;
  }

  getOpportunityClass(type: any) {
    let opportunity_status: any = this.getAllOpportunityStatusList();
    let className: any = '';
    opportunity_status.forEach((element: any) => {
      if (element.type === type) {
        className = element.className;
      }
    });
    return className;
  }

  getAllLogModuleTypes() {
    return [
      { value: "DASHBOARD" },
      { value: "DASHBOARD_FILTER" },
      { value: "OPPORTUNITY" },
      { value: "OPPORTUNITY TYPE" },
      { value: "UNIT" },
      { value: "UNIT TYPE" },
      { value: "JOB TYPE" },
      { value: "DSIS-SUB-JOBS" }
    ];
  }

  isNumeric(n: any) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  getOppObjective(opp: any) {
    let objectives = opp.objective && opp.objective != null ? opp.objective.split(",") : [];
    let title = '';
    if (objectives.length > 0) {
      this.getOppObjectiveList().forEach(element => {
        if (objectives.includes(element.id.toString())) {
          title += element.name + ', ';
        }
      });
    }
    return title.substring(0, title.length - 2);;
  }

  getOppObjectiveList(data_for = '') {
    let objective = [{ id: 1, name: 'Production Enhancement' }, { id: 0, name: 'Survey' }, { id: 2, name: 'Inj. Enhancement' }];
    if (data_for == 'OFFSHORE') {
      objective[1]['name'] = "Data Acquisition";
    }
    return objective;
  }

  getWellTypeList(isAddPreProducer = true) {
    let well_types = [{ value: "Producer", id: 1, name: "Producer", code: 'P' }, { name: "Injector", value: "Injector", id: 2, code: 'I' }];
    if (isAddPreProducer) {
      well_types.push({ name: "Pre Producer", value: "Pre Producer", id: 3, code: 'PRE' });
    }
    return well_types;
  }

  getCategoryList() {
    return [{ value: "Planned", id: 1 }, { value: "Un-Planned", id: 0 }];
  }

  getCategory(id: any) {
    let categoryList = this.getCategoryList();
    let data: any = 'NA';
    categoryList.forEach(element => {
      if (element.id === parseInt(id)) {
        data = element.value;
      }
    });
    return data;
  }

  getAlsList() {
    return [{ value: "NA", id: 1 }, { value: "Jet Pump", id: 2 }, { value: "ESP", id: 3 }, { value: "PCP", id: 4 }, { value: "Tubing", id: 5 }, { value: "Gas Lift", id: 6 }, { value: "Auto Gas Lift", id: 7 }, { value: "HRP", id: 8 }, { value: "SRP", id: 9 }];
  }

  getAls(id: any) {
    let data: any = 'NA';
    let alsList = this.getAlsList();
    alsList.forEach(element => {
      if (element.id === parseInt(id)) {
        data = element.value;
      }
    });
    return data;
  }

  getImapactList() {
    let impactList = [{ value: "Low", id: 1 }, { value: "Medium", id: 2 }, { value: "High", id: 3 }];
    return impactList;
  }

  getPriorityList() {
    let priorityList = [{ value: "Low", id: 1 }, { value: "Medium", id: 2 }, { value: "High", id: 3 }];
    return priorityList;
  }

  getImpactType(id: any) {
    let impactList = this.getImapactList();
    let data: any = "";
    for (let i = 0; i < impactList.length; i++) {
      if (impactList[i]['id'] == parseInt(id)) {
        return impactList[i].value;
      }
    }
    return data;
  }

  getPriority(id: any) {
    let priorityList = this.getPriorityList();
    let data: any = 'NA';
    priorityList.forEach(element => {
      if (element.id === parseInt(id)) {
        data = element.value;
      }
    });
    return data;
  }

  getWellType(id: any) {
    let wellTypeList = this.getWellTypeList();
    let data: any = 'NA';
    wellTypeList.forEach(element => {
      if (element.id === parseInt(id)) {
        data = element.value;
      }
    });
    return data;
  }

  // openFullscreen(enter_full_screen: any) {
  //   if (enter_full_screen) {
  //     $('.horizontal-menu').css('display', 'none');
  //   } else {
  //     $('.horizontal-menu').css('display', 'block');
  //   }
  // }

  getArrayByKeyFromObjectArr(arr: any, key: any) {
    let data = []
    for (let i = 0; i < arr.length; i++) {
      data.push(arr[i][key]);
    }
    return data;
  }

  formatOppNewDate(date: any) {
    var d = new Date(date),
      month = '' + (d.getMonth()),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = month;
    if (day.length < 2)
      day = '0' + day;
    var months: any = new Array();
    months[0] = "Jan";
    months[1] = "Feb";
    months[2] = "Mar";
    months[3] = "Apr";
    months[4] = "May";
    months[5] = "Jun";
    months[6] = "Jul";
    months[7] = "Aug";
    months[8] = "Sep";
    months[9] = "Oct";
    months[10] = "Nov";
    months[11] = "Dec";
    return [day, months[month], year].join('-');
  }

  formatNewDate(date: any) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = month;
    if (day.length < 2)
      day = '0' + day;
    var months: any = new Array();
    months[0] = "Jan";
    months[1] = "Feb";
    months[2] = "Mar";
    months[3] = "Apr";
    months[4] = "May";
    months[5] = "Jun";
    months[6] = "Jul";
    months[7] = "Aug";
    months[8] = "Sep";
    months[9] = "Oct";
    months[10] = "Nov";
    months[11] = "Dec";
    return [day, months[month], year].join('-');
  }

  prepareOppTitle(OppData: any) {
    let wellTypeCode = '-';
    this.getWellTypeList().forEach(element => {
      if (element.id == OppData.wellType) {
        wellTypeCode = element.code;
      }
    });
    let identification_date: any = OppData.hasOwnProperty('identification_date') ? OppData.identification_date : OppData.identificationDate;
    let title = OppData.title + ' - ' + wellTypeCode + ' - ' + this.formatOppNewDate(identification_date);
    return title;
  }


  lightOrDark(color: any) {

    // Variables for red, green, blue values
    var r, g, b, hsp;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

      // If HEX --> store the red, green, blue values in separate variables
      color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

      r = color[1];
      g = color[2];
      b = color[3];
    }
    else {

      // If RGB --> Convert it to HEX: http://gist.github.com/983661
      color = +("0x" + color.slice(1).replace(
        color.length < 5 && /./g, '$&$&'));

      r = color >> 16;
      g = color >> 8 & 255;
      b = color & 255;
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
      0.299 * (r * r) +
      0.587 * (g * g) +
      0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) {

      return 'light';
    }
    else {

      return 'dark';
    }
  }

  convertDateFormatDDMM(date: any) {
    var months = new Array();
    months[0] = "Jan";
    months[1] = "Feb";
    months[2] = "Mar";
    months[3] = "Apr";
    months[4] = "May";
    months[5] = "Jun";
    months[6] = "Jul";
    months[7] = "Aug";
    months[8] = "Sep";
    months[9] = "Oct";
    months[10] = "Nov";
    months[11] = "Dec";
    return `${date.day}-${months[date.month - 1]}`;
  }


  // convert Json to CSV data in Angular2
  ConvertToCSV(objArray: any) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var row = "";

    for (var index in objArray[0]) {
      //Now convert each value to string and comma-separated
      row += index + ',';
    }
    row = row.slice(0, -1);
    //append Label row with line break
    str += row + '\r\n';

    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (line != '') line += ','

        let value = array[i][index];
        line += typeof value === 'string' ? value.replace(",", " &") : value;
      }
      str += line + '\r\n';
    }
    return str;
  }

  getRangeOfTwoNumbers(low: any, high: any) {
    var list = [];
    for (var i = low; i <= high; i++) {
      list.push(i);
    }
    return list;
  }

  getMonthAndYear() {
    var d = new Date();
    var n = d.getFullYear();
    let year_ranges = this.getRangeOfTwoNumbers(2018, n);
    return { month: { "JAN": 1, "FEB": 2, "MAR": 3, "ARP": 4, "MAY": 5, "JUN": 6, "JUL": 7, "AUG": 8, "SEP": 9, "OCT": 10, "NOV": 11, "DEC": 12 }, year: year_ranges.reverse() }
  }

  toDateStr(year: any, month: any, day: any) {
    if (day < 10)
      day = "0" + day;

    if (month < 10)
      month = "0" + month;

    return year + "-" + month + "-" + day;
  }

  padNumber(number: any) {
    var string = '' + number;
    string = string.length < 2 ? '0' + string : string;
    return string;
  }

  addSubtractDaysInDate(input_date: any, add_days: any, operation = 'ADD') {
    const date = new Date(input_date);
    const next_date = (operation == 'ADD') ? new Date(date.setDate(date.getDate() + add_days)) : new Date(date.setDate(date.getDate() - add_days));
    const formatted = next_date.getUTCFullYear() + '-' + this.padNumber(next_date.getUTCMonth() + 1) + '-' + this.padNumber(next_date.getUTCDate())
    return formatted;
  }

  downloadXLSFile(data: any, file_name: any) {
    const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = file_name;
    document.body.appendChild(link);
    link.click();
  }

  convertNumberInThreeDigit(n: any, length: any) {
    var len = length - ('' + n).length;
    return (len > 0 ? new Array(++len).join('0') : '') + n;
  }

  similar(a: any, b: any) {
    var equivalency = 0;
    var minLength = (a.length > b.length) ? b.length : a.length;
    var maxLength = (a.length < b.length) ? b.length : a.length;
    for (var i = 0; i < minLength; i++) {
      if (a[i] == b[i]) {
        equivalency++;
      }
    }
    var weight = equivalency / maxLength;
    return (weight * 100);
  }

  getRandomColor() {
    var letters = '012345'.split('');
    var color = '#';
    color += letters[Math.round(Math.random() * 5)];
    letters = '0123456789ABCDEF'.split('');
    for (var i = 0; i < 5; i++) {
      color += letters[Math.round(Math.random() * 15)];
    }
    return color;
  }

  reindexArray(array: any) {
    return array.filter(function (val: any) { return val });
  }


  seconds_to_days_hours_mins_secs_str(seconds: any) { // day, h, m and s
    var days = Math.floor(seconds / (24 * 60 * 60));
    seconds -= days * (24 * 60 * 60);
    var hours = Math.floor(seconds / (60 * 60));
    seconds -= hours * (60 * 60);
    var minutes = Math.floor(seconds / (60));
    seconds -= minutes * (60);
    return ((0 < days) ? (days + "d ") : "") + hours + "h " + minutes + "m ";
  }

  pixelsToDuration(pixels: any, dayPixels: any) {
    let secs = 86400.0 * (pixels * 1.0) / dayPixels;
    return this.seconds_to_days_hours_mins_secs_str(secs)
  }

  pixelsToHours(pixels: any, dayPixels: any) {
    let secs = 86400.0 * (pixels * 1.0) / dayPixels;
    return secs / 3600 / 24;
  }

  dayToSec(day: any) {
    return parseFloat(day) * 86400;
  }

  dateDiffInSeconds(dt1: any, dt2: any) {
    dt1 = new Date(dt1);
    dt2 = new Date(dt2);
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    return Math.abs(diff);
  }

  prepareExcel(data: any, fields_mapping: any = null) {
    if (fields_mapping == null) {
      fields_mapping = { "Sr. No": "sr_no", Label: "label", Count: "value" };
    }
    let fields = Object.keys(fields_mapping);
    let excelData = fields.join("\t") + "\n";
    let sr = 0;
    for (let i = 0; i < data.length; i++) {
      sr++;
      let rowData = [sr];
      for (const key in fields_mapping) {
        let val = fields_mapping[key];
        if (val != "sr_no") {
          rowData.push(data[i][val]);
        }
      }
      // rowData = this.filterData(rowData);
      excelData += rowData.join("\t") + "\n";
    }
    return excelData;
  }

  prepareExcelData(data: any, fields_mapping: any) {
    let row_data = [];
    for (let i = 0; i < data['data'].length; i++) {
      let col_map = 'col_' + i;
      let col_name = data['data'][i]['label'];
      fields_mapping[col_name] = col_map;
    }

    for (let i = 0; i < data["label"].length; i++) {
      let obj: any = { label: data["label"][i] };
      for (let j = 0; j < data['data'].length; j++) {
        let col_map = 'col_' + j;
        let col_val = data['data'][j]['data'][i];
        obj[col_map] = col_val;
      }
      row_data.push(obj);
    }
    return { 'data': row_data, 'fields': fields_mapping };
  }

  getChartColorsArray(colors: any) {
    colors = JSON.parse(colors);
    return colors.map(function (value: any) {
      var newValue = value.replace(" ", "");
      if (newValue.indexOf(",") === -1) {
        var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
        if (color) {
          color = color.replace(" ", "");
          return color;
        }
        else return newValue;;
      } else {
        var val = value.split(',');
        if (val.length == 2) {
          var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
          rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
          return rgbaColor;
        } else {
          return newValue;
        }
      }
    });
  }

}
