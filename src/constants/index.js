import {range} from "lodash";
import dayjs from "dayjs";

export const YEARS = range(2000, dayjs().add(1, 'year').format("YYYY")).map(year => ({value: year, label: year}))
export const MONTHS = [
    {
        value: '01',
        label: 'January'
    },
    {
        value: '02',
        label: 'February'
    },
    {
        value: '03',
        label: 'March'
    },
    {
        value: '04',
        label: 'April'
    },
    {
        value: '05',
        label: 'May'
    },
    {
        value: '06',
        label: 'June'
    },
    {
        value: '07',
        label: 'July'
    },
    {
        value: '08',
        label: 'August'
    },
    {
        value: '09',
        label: 'September'
    },
    {
        value: '10',
        label: 'October'
    },
    {
        value: '11',
        label: 'November'
    },
    {
        value: '12',
        label: 'December'
    }
]
export const PER_PAGES = [
    {
        value: 15,
        label: '15'
    },
    {
        value: 25,
        label: '25'
    },
    {
        value: 50,
        label: '50'
    }
]
export const REGIONS = [
    {
        value: 1,
        label: 'Andijon viloyati'
    },
    {
        value: 2,
        label: 'Buxoro viloyati'
    },
    {
        value: 3,
        label: 'Jizzax viloyati'
    },
    {
        value: 4,
        label: 'Qashqadaryo viloyati'
    },
    {
        value: 5,
        label: 'Navoiy viloyati'
    },
    {
        value: 6,
        label: 'Namangan viloyati'
    },
    {
        value: 7,
        label: 'Samarqand viloyati'
    },
    {
        value: 8,
        label: 'Surxandaryo viloyati'
    },
    {
        value: 9,
        label: 'Sirdaryo viloyati'
    },
    {
        value: 10,
        label: 'Toshkent shahri'
    },
    {
        value: 11,
        label: 'Toshkent viloyati'
    },
    {
        value: 12,
        label: 'Farg\'ona viloyati'
    },
    {
        value: 13,
        label: 'Xorazm viloyati'
    },
    {
        value: 14,
        label: 'Qoraqalpog\'iston Respublikasi'
    },
]

export const REPORT_TYPES = {
    patient_general_practitioner_report: 'patient_general_practitioner_report',
    statistical_form_066_report: 'statistical_form_066_report'
}
export const REPORT_TYPE_STATUS = {
    success: 'success',
    failed: 'failed',
    pending: 'pending'
}