import * as moment from "moment";

export class DateFormatProvider {
    public static computeTimeDifference(startTime: string, endTime: string) {
        var actual = moment(startTime);
        var est = moment(endTime);
        var s = moment.duration(est.diff(actual)).asSeconds();
        return Math.ceil(s);
    }
    public static getRunTime(startTime: string, endTime: string) {
        var actual = moment(startTime);
        var end = moment(endTime);
        var s = moment.duration(actual.diff(end)).humanize();
        return s;
    }
    public static parseDuration(date: string) {
        var actual = moment.utc(date);
        var end = moment();
        return moment.duration(actual.diff(end)).humanize();
    }
    public static parseDate(date: string) {
        return moment(date).local().calendar();
    }
    public static parseDateFromUtc(date: string, timeOnly: boolean = false) {
        if (!date)
            return "--:--";
        var mdate = moment.utc(date).local();
        if (timeOnly)
            return mdate.format('h:mm a');
        return mdate.calendar();
    }
}
