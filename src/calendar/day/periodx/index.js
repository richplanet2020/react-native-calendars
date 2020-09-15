import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {TouchableWithoutFeedback, Text, View} from 'react-native';
import {shouldUpdate} from '../../../component-updater';

import * as defaultStyle from '../../../style';
import styleConstructor from './style';
import {styles, iconList as ICON_LIST} from './icons';

// BONG, 2020.09.15
const fontStyle8 = {
  fontFamily: 'NotoSansCJKkr-Regular',
  fontSize: 8,
  fontWeight: 'normal',
  fontStyle: 'normal',
  lineHeight: 12,
  letterSpacing: -0.4,
  textAlign: 'center',
};

// BONG, 2020.09.15
const fontStyle14 = {
  fontFamily: 'NotoSansCJKkr-Regular',
  fontSize: 14,
  fontWeight: 'normal',
  fontStyle: 'normal',
  //lineHeight: 20.5,
  //letterSpacing: -0.7,
  //textAlign: 'center',
};

class Day extends Component {
  static displayName = 'IGNORE';

  static propTypes = {
    // TODO: selected + disabled props should be removed
    state: PropTypes.oneOf(['selected', 'disabled', 'today', '']),
    // Specify theme properties to override specific styles for calendar parts. Default = {}
    theme: PropTypes.object,
    marking: PropTypes.any,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    date: PropTypes.object,
    id: PropTypes.number, // APPEND BONG
    markingExists: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.theme = {...defaultStyle, ...(props.theme || {})};
    this.style = styleConstructor(props.theme);

    this.markingStyle = this.getDrawingStyle(props.marking || []);
    this.onDayPress = this.onDayPress.bind(this);
    this.onDayLongPress = this.onDayLongPress.bind(this);
  }

  onDayPress() {
    this.props.onPress(this.props.date);
  }

  onDayLongPress() {
    this.props.onLongPress(this.props.date);
  }

  shouldComponentUpdate(nextProps) {
    const newMarkingStyle = this.getDrawingStyle(nextProps.marking);

    if (!_.isEqual(this.markingStyle, newMarkingStyle)) {
      this.markingStyle = newMarkingStyle;
      return true;
    }

    return shouldUpdate(this.props, nextProps, [
      'state',
      'children',
      'onPress',
      'onLongPress',
    ]);
  }

  getDrawingStyle(marking) {
    const defaultStyle = {textStyle: {}};
    if (!marking) {
      return defaultStyle;
    }
    if (marking.disabled) {
      defaultStyle.textStyle.color = this.theme.textDisabledColor;
    } else if (marking.selected) {
      defaultStyle.textStyle.color = this.theme.selectedDayTextColor;
    }
    const resultStyle = [marking].reduce((prev, next) => {
      if (next.quickAction) {
        if (next.first || next.last) {
          prev.containerStyle = this.style.firstQuickAction;
          prev.textStyle = this.style.firstQuickActionText;
          if (next.endSelected && next.first && !next.last) {
            prev.rightFillerStyle = '#c1e4fe';
          } else if (next.endSelected && next.last && !next.first) {
            prev.leftFillerStyle = '#c1e4fe';
          }
        } else if (!next.endSelected) {
          prev.containerStyle = this.style.quickAction;
          prev.textStyle = this.style.quickActionText;
        } else if (next.endSelected) {
          prev.leftFillerStyle = '#c1e4fe';
          prev.rightFillerStyle = '#c1e4fe';
        }
        return prev;
      }

      const color = next.color;
      if (next.status === 'NotAvailable') {
        prev.textStyle = this.style.naText;
      }
      if (next.startingDay) {
        prev.startingDay = {
          color,
        };
      }
      if (next.endingDay) {
        prev.endingDay = {
          color,
        };
      }
      if (!next.startingDay && !next.endingDay) {
        prev.day = {
          color,
        };
      }
      if (next.textColor) {
        prev.textStyle.color = next.textColor;
      }
      return prev;
    }, defaultStyle);
    return resultStyle;
  }

  // [APPEND BONG] BADGE 영역 표기하기
  crateBage = () => {
    let IconArrs = [];
    if (this.props.marking.dayEvent) {
      let IconArrsProps = this.props.marking.dayEvent.icons;
      if (IconArrsProps && IconArrsProps.length > 0) {
        _(IconArrsProps).each(function (item, idx) {
          if (IconArrs.length < 3) {
            ICON_LIST[item] && IconArrs.push(ICON_LIST[item]);
          } else if (IconArrsProps.length > 3) {
            IconArrs.pop();
            IconArrs.push(
              <Text style={[styles.iconTextStyle, fontStyle8]}>
                +{IconArrsProps.length - 2}
              </Text>,
            );
          }
        });
      }
    }
    return (
      <View
        style={[
          styles.iconContainer,
          //BONG:배지 영역 표시
          //{backgroundColor: 'lightgreen'},
        ]}>
        {IconArrs}
      </View>
    );
  };

  // [APPEND BONG] TEXT 영역 표기하기
  createText = () => {
    if (this.props.marking.dayEvent) {
      return (
        <View
          style={[
            styles.textContainer,
            //BONG: 문구 색깔 표시
            //{backgroundColor: 'lightblue', height: 13},
          ]}>
          <Text style={[styles.textStyle, fontStyle8]}>
            {this.props.marking.dayEvent.name}
          </Text>
        </View>
      );
    }
    return <View style={styles.textContainer} />;
  };

  render() {
    const containerStyle = [this.style.base];
    const textStyle = [this.style.text];
    let leftFillerStyle = {};
    let rightFillerStyle = {};
    let fillerStyle = {};
    let fillers;
    // [APPEND BONG] 날짜 기본 스타일 정의
    let dayTextContainer = [];
    dayTextContainer.push(_.clone(styles.selectedStyle));

    // [FOR TEST] : 기본적으로 borderRadius: 17이 좌/우 잡힘
    //containerStyle.push([{backgroundColor: 'red'}]);

    // =============================================
    // [APPEND BONG.] 휴일 색깔 표시, 현재 달만 색깔이 들어감
    if (
      this.props.state != 'disabled' &&
      this.props.id === 0 /*|| this.props.id === 6*/
    ) {
      textStyle.push({color: 'red'});
    }

    if (this.props.state === 'disabled') {
      // [APPEND BONG] 이전, 다음달 날짜이면 Disabled 색깔 표기
      textStyle.push({color: '#e6e6e6'});
    } else if (this.props.marking.selected) {
      textStyle.push(this.style.todayText);
      containerStyle.push(this.style.today);
      // [APPEND BONG] 선택한 날짜인경우
      dayTextContainer.push({backgroundColor: '#ff7200'});
    }

    // 마킹과 오늘이 겹치면 오늘색상 표시
    if (this.props.state === 'today') {
      containerStyle.push(this.style.today);
      textStyle.push(this.style.todayText);
      dayTextContainer.push({backgroundColor: '#403a61'});
    }

    if (this.props.marking) {
      containerStyle.push({
        borderRadius: 17,
      });

      const flags = this.markingStyle;
      //console.log('flag=' + JSON.stringify(flags));
      if (flags.textStyle) {
        textStyle.push(flags.textStyle);
      }
      if (flags.containerStyle) {
        containerStyle.push(flags.containerStyle);
      }
      if (flags.leftFillerStyle) {
        leftFillerStyle.backgroundColor = flags.leftFillerStyle;
      }
      if (flags.rightFillerStyle) {
        rightFillerStyle.backgroundColor = flags.rightFillerStyle;
      }

      if (flags.startingDay && !flags.endingDay) {
        leftFillerStyle = {
          backgroundColor: this.theme.calendarBackground,
        };
        rightFillerStyle = {
          backgroundColor: flags.startingDay.color,
        };
        containerStyle.push({
          backgroundColor: flags.startingDay.color,
        });
      } else if (flags.endingDay && !flags.startingDay) {
        rightFillerStyle = {
          backgroundColor: this.theme.calendarBackground,
        };
        leftFillerStyle = {
          backgroundColor: flags.endingDay.color,
        };
        containerStyle.push({
          backgroundColor: flags.endingDay.color,
        });
      } else if (flags.day) {
        leftFillerStyle = {backgroundColor: flags.day.color};
        rightFillerStyle = {backgroundColor: flags.day.color};
        // #177 bug
        fillerStyle = {backgroundColor: flags.day.color};
      } else if (flags.endingDay && flags.startingDay) {
        rightFillerStyle = {
          backgroundColor: this.theme.calendarBackground,
        };
        leftFillerStyle = {
          backgroundColor: this.theme.calendarBackground,
        };
        containerStyle.push({
          backgroundColor: flags.endingDay.color,
        });
      }

      fillers = (
        <View style={[this.style.fillers, fillerStyle]}>
          <View style={[this.style.leftFiller, leftFillerStyle]} />
          <View style={[this.style.rightFiller, rightFillerStyle]} />
        </View>
      );
    }

    // [APPEND BONG] 이전, 다음달 날짜이면 무조건 Disabled 색깔 표기
    //  2020.08.10 내용 추가
    if (this.props.state === 'disabled') {
      textStyle.push({color: '#e6e6e6'});
    }

    // append bongki.choi
    // height : 디자인변경으로 21->24변경
    // marginTop : period color가 자기영역에서 1.5(좌,우)보다 커지게 잡혀야 해서 위로 3pt 올림
    // append bongki.choi 2020.09.07
    containerStyle.push([
      {
        width: 40,
        height: 24,
        marginTop: -3,
        textAlign: 'center',
        justifyContent: 'center',
        //BONG: 날짜 영역
        //backgroundColor: 'green',
        //borderRadius: 0,
      },
    ]);
    // append bongki.choi
    // append bongki.choi 2020.09.07
    textStyle.push([
      {
        height: 24,
        textAlign: 'center',
        lineHeight: 22.5, // android: 22.5
        letterSpacing: -0.7, // android: -0.7
        //BONG: 날짜 텍스트
        //backgroundColor: 'red',
      },
    ]);

    return (
      <TouchableWithoutFeedback
        testID={this.props.testID}
        onPress={this.onDayPress}
        onLongPress={this.onDayLongPress}
        disabled={this.props.marking.disableTouchEvent}
        accessible
        accessibilityRole={
          this.props.marking.disableTouchEvent ? undefined : 'button'
        }
        accessibilityLabel={this.props.accessibilityLabel}>
        <View
          style={[
            this.style.wrapper,
            {
              height: 48,
              borderBottomColor: 'white',
              //날짜 영역
              //borderWidth: 0.5,
              //borderColor: 'red',
            },
          ]}>
          {fillers}
          {/* 달력 날짜 */}
          <View style={containerStyle}>
            <View
              style={[
                dayTextContainer,
                // BONG: 선택영역 원형 컬러
                //{backgroundColor: 'yellow', borderRadius: 0},
              ]}>
              <Text allowFontScaling={false} style={[textStyle, fontStyle14]}>
                {String(this.props.children)}
              </Text>
            </View>
          </View>
          {/* 중간 메모 영역 | APPEND BONG. */}
          {this.createText()}
          {/* 배지 영역 | APPEND BONG. */}
          {this.crateBage()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Day;
