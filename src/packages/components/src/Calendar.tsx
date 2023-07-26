import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Calendar as RNCalendar, LocaleConfig } from "react-native-calendars";
//@ts-ignore
import { PRIMARY, WHITE, DARK_RED, LIGHT_GREY } from "./constants";
import moment from "moment";
import { addDays } from 'date-fns';
interface Props {
  dateSelected?: (date: string) => void;
  onDayPress?: (date: string) => void;
  markedDate?:any
}
const backArrow = require("./arrow_left.png");
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const getMonthName = (timestamp: number) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = monthNames[date.getMonth()];
  return `${month} ${year}`;
};

const Calendar = ({
  dateSelected = (date: string) => { },
  onDayPress,
  markedDate
}: Props): JSX.Element => {
  const [month, setMonth] = useState(new Date().getTime());
  const [markDate, setMarkDate] = useState({
  });

  const today = moment();
  const getSelectedDayEvents = (date: any) => {
    var dict: any = {}
    var dateObj = new Date(date.dateString);
    var newDate = new Date(date.dateString);
    var  counter = 0;
    newDate.setDate(dateObj.getDate()+7);
    while (dateObj < newDate){
      let momentObj = moment(dateObj, 'MM-DD-YYYY');
      let date = momentObj.format('YYYY-MM-DD')
      dict[date] = {  startingDay: counter == 0 ? true : false, 
        color:  counter == 0 || counter == 6 ? PRIMARY : LIGHT_GREY, 
        textColor: counter == 0 || counter == 6 ? "white"  : DARK_RED, 
        endingDay : counter == 6 ? true : false},
      counter = counter + 1
      let addOneMoreDay = moment(dateObj).add(1, 'days').toDate();
      dateObj =  addOneMoreDay
  }
    setMarkDate(dict);
  };

  const theme = {
    "stylesheet.calendar.header": {
      header: styles.header,
      week: styles.headerWeek,
      dayHeader: styles.dayHeader,
    },
    "stylesheet.calendar.main": {
      week: styles.calendarMainWeek,
      monthView: {},
    },
    "stylesheet.marking": {
      dots: {
        flexDirection: "row",
      },
      period: {
        height: 1,
        marginTop: 2,
        width: "55%",
        alignSelf: "center",
        marginRight: 4,
      },
    },
    "stylesheet.day.basic": {
      selected: {
        borderRadius: 20,
        backgroundColor: "red",
        alignSelf: "center",
      },
    },
    "stylesheet.agenda.main": {
      today: {
        color: "green",
      },
    },
    "stylesheet.agenda.list": {
      dayNum: {
        fontSize: 16,
        fontWeight: "bold",
      },
      day: {
        display: "none",
      },
      dayText: {
        color: "transparent",
      },
      today: {
        color: "yellow",
      },
    },
    backgroundColor: "#ffffff",
    dayTextColor: DARK_RED,
    calendarBackground: WHITE,
    textSectionTitleColor: "white",
    textDayFontSize: 17,
    textDayFontWeight: "400",
    textDayHeaderFontWeight: "bold",
    textDayHeaderFontSize: 12,
    selectedDayTextColor: "#ffffff",
    textDayStyle: {
      fontSize: 14,
    },
  };
  const calendarRef = useRef();

  const props = {
    theme: theme,
    ref: calendarRef,
    hideExtraDays: true,
    onMonthChange: (month: any) => {
      setMonth(month.timestamp);
    },
    markingType: "period",
    markedDates: markedDate ? markedDate : markDate,
    firstDay: 0,
    onDayPress: (day: any) => {
      if (onDayPress) {
        onDayPress(day.dateString)
        return 
      }
      dateSelected(day.dateString)
      getSelectedDayEvents(day);
    },
  };
  const changeMonth = (duration: number) => {
    //@ts-ignore
    calendarRef.current.addMonth(duration);
    console.log(calendarRef.current);

  };
  LocaleConfig.locales["fr"] = {
    monthNames,
    monthNamesShort: [
      "Janv.",
      "Févr.",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juil.",
      "Août",
      "Sept.",
      "Oct.",
      "Nov.",
      "Déc.",
    ],
    dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    dayNamesShort: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
  };
  LocaleConfig.defaultLocale = "fr";
  return (
    <View style={styles.main} testID="calendar">
      <View style={styles.overFlow}>
        <View style={styles.headerContainer}>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.month}>{getMonthName(month)}</Text>
              <TouchableOpacity onPress={() => changeMonth(12)} style={{ paddingLeft: 10 }}>
                <Image style={styles.back} source={backArrow} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => changeMonth(-1)}>
              <Image style={styles.arrow} source={backArrow} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => changeMonth(1)}
              style={styles.next}
            >
              <Image
                style={{
                  ...styles.arrow,
                  transform: [{ rotate: "180deg" }],
                }}
                source={backArrow}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/*@ts-ignore*/}
        <RNCalendar {...props} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  overFlow: { borderRadius: 30, overflow: "hidden" },
  next: { marginLeft: 20 },
  row: { flexDirection: "row" },
  month: { color: DARK_RED, fontSize: 18, fontWeight: "bold" },
  main: {
    backgroundColor: WHITE,
    borderRadius: 20,
    paddingBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  back: {
    height: 13,
    width: 13,
    tintColor: PRIMARY,
    transform: [{ rotate: "180deg" }],
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    zIndex: 1000,
    top: 15,
    paddingBottom: 20,
  },
  calendarStyle: {
    marginHorizontal: 30,
    marginVertical: 15,
    borderRadius: 30,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    paddingBottom: 18,
  },
  selected: {
    position: "absolute",
    height: 20,
    width: 20,
  },
  marking: {
    height: 6,
    width: 6,
    backgroundColor: "white",
    borderRadius: 3,
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
  },
  header: {
    height: 20,
    opacity: 0,
    color: "red",
  },
  headerWeek: {
    margin: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    color: "green",
    paddingHorizontal: "6%",
    fontWeight: Platform.OS === "ios" ? "bold" : "500",
  },
  dayHeader: {
    margin: 0,
    width: "auto",
    textAlign: "center",
    color: "#D3D3D3",
    fontSize: 14,
    fontWeight: "bold",
  },
  calendarMainWeek: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingHorizontal: "1.5%",
    height: 30,
  },
  arrow: { height: 15, width: 15, tintColor: PRIMARY },
});

export default Calendar;
