import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Calendar from '../calendar';
import styleConstructor from './style';

class CalendarListItem extends Component {
  static displayName = 'IGNORE';

  static defaultProps = {
    hideArrows: true,
    hideExtraDays: true,
  };

  constructor(props) {
    super(props);

    this.style = styleConstructor(props.theme);
  }

  shouldComponentUpdate(nextProps) {
    const r1 = this.props.item;
    const r2 = nextProps.item;
    return (
      r1.toString('yyyy MM') !== r2.toString('yyyy MM') ||
      !!(r2.propbump && r2.propbump !== r1.propbump)
    );
  }

  onPressArrowLeft = (_, month) => {
    const monthClone = month.clone();

    if (this.props.onPressArrowLeft) {
      this.props.onPressArrowLeft(_, monthClone);
    } else if (this.props.scrollToMonth) {
      const currentMonth = monthClone.getMonth();
      monthClone.addMonths(-1);

      // Make sure we actually get the previous month, not just 30 days before currentMonth.
      while (monthClone.getMonth() === currentMonth) {
        monthClone.setDate(monthClone.getDate() - 1);
      }

      this.props.scrollToMonth(monthClone);
    }
  };

  onPressArrowRight = (_, month) => {
    const monthClone = month.clone();

    if (this.props.onPressArrowRight) {
      this.props.onPressArrowRight(_, monthClone);
    } else if (this.props.scrollToMonth) {
      monthClone.addMonths(1);
      this.props.scrollToMonth(monthClone);
    }
  };

  render() {
    const row = this.props.item;
    // 헤더와 캘린더 영역에 3pt 공백을 추가하기 위해 -3, +3 마진을 적용한다.
    if (row.getTime) {
      return (
        <Calendar
          theme={this.props.theme}
          style={[
            {
              height: this.props.calendarHeight - 3, // update bongki.choi -3추가 2020.08.10
              width: this.props.calendarWidth,
              marginTop: 3, // update bongki.choi -3추가 2020.08.10
            },
            this.style.calendar,
            this.props.style,
          ]}
          current={row}
          hideArrows={this.props.hideArrows}
          hideExtraDays={this.props.hideExtraDays}
          disableMonthChange
          markedDates={this.props.markedDates}
          markingType={this.props.markingType}
          hideDayNames={this.props.hideDayNames}
          onDayPress={this.props.onDayPress}
          onDayLongPress={this.props.onDayLongPress}
          displayLoadingIndicator={this.props.displayLoadingIndicator}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          firstDay={this.props.firstDay}
          monthFormat={this.props.monthFormat}
          dayComponent={this.props.dayComponent}
          disabledByDefault={this.props.disabledByDefault}
          showWeekNumbers={this.props.showWeekNumbers}
          renderArrow={this.props.renderArrow}
          onPressArrowLeft={
            this.props.horizontal
              ? this.onPressArrowLeft
              : this.props.onPressArrowLeft
          }
          onPressArrowRight={
            this.props.horizontal
              ? this.onPressArrowRight
              : this.props.onPressArrowRight
          }
          headerStyle={
            this.props.horizontal ? this.props.headerStyle : undefined
          }
          accessibilityElementsHidden={this.props.accessibilityElementsHidden} // iOS
          importantForAccessibility={this.props.importantForAccessibility} // Android
        />
      );
    } else {
      const text = row.toString();

      return (
        <View
          style={[
            {
              height: this.props.calendarHeight,
              width: this.props.calendarWidth,
            },
            this.style.placeholder,
          ]}>
          <Text allowFontScaling={false} style={this.style.placeholderText}>
            {text}
          </Text>
        </View>
      );
    }
  }
}

export default CalendarListItem;
