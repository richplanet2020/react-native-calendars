import {StyleSheet} from 'react-native';
import * as defaultStyle from '../../style';

const STYLESHEET_ID = 'stylesheet.calendar.header';

export default function (theme = {}) {
  const appStyle = {...defaultStyle, ...theme};
  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 10,
      marginTop: 6,
      alignItems: 'center',
    },
    monthText: {
      fontSize: appStyle.textMonthFontSize,
      fontFamily: appStyle.textMonthFontFamily,
      fontWeight: appStyle.textMonthFontWeight,
      color: appStyle.monthTextColor,
      margin: 10,
    },
    arrow: {
      padding: 10,
      ...appStyle.arrowStyle,
    },
    arrowImage: {
      tintColor: appStyle.arrowColor,
    },
    disabledArrowImage: {
      tintColor: appStyle.disabledArrowColor,
    },
    week: {
      marginTop: 7,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    dayHeader: {
      marginTop: 2,
      marginBottom: 7,
      width: 32,
      textAlign: 'center',
      fontSize: appStyle.textDayHeaderFontSize,
      fontFamily: appStyle.textDayHeaderFontFamily,
      fontWeight: appStyle.textDayHeaderFontWeight,
      color: appStyle.textSectionTitleColor,
      backgroundColor: 'yellow',
    },
    // APPENG-BONG
    todayBtnContainer: {
      position: 'absolute',
      top: 8,
      right: 10,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 8,
      width: 66,
      height: 29,
      borderRadius: 14.5,
      elevation: 12,
      backgroundColor: '#403a61',
      shadowColor: 'rgba(0, 0, 0, 0.16)',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowRadius: 5,
      shadowOpacity: 1,
    },
    todayBtnIcon: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 11,
    },
    ...(theme[STYLESHEET_ID] || {}),
  });
}
