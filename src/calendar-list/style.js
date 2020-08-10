import {StyleSheet} from 'react-native';
import * as defaultStyle from '../style';

const STYLESHEET_ID = 'stylesheet.calendar-list.main';

export default function getStyle(theme = {}) {
  const appStyle = {...defaultStyle, ...theme};
  return StyleSheet.create({
    container: {
      backgroundColor: appStyle.calendarBackground,
    },
    placeholder: {
      backgroundColor: appStyle.calendarBackground,
      alignItems: 'center',
      justifyContent: 'center',
    },
    placeholderText: {
      fontSize: 30,
      fontWeight: '200',
      color: appStyle.dayTextColor,
    },
    calendar: {
      paddingLeft: 16, // 15->16 bongki.choi, 2020.08.10
      paddingRight: 16, // 15->16 bongki.choi, 2020.08.10
    },
    staticHeader: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      backgroundColor: appStyle.calendarBackground,
      paddingLeft: 16, // 15->16 bongki.choi, 2020.08.10
      paddingRight: 16, // 15->16 bongki.choi, 2020.08.10
    },
    ...(theme[STYLESHEET_ID] || {}),
  });
}
