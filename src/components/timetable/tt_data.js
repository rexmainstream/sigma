import React, { useEffect, useState } from 'react';

// For tt_countdown && tt_daily
// Will be replaced with api data later on
const daily_information = { "status": "OK", "date": "2022-04-27", "bells": [{ "period": "0", "startTime": "08:00", "endTime": "09:00", "type": "O", "time": "08:00", "bell": "0", "bellDisplay": "Period 0" }, { "period": "RC", "startTime": "09:00", "endTime": "09:05", "type": "O", "time": "09:00", "bell": "RC", "bellDisplay": "Roll Call" }, { "period": "1", "startTime": "09:05", "endTime": "10:05", "type": "T", "time": "09:05", "bell": "1", "bellDisplay": "Period 1" }, { "period": "2", "startTime": "10:10", "endTime": "11:10", "type": "T", "time": "10:10", "bell": "2", "bellDisplay": "Period 2" }, { "period": "R", "startTime": "11:10", "endTime": "11:30", "type": "R", "time": "11:10", "bell": "R", "bellDisplay": "Recess" }, { "period": "3", "startTime": "11:30", "endTime": "12:30", "type": "T", "time": "11:30", "bell": "3", "bellDisplay": "Period 3" }, { "period": "WFL1", "startTime": "12:30", "endTime": "12:50", "type": "R", "time": "12:30", "bell": "WFL1", "bellDisplay": "Lunch 1" }, { "period": "WFL2", "startTime": "12:50", "endTime": "13:10", "type": "R", "time": "12:50", "bell": "WFL2", "bellDisplay": "Lunch 2" }, { "period": "4", "startTime": "13:10", "endTime": "14:10", "type": "T", "time": "13:10", "bell": "4", "bellDisplay": "Period 4" }, { "period": "5", "startTime": "14:15", "endTime": "15:15", "type": "T", "time": "14:15", "bell": "5", "bellDisplay": "Period 5" }, { "period": "EoD", "startTime": "15:15", "endTime": null, "type": "O", "time": "15:15", "bell": "EoD", "bellDisplay": "End of Day" }], "timetable": { "timetable": { "dayname": "WedB", "routine": "0,RC,1,2,R,3,WFL1,WFL2,4,5", "rollcall": { "title": "RC 12F", "teacher": "GENM", "room": null }, "periods": { "0": { "title": "MX2 A7", "teacher": "PARP", "room": "104", "fullTeacher": "P Parker", "year": "12" }, "1": { "title": "EST A3", "teacher": "GIFR", "room": "505", "fullTeacher": "R Gifford", "year": "12" }, "2": { "title": "SDD A1", "teacher": "DAMR", "room": "504", "fullTeacher": "R Dam", "year": "12" }, "3": { "title": "ENA J5", "teacher": "HOWR", "room": "209", "fullTeacher": "R Howland", "year": "12" }, "4": { "title": "SP 12", "teacher": null, "room": null, "fullTeacher": "", "year": "12" }, "5": { "title": "SP 12", "teacher": null, "room": null, "fullTeacher": "", "year": "12" }, "RC": { "title": "RC 12F", "teacher": "GENM", "room": null } }, "dayNumber": "8" }, "subjects": { "12EST A3": { "title": "12 Engineering Studies A3", "shortTitle": "EST A3", "teacher": "GIFR", "subject": "Engineering Studies Yr12", "fullTeacher": "R Gifford", "year": "12", "colour": "448ae6" }, "12MAA A2": { "title": "12 Mathematics Advanced A2", "shortTitle": "MAA A2", "teacher": "PARP", "subject": "Mathematics Advanced Yr12", "fullTeacher": "P Parker", "year": "12", "colour": "dc5221" }, "12SP 12": { "title": "12 Sport 12", "shortTitle": "SP 12", "teacher": null, "subject": "Sport Yr12", "fullTeacher": "", "year": "12", "colour": "7f5252" }, "12SDD A1": { "title": "12 Software Design & Development A1", "shortTitle": "SDD A1", "teacher": "DAMR", "subject": "Software Design & Development Yr12", "fullTeacher": "R Dam", "year": "12", "colour": "448ae6" }, "12MX2 A7": { "title": "12 Mathematics Extension 2 A7", "shortTitle": "MX2 A7", "teacher": "PARP", "subject": "Mathematics Extension 2 Yr12", "fullTeacher": "P Parker", "year": "12", "colour": "dc5221" }, "12YA EFT": { "title": "12 Year EFT", "shortTitle": "YA EFT", "teacher": "COOJ", "subject": "Year Adviser", "fullTeacher": "J Cook", "year": "12", "colour": "c0c0c0" }, "12MAX A6": { "title": "12 Mathematics Extension 1 A6", "shortTitle": "MAX A6", "teacher": "PARP", "subject": "Mathematics Extension 1 Yr12", "fullTeacher": "P Parker", "year": "12", "colour": "dc5221" }, "12ENA J5": { "title": "12 English Advanced J5", "shortTitle": "ENA J5", "teacher": "HOWR", "subject": "English Advanced Yr12", "fullTeacher": "R Howland", "year": "12", "colour": "ffd718" }, "12ACC A0": { "title": "12 ACCELERATED COURSES COMPLETED A0", "shortTitle": "ACC A0", "teacher": null, "subject": "ACCELERATED COURSES COMPLETED Yr12", "fullTeacher": "", "year": "12", "colour": "000000" } } }, "roomVariations": [], "classVariations": [], "serverTimezone": "36000", "shouldDisplayVariations": true }


// For tt_weekly
// Will be replaced with api data later on
const weekly_information = { "student": { "surname": "LIM", "givenname": "Terence", "gender": "M", "DOB": null, "roll": "RC.12F", "BoSNumber": "35074120", "year": "12", "years": ["12"], "studentId": "436606222" }, "subjects": [{ "title": "12 Engineering Studies A3", "shortTitle": "EST A3", "teacher": "GIFR", "subject": "Engineering Studies Yr12", "fullTeacher": "R Gifford", "year": "12", "colour": "448ae6" }, { "title": "12 Mathematics Advanced A2", "shortTitle": "MAA A2", "teacher": "PARP", "subject": "Mathematics Advanced Yr12", "fullTeacher": "P Parker", "year": "12", "colour": "dc5221" }, { "title": "12 Sport 12", "shortTitle": "SP 12", "teacher": null, "subject": "Sport Yr12", "fullTeacher": "", "year": "12", "colour": "7f5252" }, { "title": "12 Software Design & Development A1", "shortTitle": "SDD A1", "teacher": "DAMR", "subject": "Software Design & Development Yr12", "fullTeacher": "R Dam", "year": "12", "colour": "448ae6" }, { "title": "12 Mathematics Extension 2 A7", "shortTitle": "MX2 A7", "teacher": "PARP", "subject": "Mathematics Extension 2 Yr12", "fullTeacher": "P Parker", "year": "12", "colour": "dc5221" }, { "title": "12 Year EFT", "shortTitle": "YA EFT", "teacher": "COOJ", "subject": "Year Adviser", "fullTeacher": "J Cook", "year": "12", "colour": "c0c0c0" }, { "title": "12 Mathematics Extension 1 A6", "shortTitle": "MAX A6", "teacher": "PARP", "subject": "Mathematics Extension 1 Yr12", "fullTeacher": "P Parker", "year": "12", "colour": "dc5221" }, { "title": "12 English Advanced J5", "shortTitle": "ENA J5", "teacher": "HOWR", "subject": "English Advanced Yr12", "fullTeacher": "R Howland", "year": "12", "colour": "ffd718" }, { "title": "12 ACCELERATED COURSES COMPLETED A0", "shortTitle": "ACC A0", "teacher": null, "subject": "ACCELERATED COURSES COMPLETED Yr12", "fullTeacher": "", "year": "12", "colour": "000000" }], "days": { "1": { "dayname": "MonA", "routine": "0,RC,1,2,R,3,4,MTL1,MTL2,5", "rollcall": { "title": "RC 12F", "teacher": "GENM", "room": null }, "periods": { "1": { "title": "MAX A6", "teacher": "PARP", "room": "104", "fullTeacher": "P Parker", "year": "12" }, "2": { "title": "ENA J5", "teacher": "HOWR", "room": "209", "fullTeacher": "R Howland", "year": "12" }, "3": { "title": "EST A3", "teacher": "GIFR", "room": "505", "fullTeacher": "R Gifford", "year": "12" }, "4": { "title": "SDD A1", "teacher": "DAMR", "room": "504", "fullTeacher": "R Dam", "year": "12" }, "5": { "title": "MAA A2", "teacher": "PARP", "room": "104", "fullTeacher": "P Parker", "year": "12" } }, "dayNumber": "1" }, "2": { "dayname": "TueA", "routine": "0,RC,1,2,R,3,4,MTL1,MTL2,5", "rollcall": { "title": "RC 12F", "teacher": "GENM", "room": null }, "periods": { "3": { "title": "EST A3", "teacher": "GIFR", "room": "505", "fullTeacher": "R Gifford", "year": "12" }, "4": { "title": "MAA A2", "teacher": "PARP", "room": "104", "fullTeacher": "P Parker", "year": "12" }, "5": { "title": "ENA J5", "teacher": "HOWR", "room": "209", "fullTeacher": "R Howland", "year": "12" } }, "dayNumber": "2" }, "3": { "dayname": "WedA", "routine": "0,RC,1,2,R,3,WFL1,WFL2,4,5", "rollcall": { "title": "RC 12F", "teacher": "GENM", "room": null }, "periods": { "0": { "title": "MX2 A7", "teacher": "PARP", "room": "104", "fullTeacher": "P Parker", "year": "12" }, "1": { "title": "SDD A1", "teacher": "DAMR", "room": "504", "fullTeacher": "R Dam", "year": "12" }, "3": { "title": "ENA J5", "teacher": "HOWR", "room": "209", "fullTeacher": "R Howland", "year": "12" }, "4": { "title": "SP 12", "teacher": null, "room": null, "fullTeacher": "", "year": "12" }, "5": { "title": "SP 12", "teacher": null, "room": null, "fullTeacher": "", "year": "12" } }, "dayNumber": "3" }, "4": { "dayname": "ThuA", "routine": "0,RC,1,2,R,3,WFL1,WFL2,4,5", "rollcall": { "title": "RC 12F", "teacher": "GENM", "room": null }, "periods": { "0": { "title": "MX2 A7", "teacher": "PARP", "room": "104", "fullTeacher": "P Parker", "year": "12" }, "2": { "title": "SDD A1", "teacher": "DAMR", "room": "504", "fullTeacher": "R Dam", "year": "12" }, "3": { "title": "EST A3", "teacher": "GIFR", "room": "505", "fullTeacher": "R Gifford", "year": "12" } }, "dayNumber": "4" }, "5": { "dayname": "FriA", "routine": "0,RC,1,2,R,3,WFL1,WFL2,4,5", "rollcall": { "title": "RC 12F", "teacher": "GENM", "room": null }, "periods": { "1": { "title": "MAA A2", "teacher": "PARP", "room": "104", "fullTeacher": "P Parker", "year": "12" }, "3": { "title": "MAX A6", "teacher": "PARP", "room": "104", "fullTeacher": "P Parker", "year": "12" }, "4": { "title": "EST A3", "teacher": "GIFR", "room": "505", "fullTeacher": "R Gifford", "year": "12" }, "5": { "title": "SDD A1", "teacher": "DAMR", "room": "504", "fullTeacher": "R Dam", "year": "12" } }, "dayNumber": "5" }, "6": { "dayname": "MonB", "routine": "0,RC,1,2,R,3,4,MTL1,MTL2,5", "rollcall": { "title": "RC 12F", "teacher": "GENM", "room": null }, "periods": { "1": { "title": "MAX A6", "teacher": "PARP", "room": "104", "fullTeacher": "P Parker", "year": "12" }, "2": { "title": "SDD A1", "teacher": "DAMR", "room": "504", "fullTeacher": "R Dam", "year": "12" }, "3": { "title": "EST A3", "teacher": "GIFR", "room": "505", "fullTeacher": "R Gifford", "year": "12" }, "4": { "title": "ENA J5", "teacher": "HOWR", "room": "209", "fullTeacher": "R Howland", "year": "12" }, "5": { "title": "MAA A2", "teacher": "PARP", "room": "104", "fullTeacher": "P Parker", "year": "12" } }, "dayNumber": "6" }, "7": { "dayname": "TueB", "routine": "0,RC,1,2,R,3,4,MTL1,MTL2,5", "rollcall": { "title": "RC 12F", "teacher": "GENM", "room": null }, "periods": { "2": { "title": "MAA A2", "teacher": "PARP", "room": "104", "fullTeacher": "P Parker", "year": "12" }, "3": { "title": "EST A3", "teacher": "GIFR", "room": "505", "fullTeacher": "R Gifford", "year": "12" }, "4": { "title": "ENA J5", "teacher": "HOWR", "room": "209", "fullTeacher": "R Howland", "year": "12" } }, "dayNumber": "7" }, "8": { "dayname": "WedB", "routine": "0,RC,1,2,R,3,WFL1,WFL2,4,5", "rollcall": { "title": "RC 12F", "teacher": "GENM", "room": null }, "periods": [{ "title": "MX2 A7", "teacher": "PARP", "room": "104", "fullTeacher": "P Parker", "year": "12" }, { "title": "EST A3", "teacher": "GIFR", "room": "505", "fullTeacher": "R Gifford", "year": "12" }, { "title": "SDD A1", "teacher": "DAMR", "room": "504", "fullTeacher": "R Dam", "year": "12" }, { "title": "ENA J5", "teacher": "HOWR", "room": "209", "fullTeacher": "R Howland", "year": "12" }, { "title": "SP 12", "teacher": null, "room": null, "fullTeacher": "", "year": "12" }, { "title": "SP 12", "teacher": null, "room": null, "fullTeacher": "", "year": "12" }], "dayNumber": "8" }, "9": { "dayname": "ThuB", "routine": "0,RC,1,2,R,3,WFL1,WFL2,4,5", "rollcall": { "title": "RC 12F", "teacher": "GENM", "room": null }, "periods": { "0": { "title": "MX2 A7", "teacher": "PARP", "room": "104", "fullTeacher": "P Parker", "year": "12" }, "2": { "title": "SDD A1", "teacher": "DAMR", "room": "504", "fullTeacher": "R Dam", "year": "12" }, "3": { "title": "MAA A2", "teacher": "PARP", "room": "104", "fullTeacher": "P Parker", "year": "12" } }, "dayNumber": "9" }, "10": { "dayname": "FriB", "routine": "0,RC,1,2,R,3,WFL1,WFL2,4,5", "rollcall": { "title": "RC 12F", "teacher": "GENM", "room": null }, "periods": { "1": { "title": "MAA A2", "teacher": "PARP", "room": "104", "fullTeacher": "P Parker", "year": "12" }, "2": { "title": "SDD A1", "teacher": "DAMR", "room": "504", "fullTeacher": "R Dam", "year": "12" }, "3": { "title": "EST A3", "teacher": "GIFR", "room": "505", "fullTeacher": "R Gifford", "year": "12" }, "5": { "title": "ENA J5", "teacher": "HOWR", "room": "209", "fullTeacher": "R Howland", "year": "12" } }, "dayNumber": "10" }, "11": { "dayname": "MonC", "routine": "0,RC,1,2,R,3,4,MTL1,MTL2,5", "rollcall": { "title": "RC 12F", "teacher": "GENM", "room": null }, "periods": { "1": { "title": "MAX A6", "teacher": "PARP", "room": "104", "fullTeacher": "P Parker", "year": "12" }, "2": { "title": "EST A3", "teacher": "GIFR", "room": "505", "fullTeacher": "R Gifford", "year": "12" }, "3": { "title": "ENA J5", "teacher": "HOWR", "room": "209", "fullTeacher": "R Howland", "year": "12" }, "4": { "title": "MAA A2", "teacher": "PARP", "room": "104", "fullTeacher": "P Parker", "year": "12" }, "5": { "title": "SDD A1", "teacher": "DAMR", "room": "504", "fullTeacher": "R Dam", "year": "12" } }, "dayNumber": "11" }, "12": { "dayname": "TueC", "routine": "0,RC,1,2,R,3,4,MTL1,MTL2,5", "rollcall": { "title": "RC 12F", "teacher": "GENM", "room": null }, "periods": { "2": { "title": "EST A3", "teacher": "GIFR", "room": "505", "fullTeacher": "R Gifford", "year": "12" }, "4": { "title": "MAA A2", "teacher": "PARP", "room": "104", "fullTeacher": "P Parker", "year": "12" }, "5": { "title": "ENA J5", "teacher": "HOWR", "room": "209", "fullTeacher": "R Howland", "year": "12" } }, "dayNumber": "12" }, "13": { "dayname": "WedC", "routine": "0,RC,1,2,R,3,WFL1,WFL2,4,5", "rollcall": { "title": "RC 12F", "teacher": "GENM", "room": null }, "periods": { "0": { "title": "MX2 A7", "teacher": "PARP", "room": "104", "fullTeacher": "P Parker", "year": "12" }, "1": { "title": "ENA J5", "teacher": "HOWR", "room": "209", "fullTeacher": "R Howland", "year": "12" }, "3": { "title": "SDD A1", "teacher": "DAMR", "room": "504", "fullTeacher": "R Dam", "year": "12" }, "4": { "title": "SP 12", "teacher": null, "room": null, "fullTeacher": "", "year": "12" }, "5": { "title": "SP 12", "teacher": null, "room": null, "fullTeacher": "", "year": "12" } }, "dayNumber": "13" }, "14": { "dayname": "ThuC", "routine": "0,RC,1,2,R,3,WFL1,WFL2,4,5", "rollcall": { "title": "RC 12F", "teacher": "GENM", "room": null }, "periods": { "0": { "title": "MX2 A7", "teacher": "PARP", "room": "104", "fullTeacher": "P Parker", "year": "12" }, "2": { "title": "SDD A1", "teacher": "DAMR", "room": "504", "fullTeacher": "R Dam", "year": "12" }, "3": { "title": "MAA A2", "teacher": "PARP", "room": "104", "fullTeacher": "P Parker", "year": "12" } }, "dayNumber": "14" }, "15": { "dayname": "FriC", "routine": "0,RC,1,2,R,3,WFL1,WFL2,4,5", "rollcall": { "title": "RC 12F", "teacher": "GENM", "room": null }, "periods": { "1": { "title": "EST A3", "teacher": "GIFR", "room": "505", "fullTeacher": "R Gifford", "year": "12" }, "2": { "title": "ENA J5", "teacher": "HOWR", "room": "209", "fullTeacher": "R Howland", "year": "12" }, "4": { "title": "MAA A2", "teacher": "PARP", "room": "104", "fullTeacher": "P Parker", "year": "12" }, "5": { "title": "MAX A6", "teacher": "PARP", "room": "104", "fullTeacher": "P Parker", "year": "12" } }, "dayNumber": "15" } }, "rollcall": { "title": "Roll Call 12F", "shortTitle": "RC 12F", "teacher": "GENM", "subject": "Roll Call RC", "fullTeacher": "M Genias", "year": "0", "colour": "000000" }, "advisor": "" }




// Data formatting should be done below
const weekly_formatted = weekly_information
const daily_formatted = {
    "status": "OK",
    "date": "2022-04-29",
    "bells": [
        {
            "period": "0",
            "startTime": "08:00",
            "endTime": "09:25",
            "type": "O",
            "time": "08:00",
            "bell": "0",
            "bellDisplay": "Period 0"
        },
        {
            "period": "RC",
            "startTime": "09:25",
            "endTime": "09:30",
            "type": "O",
            "time": "09:25",
            "bell": "RC",
            "bellDisplay": "Roll Call"
        },
        {
            "period": "1",
            "startTime": "09:30",
            "endTime": "10:25",
            "type": "T",
            "time": "09:30",
            "bell": "1",
            "bellDisplay": "Period 1"
        },
        {
            "period": "2",
            "startTime": "10:30",
            "endTime": "11:25",
            "type": "T",
            "time": "10:30",
            "bell": "2",
            "bellDisplay": "Period 2"
        },
        {
            "period": "R",
            "startTime": "11:25",
            "endTime": "11:45",
            "type": "R",
            "time": "11:25",
            "bell": "R",
            "bellDisplay": "Recess"
        },
        {
            "period": "3",
            "startTime": "11:45",
            "endTime": "12:40",
            "type": "T",
            "time": "11:45",
            "bell": "3",
            "bellDisplay": "Period 3"
        },
        {
            "period": "WFL1",
            "startTime": "12:40",
            "endTime": "13:00",
            "type": "R",
            "time": "12:40",
            "bell": "WFL1",
            "bellDisplay": "Lunch 1"
        },
        {
            "period": "WFL2",
            "startTime": "13:00",
            "endTime": "13:20",
            "type": "R",
            "time": "13:00",
            "bell": "WFL2",
            "bellDisplay": "Lunch 2"
        },
        {
            "period": "4",
            "startTime": "13:20",
            "endTime": "14:15",
            "type": "T",
            "time": "13:20",
            "bell": "4",
            "bellDisplay": "Period 4"
        },
        {
            "period": "5",
            "startTime": "14:20",
            "endTime": "15:15",
            "type": "T",
            "time": "14:20",
            "bell": "5",
            "bellDisplay": "Period 5"
        },
        {
            "period": "EoD",
            "startTime": "15:15",
            "endTime": null,
            "type": "O",
            "time": "15:15",
            "bell": "EoD",
            "bellDisplay": "End of Day"
        }
    ],
    "timetable": {
        "timetable": {
            "dayname": "FriB",
            "routine": "0,RC,1,2,R,3,WFL1,WFL2,4,5",
            "rollcall": {
                "title": "RC 12F",
                "teacher": "GENM",
                "room": null
            },
            "periods": {
                "1": {
                    "title": "MAA A2",
                    "teacher": "PARP",
                    "room": "104",
                    "fullTeacher": "P Parker",
                    "year": "12"
                },
                "2": {
                    "title": "SDD A1",
                    "teacher": "DAMR",
                    "room": "504",
                    "fullTeacher": "R Dam",
                    "year": "12"
                },
                "3": {
                    "title": "EST A3",
                    "teacher": "GIFR",
                    "room": "505",
                    "fullTeacher": "R Gifford",
                    "year": "12"
                },
                "5": {
                    "title": "ENA J5",
                    "teacher": "HOWR",
                    "room": "209",
                    "fullTeacher": "R Howland",
                    "year": "12"
                },
                "RC": {
                    "title": "RC 12F",
                    "teacher": "GENM",
                    "room": null
                }
            },
            "dayNumber": "10"
        },
        "subjects": {
            "12EST A3": {
                "title": "12 Engineering Studies A3",
                "shortTitle": "EST A3",
                "teacher": "GIFR",
                "subject": "Engineering Studies Yr12",
                "fullTeacher": "R Gifford",
                "year": "12",
                "colour": "448ae6"
            },
            "12MAA A2": {
                "title": "12 Mathematics Advanced X2 A2",
                "shortTitle": "MAA A2",
                "teacher": "PARP",
                "subject": "Mathematics Advanced X2 Yr12",
                "fullTeacher": "P Parker",
                "year": "12",
                "colour": "dc5221"
            },
            "12SP 12": {
                "title": "12 Sport 12",
                "shortTitle": "SP 12",
                "teacher": null,
                "subject": "Sport Yr12",
                "fullTeacher": "",
                "year": "12",
                "colour": "7f5252"
            },
            "12SDD A1": {
                "title": "12 Software Design & Development A1",
                "shortTitle": "SDD A1",
                "teacher": "DAMR",
                "subject": "Software Design & Development Yr12",
                "fullTeacher": "R Dam",
                "year": "12",
                "colour": "448ae6"
            },
            "12MX2 A7": {
                "title": "12 Mathematics Extension 2 A7",
                "shortTitle": "MX2 A7",
                "teacher": "PARP",
                "subject": "Mathematics Extension 2 Yr12",
                "fullTeacher": "P Parker",
                "year": "12",
                "colour": "dc5221"
            },
            "12YA EFT": {
                "title": "12 Year EFT",
                "shortTitle": "YA EFT",
                "teacher": "COOJ",
                "subject": "Year Adviser",
                "fullTeacher": "J Cook",
                "year": "12",
                "colour": "c0c0c0"
            },
            "12MAX A6": {
                "title": "12 Mathematics Extension 1 X2 A6",
                "shortTitle": "MAX A6",
                "teacher": "PARP",
                "subject": "Mathematics Extension 1 X2 Yr12",
                "fullTeacher": "P Parker",
                "year": "12",
                "colour": "dc5221"
            },
            "12ENA J5": {
                "title": "12 English Advanced J5",
                "shortTitle": "ENA J5",
                "teacher": "HOWR",
                "subject": "English Advanced Yr12",
                "fullTeacher": "R Howland",
                "year": "12",
                "colour": "ffd718"
            },
            "12ACC A0": {
                "title": "12 ACCELERATED COURSES COMPLETED A0",
                "shortTitle": "ACC A0",
                "teacher": null,
                "subject": "ACCELERATED COURSES COMPLETED Yr12",
                "fullTeacher": "",
                "year": "12",
                "colour": "000000"
            }
        }
    },
    "roomVariations": [],
    "classVariations": {
        "2": {
            "period": "2",
            "year": "12",
            "title": "SDD A1",
            "teacher": "DAMR",
            "type": "novariation",
            "casual": "",
            "casualSurname": null,
            "roomFrom": "",
            "roomTo": null
        }
    },
    "serverTimezone": "36000",
    "shouldDisplayVariations": true
}





// Exporting of formatted data to tt_daily and tt_weekly
export { weekly_formatted, daily_formatted };