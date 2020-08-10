import React, {Component} from 'react';
import {
  ActivityIndicator,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import XDate from 'xdate';
import PropTypes from 'prop-types';
import styleConstructor from './style';
import {weekDayNames} from '../../dateutils';
import {CHANGE_MONTH_LEFT_ARROW, CHANGE_MONTH_RIGHT_ARROW} from '../../testIDs';

class CalendarHeader extends Component {
  static displayName = 'IGNORE';

  static propTypes = {
    theme: PropTypes.object,
    hideArrows: PropTypes.bool,
    month: PropTypes.instanceOf(XDate),
    addMonth: PropTypes.func,
    showIndicator: PropTypes.bool,
    firstDay: PropTypes.number,
    renderArrow: PropTypes.func,
    hideDayNames: PropTypes.bool,
    weekNumbers: PropTypes.bool,
    onPressArrowLeft: PropTypes.func,
    onPressArrowRight: PropTypes.func,
    disableArrowLeft: PropTypes.bool,
    disableArrowRight: PropTypes.bool,
    webAriaLevel: PropTypes.number,
    scrollToMonth: PropTypes.func,
    markingType: PropTypes.string, // [APPEND BONG.]
    onRessChangeInitDate: PropTypes.func, // [APPEND BONG.]
    markedDates: PropTypes.object, // [APPEND BONG.]
  };

  static defaultProps = {
    monthFormat: 'MMMM yyyy',
    webAriaLevel: 1,
  };

  constructor(props) {
    super(props);
    this.style = styleConstructor(props.theme);
    this.addMonth = this.addMonth.bind(this);
    this.substractMonth = this.substractMonth.bind(this);
    this.onPressLeft = this.onPressLeft.bind(this);
    this.onPressRight = this.onPressRight.bind(this);
  }

  addMonth() {
    this.props.addMonth(1);
  }

  substractMonth() {
    this.props.addMonth(-1);
  }

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.month.toString('yyyy MM') !==
      this.props.month.toString('yyyy MM')
    ) {
      return true;
    }
    if (nextProps.showIndicator !== this.props.showIndicator) {
      return true;
    }
    if (nextProps.hideDayNames !== this.props.hideDayNames) {
      return true;
    }
    if (nextProps.firstDay !== this.props.firstDay) {
      return true;
    }
    if (nextProps.weekNumbers !== this.props.weekNumbers) {
      return true;
    }
    if (nextProps.monthFormat !== this.props.monthFormat) {
      return true;
    }
    if (nextProps.renderArrow !== this.props.renderArrow) {
      return true;
    }
    if (nextProps.disableArrowLeft !== this.props.disableArrowLeft) {
      return true;
    }
    if (nextProps.disableArrowRight !== this.props.disableArrowRight) {
      return true;
    }
    // append bongki.choi 2020.08.10
    if (nextProps.markedDates !== this.props.markedDates) {
      return true;
    }
    return false;
  }

  onPressLeft() {
    const {onPressArrowLeft} = this.props;
    if (typeof onPressArrowLeft === 'function') {
      return onPressArrowLeft(this.substractMonth, this.props.month);
    }
    return this.substractMonth();
  }

  onPressRight() {
    const {onPressArrowRight} = this.props;
    if (typeof onPressArrowRight === 'function') {
      return onPressArrowRight(this.addMonth, this.props.month);
    }
    return this.addMonth();
  }

  render() {
    if (this.props.markingType === 'periodx') {
      return this.renderPriodX();
    }
    return this.renderOri();
  }

  // [BONG APPEND]
  renderPriodX() {
    let weekDaysNames = weekDayNames(this.props.firstDay);
    const {testID} = this.props;

    let indicator;
    if (this.props.showIndicator) {
      indicator = (
        <ActivityIndicator
          color={this.props.theme && this.props.theme.indicatorColor}
        />
      );
    }

    let month = this.props.month.toString(this.props.monthFormat);
    let monthOnly = new Number(month.split(' ')[1]).toString();
    let yearOnly = new Number(month.split(' ')[0]).toString();

    //const currentDay = new XDate().toString('yyyyMM');
    //const diffToday =
    //Number(currentDay) - Number(this.props.month.toString('yyyyMM'));
    //Selected Date: 선택날짜가 오늘이 아닌경우 오늘 버튼 추가코드
    const currentDay = new XDate().toString('yyyyMMdd');
    let diffToday = 0;
    if (this.props.markedDates) {
      const {markedDates} = this.props;
      let selectedDate = '';
      for (const [key, value] of Object.entries(markedDates)) {
        if (key != 'undefined' && value) {
          for (const [_key, _value] of Object.entries(value)) {
            if (key && _key == 'selected' && _value == true) {
              selectedDate = key;
            }
          }
        }
      }
      if (selectedDate) {
        diffToday =
          Number(currentDay) -
          Number(new XDate(selectedDate).toString('yyyyMMdd'));
      }
    }

    return (
      <View
        style={this.props.style}
        accessible
        accessibilityRole={'adjustable'}
        accessibilityActions={[
          {name: 'increment', label: 'increment'},
          {name: 'decrement', label: 'decrement'},
        ]}
        onAccessibilityAction={this.onAccessibilityAction}
        accessibilityElementsHidden={this.props.accessibilityElementsHidden} // iOS
        importantForAccessibility={this.props.importantForAccessibility} // Android
      >
        {/* [BONG APPEND] Header Style */}
        {/* <TouchableOpacity testID={`${testID}`}> */}
        <View style={this.style.dayHeaderMondayContainer}>
          <Text style={this.style.dayHeaderNowMonth}>{monthOnly}</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              this.props.onRessChangeInitDate &&
                this.props.onRessChangeInitDate('reset');
            }}>
            <View style={this.style.dayHeaderNowYearContainer}>
              <Text style={this.style.dayHeaderArrow}>월 · {yearOnly}</Text>
              <View style={this.style.dayHeaderArrowIcon}>
                <Image style={{}} source={require('../img/IC_Open_S_N.png')} />
              </View>
            </View>
          </TouchableWithoutFeedback>
          {diffToday != 0 && (
            <TouchableWithoutFeedback
              onPress={() => {
                //this.props.scrollToMonth(XDate());
                this.props.onRessChangeInitDate &&
                  this.props.onRessChangeInitDate('today');
              }}>
              {diffToday > 0 ? (
                <View style={this.style.todayBtn1Container}>
                  <Text style={this.style.todayBtnIcon}>오늘</Text>
                  <Image source={require('../../img/icGoSF.png')} />
                </View>
              ) : (
                <View style={this.style.todayBtn2Container}>
                  <Image source={require('../../img/icPrevSF.png')} />
                  <Text style={this.style.todayBtnIcon}>오늘</Text>
                </View>
              )}
            </TouchableWithoutFeedback>
          )}
        </View>
        {/* </TouchableOpacity> */}

        {/* 요일 색깔 변경 bongki.choi  
        idx === 0 || idx === 6 ? {color: '#f08b76'} : {}, */}
        {!this.props.hideDayNames && (
          <View style={this.style.week}>
            {this.props.weekNumbers && (
              <Text allowFontScaling={false} style={this.style.dayHeader} />
            )}
            {weekDaysNames.map((day, idx) => (
              <Text
                allowFontScaling={false}
                key={idx}
                style={[
                  {...this.style.dayHeader},
                  idx === 0 ? {color: '#f08b76'} : {},
                ]}
                numberOfLines={1}
                accessibilityLabel={''}
                // accessible={false} // not working
                // importantForAccessibility='no'
              >
                {day}
              </Text>
            ))}
          </View>
        )}
      </View>
    );
  }

  // 오픈소스 버전
  renderOri() {
    let leftArrow = <View />;
    let rightArrow = <View />;
    let weekDaysNames = weekDayNames(this.props.firstDay);
    const {testID} = this.props;

    if (!this.props.hideArrows) {
      leftArrow = (
        <TouchableOpacity
          onPress={this.onPressLeft}
          disabled={this.props.disableArrowLeft}
          style={this.style.arrow}
          hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}
          testID={
            testID
              ? `${CHANGE_MONTH_LEFT_ARROW}-${testID}`
              : CHANGE_MONTH_LEFT_ARROW
          }>
          {this.props.renderArrow ? (
            this.props.renderArrow('left')
          ) : (
            <Image
              source={require('../img/previous.png')}
              style={
                this.props.disableArrowLeft
                  ? this.style.disabledArrowImage
                  : this.style.arrowImage
              }
            />
          )}
        </TouchableOpacity>
      );
      rightArrow = (
        <TouchableOpacity
          onPress={this.onPressRight}
          disabled={this.props.disableArrowRight}
          style={this.style.arrow}
          hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}
          testID={
            testID
              ? `${CHANGE_MONTH_RIGHT_ARROW}-${testID}`
              : CHANGE_MONTH_RIGHT_ARROW
          }>
          {this.props.renderArrow ? (
            this.props.renderArrow('right')
          ) : (
            <Image
              source={require('../img/next.png')}
              style={
                this.props.disableArrowRight
                  ? this.style.disabledArrowImage
                  : this.style.arrowImage
              }
            />
          )}
        </TouchableOpacity>
      );
    }

    let indicator;
    if (this.props.showIndicator) {
      indicator = (
        <ActivityIndicator
          color={this.props.theme && this.props.theme.indicatorColor}
        />
      );
    }

    const webProps =
      Platform.OS === 'web' ? {'aria-level': this.props.webAriaLevel} : {};

    return (
      <View
        style={this.props.style}
        accessible
        accessibilityRole={'adjustable'}
        accessibilityActions={[
          {name: 'increment', label: 'increment'},
          {name: 'decrement', label: 'decrement'},
        ]}
        onAccessibilityAction={this.onAccessibilityAction}
        accessibilityElementsHidden={this.props.accessibilityElementsHidden} // iOS
        importantForAccessibility={this.props.importantForAccessibility} // Android
      >
        <View style={this.style.header}>
          {leftArrow}
          <View style={{flexDirection: 'row'}}>
            <Text
              allowFontScaling={false}
              style={this.style.monthText}
              {...webProps}>
              {this.props.month.toString(this.props.monthFormat)}
            </Text>
            {indicator}
          </View>
          {rightArrow}
        </View>
        {!this.props.hideDayNames && (
          <View style={this.style.week}>
            {this.props.weekNumbers && (
              <Text allowFontScaling={false} style={this.style.dayHeader} />
            )}
            {weekDaysNames.map((day, idx) => (
              <Text
                allowFontScaling={false}
                key={idx}
                style={this.style.dayHeader}
                numberOfLines={1}
                accessibilityLabel={''}
                // accessible={false} // not working
                // importantForAccessibility='no'
              >
                {day}
              </Text>
            ))}
          </View>
        )}
      </View>
    );
  }

  onAccessibilityAction = (event) => {
    switch (event.nativeEvent.actionName) {
      case 'decrement':
        this.onPressLeft();
        break;
      case 'increment':
        this.onPressRight();
        break;
      default:
        break;
    }
  };
}

export default CalendarHeader;
