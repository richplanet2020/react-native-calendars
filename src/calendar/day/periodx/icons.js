import React from 'react';
import {StyleSheet, Image} from 'react-native';

const styles = StyleSheet.create({
  // icon style
  iconStyle: {
    height: 12,
    width: 12,
    marginRight: 0.5, // append bong.choi, 2020.8.3
    marginLeft: 0.5, // append  bong.choi, 2020.8.3

    //BONG:아이콘 박스
    //borderColor: 'black',
    //borderWidth: 0.5,
  },
  iconTextStyle: {
    height: 12,
    width: 12,
    fontSize: 8,
    fontWeight: 'normal',
    lineHeight: 12,
    letterSpacing: -0.4,
    textAlign: 'left',
    color: '#000000',
    paddingLeft: 2,
    marginRight: 0.5, // append bong.choi, 2020.8.3
    marginLeft: 0.5, // append bong.choi, 2020.8.3
  },
  iconContainer: {
    height: 12,
    width: 40,
    flexDirection: 'row',
    justifyContent: 'center', // append bong.choi, 2020.8.3
    //backgroundColor: 'blue', // append bongki.choi, 2020.8.10
  },
  // 캘린더 날짜문구 영역 스타일 [s]
  textContainer: {
    height: 13,
    width: 40,
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 8,
    textAlign: 'center',
  },
  // 캘린더 날짜문구 영역 스타일 [e]
  selectedStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

const iconList = {
  // 생리(I01)
  I01: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcMensN.png')}
    />
  ),
  // 생리종료(I02)
  I02: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcMensEndN.png')}
    />
  ),
  // 부정출혈(I03)
  BL09: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcBleedingArrhythmiaN.png')}
    />
  ),
  // 출혈(적음)(I04)
  BL01: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcBleedingx1N.png')}
    />
  ),
  // 출혈(보통)(I05)
  BL02: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcBleedingx5N.png')}
    />
  ),
  // 출혈(많음)(I06)
  BL03: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcBleedingx10N.png')}
    />
  ),
  // 통증(없음)
  PA01: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcPainlessN.png')}
    />
  ),
  // 통증(보통)
  PA02: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcPainN.png')}
    />
  ),
  // 통증(심함)
  PA03: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcAgonyN.png')}
    />
  ),
  // 피임(I10)
  LO01: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcContraceptionN.png')}
    />
  ),
  // 피임안함(I11)
  LO02: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcNoContraceptionN.png')}
    />
  ),
  // 체외사정(I12)
  LO03: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcSexExternalN.png')}
    />
  ),
  // 일정(I13)
  I13: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcScheduleN.png')}
    />
  ),
  // 예방접종(I14)
  vac: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcVaccineN.png')}
    />
  ),
  // 약복용(I15)
  drg: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcMedicineN.png')}
    />
  ),
  // 사랑(I16)
  lov: (
    <Image style={styles.iconStyle} source={require('../../img/bIcSexN.png')} />
  ),
  // 병원진료(I17)
  trt: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcHospitalN.png')}
    />
  ),
  // 알림(I18)
  I18: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcNotificationN.png')}
    />
  ),
  // 배란테스트(I19)
  ovu: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcOvulationTestKitN.png')}
    />
  ),
  // 임신테스트(I20)
  pre: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcPregTestKitN.png')}
    />
  ),
  // 기초체온(I21)
  tem: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcThermoN.png')}
    />
  ),
  // 인공수정(I22)
  iui: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcInVivoN.png')}
    />
  ),
  // 시험관시술(I23)
  ivf: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcInVitroN.png')}
    />
  ),
  // 소화불량(I24)
  I24: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcDigestantN.png')}
    />
  ),
  // 체중기록(I25)
  wt: (
    <Image style={styles.iconStyle} source={require('../../img/bIcBmiN.png')} />
  ),
  // 알람(I26)
  I26: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcAlarmN.png')}
    />
  ),
  // 감기(I27)
  I27: (
    <Image style={styles.iconStyle} source={require('../../img/bIcFluN.png')} />
  ),
  // 두통(I28)
  I28: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcHeadacheN.png')}
    />
  ),
  // 메모(I29)
  mem: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcMemoN.png')}
    />
  ),
  // 한약(I30)
  I30: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcOrientalMedicineN.png')}
    />
  ),
  // 알약(I31)
  I31: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcPainRelieverN.png')}
    />
  ),
  // 피임약(I32)
  I32: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcPillN.png')}
    />
  ),
  // 초음파사진(I33)
  emh: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcSonogramN.png')}
    />
  ),
  // 초음파사진(I33)
  emp: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcSonogramN.png')}
    />
  ),
  // 공사중(I34)
  I34: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcUnderConN.png')}
    />
  ),
  // 배란(I35)
  I35: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcOvluationN.png')}
    />
  ),
};

export {styles, iconList};
