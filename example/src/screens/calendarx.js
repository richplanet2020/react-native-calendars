import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {CalendarList, LocaleConfig} from 'react-native-calendars';
import XDate from 'xdate';
import _ from 'lodash';

//const testIDs = require('../testIDs');

LocaleConfig.defaultLocale = 'kr';
LocaleConfig.locales.kr = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};

export default class CalendarxScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: undefined,
    };
    console.log('test');
  }

  onDayPress = (day) => {
    this.setState({selected: day.dateString});
  };

  getMarkedDates = () => {
    const markdedDates = {
      '2020-04-20': {textColor: 'green'},
      '2020-04-21': {
        startingDay: true,
        color: 'lightgreen',
      },
      '2020-04-22': {
        color: 'lightgreen',
        dayEvent: {
          icons: ['I35', 'I34', 'I33', 'I35', 'I36'],
        },
      },
      '2020-04-23': {color: 'lightgreen'},
      '2020-04-24': {
        //selected: true,
        endingDay: true,
        color: 'lightgreen',
      },
      '2020-04-01': {
        //selected: true,
        //color: 'green',
        //textColor: 'gray',
        dayEvent: {
          name: '진료',
          icons: ['I01', 'I05'],
        },
      },
      '2020-04-04': {
        startingDay: true,
        color: '#CAF1DE',
        dayEvent: {name: '생리시작'},
      },
      '2020-04-05': {color: '#CAF1DE'},
      '2020-04-06': {
        endingDay: true,
        color: '#CAF1DE',
        dayEvent: {name: '생리종료'},
      },
      '2020-04-10': {
        selected: true,
        //color: 'green',
        //textColor: 'gray',
        dayEvent: {
          name: '진료',
        },
      },
      '2020-05-04': {
        disabled: true,
        startingDay: true,
        endingDay: true,
        color: 'green',
        //selected: true,
      },
      '2020-05-31': {
        //selected: true,
        //color: 'green',
        //textColor: 'gray',
        selected: true,
        dayEvent: {
          name: '배란예정일',
          //icons: ['drug', 'trt', 'tem'],
          icons: ['tem', 'vac', 'mem', 'drg'],
        },
      },
      '2020-06-05': {
        today: true,
      },
    };

    const markedCloneData = _.cloneDeep(markdedDates);
    if (markdedDates[this.state.selected]) {
      markedCloneData[this.state.selected].selected = true;
    } else {
      markedCloneData[this.state.selected] = {selected: true};
    }

    return markedCloneData;
  };

  render() {
    return (
      <>
        <CalendarList
          ref={(r: any) => (this.calendar = r)}
          current={'2020-05-01'}
          pastScrollRange={24}
          futureScrollRange={24}
          calendarHeight={434}
          //onViewableItemsChanged={this.onViewableItemsChanged}
          horizontal
          pagingEnabled
          style={{
            borderBottomWidth: 1,
            borderBottomColor: 'lightgrey',
          }}
          staticHeader // ADD BONG. 위에 정적 헤더를 덮는다.
          hideExtraDays={false} // ADD BONG. 이전 다음달 일은 회색 처리한다.
          onDayPress={(day) => {
            //this.setState({selected: day.dateString});
            //this.calendar.scrollToMonth(XDate('2020-09-10'));
          }} // ADD BONG. 날짜를 누른경우
          onDayLongPress={(day) => console.log(day)} // ADD BONG. 날짜를 길게 누른경우
          monthFormat={'yyyy MM'} // ADD BONG. 렌더링 안된 달 표기 방식
          onMonthChange={(month) => {
            //console.log('month changed', month);
            //console.log('month date', month.dateString);
            const firstMonthDay = month.dateString
              .split('-')
              .slice(0, 2)
              .join('-')
              .concat('-01');
            //this.setState({selected: month.dateString});
          }}
          onRessChangeInitDate={(ty) => {
            console.log(`--- onRessChangeInitDate:(${ty}) --- `);
            if (ty === 'today') {
              this.calendar.scrollToMonth(new Date());
            }
          }}
          hideArrows={true}
          //showWeekNumbers={true} // ADD BONG. 주번호
          markedDates={this.getMarkedDates()}
          markingType={'periodx'} // ADD BONG. 마킹 유형
          //dayComponent={this.getCustomDay}
          theme={{
            arrowColor: 'white',
            'stylesheet.calendar.header': {
              // APPEND BONG - [S] -
              dayHeaderMondayContainer: {
                flexDirection: 'row',
                marginLeft: 20,
                marginTop: 12,
                //backgroundColor: 'green',
              },
              dayHeaderNowMonth: {
                maxWidth: 33, // 16.5 두자릿수 대응을 위해 x2배함.
                height: 41.5,
                fontFamily: 'NotoSansCJKkr-Medium',
                fontSize: 28,
                fontWeight: 'bold',
                fontStyle: 'normal',
                lineHeight: 41.5,
                letterSpacing: -1.4,
                textAlign: 'left',
                color: '#000000',
                //backgroundColor: 'orange',
              },
              dayHeaderNowYearContainer: {
                paddingTop: 14,
                height: 41.5,
                flexDirection: 'row',
                //backgroundColor: 'red',
              },
              dayHeaderArrow: {
                //width: 58,
                height: 22.5,
                fontFamily: 'NotoSansCJKkr-Medium',
                fontSize: 15,
                fontWeight: '500',
                fontStyle: 'normal',
                lineHeight: 22.5,
                letterSpacing: -0.75,
                textAlign: 'left',
                color: '#a0a0a0',
                marginLeft: 2,
                //backgroundColor:'green',
              },
              dayHeaderArrowIcon: {
                height: 20,
                width: 20,
                alignItems: 'center',
                justifyContent: 'center',
                //backgroundColor: 'blue',
              },
              week: {
                marginTop: 10,
                marginBottom: 12,
                height: 14.5,
                flexDirection: 'row',
                justifyContent: 'space-around',
                //backgroundColor: 'yellow',
              },
              dayHeader: {
                width: 40,
                height: 14.5,
                fontFamily: 'NotoSansCJKkr-Regular',
                fontSize: 10,
                fontWeight: 'normal',
                fontStyle: 'normal',
                lineHeight: 14.5,
                letterSpacing: -0.5,
                textAlign: 'center',
                color: '#a0a0a0',
                //backgroundColor: 'pink',
              },
              //APPEND BONG - [E] -
            },
            'stylesheet.day.period': {
              //APPEND BONG - [S] -
              wrapper: {
                alignItems: 'center',
                alignSelf: 'stretch',
                marginLeft: -1,
                height: 21,
              },
              text: {
                //marginTop: 7,
                //fontSize: appStyle.textDayFontSize,
                //fontFamily: appStyle.textDayFontFamily,
                //fontWeight: appStyle.textDayFontWeight,
                //color: appStyle.dayTextColor,
                backgroundColor: 'rgba(255, 255, 255, 0)',
              },
              //APPEND BONG - [E] -
            },
            'stylesheet.calendar.main': {
              week: {
                //marginTop: 7,
                //marginBottom: 7,
                flexDirection: 'row',
                justifyContent: 'space-around',
                //backgroundColor: 'blue',
              },
            },
          }} // ADD BONG. 켈린더 테마를 오버라이딩 한다.
          headerStyle={
            {
              // backgroundColor: 'pink',
            }
          }
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16,
  },
});
