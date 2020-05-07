import React from 'react';
import {StyleSheet, Image} from 'react-native';

const styles = StyleSheet.create({
  // icon style
  iconStyle: {height: 12, width: 12},
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
  },
  iconContainer: {height: 12, width: 40, flexDirection: 'row'},
  // text style
  textContainer: {height: 13, width: 40},
  textStyle: {fontSize: 8, textAlign: 'center'},
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
  I01: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcMensN.png')}
    />
  ),
  I02: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcMensEndN.png')}
    />
  ),
  I03: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcBleedingArrhythmiaN.png')}
    />
  ),
  I04: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcBleedingx1N.png')}
    />
  ),
  I05: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcBleedingx5N.png')}
    />
  ),
  I06: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcBleedingx10N.png')}
    />
  ),
  I07: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcPainlessN.png')}
    />
  ),
  I08: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcPainN.png')}
    />
  ),
  I09: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcAgonyN.png')}
    />
  ),
  I10: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcContraceptionN.png')}
    />
  ),
  I11: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcNoContraceptionN.png')}
    />
  ),
  I12: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcSexExternalN.png')}
    />
  ),
  I13: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcScheduleN.png')}
    />
  ),
  I14: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcVaccineN.png')}
    />
  ),
  I15: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcMedicineN.png')}
    />
  ),
  I16: (
    <Image style={styles.iconStyle} source={require('../../img/bIcSexN.png')} />
  ),
  I17: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcHospitalN.png')}
    />
  ),
  I18: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcNotificationN.png')}
    />
  ),
  I19: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcOvulationTestKitN.png')}
    />
  ),
  I20: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcPregTestKitN.png')}
    />
  ),
  I21: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcThermoN.png')}
    />
  ),
  I22: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcInVivoN.png')}
    />
  ),
  I23: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcInVitroN.png')}
    />
  ),
  I24: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcDigestantN.png')}
    />
  ),
  I25: (
    <Image style={styles.iconStyle} source={require('../../img/bIcBmiN.png')} />
  ),
  I26: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcAlarmN.png')}
    />
  ),
  I27: (
    <Image style={styles.iconStyle} source={require('../../img/bIcFluN.png')} />
  ),
  I28: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcHeadacheN.png')}
    />
  ),
  I29: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcMemoN.png')}
    />
  ),
  I30: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcOrientalMedicineN.png')}
    />
  ),
  I31: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcPainRelieverN.png')}
    />
  ),
  I32: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcPillN.png')}
    />
  ),
  I33: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcSonogramN.png')}
    />
  ),
  I34: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcUnderConN.png')}
    />
  ),
  I35: (
    <Image
      style={styles.iconStyle}
      source={require('../../img/bIcOvluationN.png')}
    />
  ),
};

export {styles, iconList};
