import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import {
  Button,
  Text,
  TextInput,
  Title,
  Checkbox,
  RadioButton,
} from 'react-native-paper';
import { Formik } from 'formik';
import styled from 'styled-components/native';
import Slider from 'react-native-slider';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import * as Yup from 'yup';

import styles from './styles';
import { useDispatch } from 'react-redux';
import * as types from '../../store/actions/types';
import NavigationService from "../../navigation/NavigationService";

const RecipeDetailsSchema = Yup.object().shape({
  portionType: Yup.string().required('Portion Required'),
  portionSize: Yup.number().required('Portion Size Required'),
});

const RecipePortions: React.FC = () => {

  const initialValues: any = {
    portionType: 'pieces',
    portionSize: 1,
  };

  const dispatch = useDispatch();
  const onUpdateRecipe = (data: any) =>
    dispatch({
      type: types.UPDATE_RECIPE,
      data,
    });

  return (
    <View style={styles.container}>
      <Title>Enter Portion and Time Details</Title>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          onUpdateRecipe(values);
          NavigationService.navigate('Preview')
        }}
        validationSchema={RecipeDetailsSchema}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          setFieldValue,
          ...rest
        }) => (
          <>
            <ScrollView style={{ flex: 1 }}>
              <Text>{JSON.stringify(values)}</Text>
              <Title>Portion Type</Title>
              <RadioButton.Group
                onValueChange={(value) => setFieldValue('portionType', value)}
                value={values.portionType}>
                <RadioButton.Item label="Servings" value="servings" />
                <RadioButton.Item label="Pieces" value="pieces" />
              </RadioButton.Group>
              <Title>Portion Size</Title>
              <Slider
                value={values.portionSize}
                minimumValue={1}
                maximumValue={100}
                step={1}
                onValueChange={(value: any) =>
                  setFieldValue('portionSize', value)
                }
              />
              <Text>{values.portionSize}</Text>
            </ScrollView>
              <Button mode="outlined" onPress={NavigationService.goBack}>
                  Previous
              </Button>
            <Button mode="outlined" onPress={() => {
              handleSubmit();
            }}>
              Save
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
};

export default RecipePortions;
