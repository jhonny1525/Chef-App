import React from 'react';
import { View, ScrollView } from 'react-native';
import {
  Button,
  Text,
  TextInput,
  Title,
  Checkbox,
  Card,
} from 'react-native-paper';
import { Formik } from 'formik';
import styled from 'styled-components/native';

import * as Yup from 'yup';

import styles from './styles';
import { useDispatch } from 'react-redux';
import * as types from '../../store/actions/types';
import NavigationService from '../../navigation/NavigationService';

interface RecipeDetailsForm {
  recipeName: string;
  dishType: Array<String>;
  occasionType: Array<String>;
  cuisineType: Array<String>;
  recipeType: string;
}

const RecipeDetailsSchema = Yup.object().shape({
  recipeName: Yup.string().required('Name Required'),
  dishType: Yup.array()
    .min(1, 'Please select at least one ')
    .required('Dish Type Required'),
  cuisineType: Yup.array()
    .min(1, 'Please select at least one ')
    .required('Cuisine Type Required'),
  recipeType: Yup.string().required('Recipe Type Required'),
});

const dummyValuesType = ['Dessert', 'starter', 'drink'];

const dummyValuesTypeOccasion = ['Christmas', 'Diwali', 'Weekend'];

const dummyValuesCuisine = ['Asian', 'Chinese', 'European'];

const ErrorText = styled(Text)`
  color: red;
`;

const StyledCard = styled(Card)`
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-top: 10px;
`;

const Home: React.FC = () => {
  const initialValues: RecipeDetailsForm = {
    recipeName: '',
    dishType: [],
    occasionType: [],
    cuisineType: [],
    recipeType: '',
  };

  const dispatch = useDispatch();

  const onUpdateRecipe = (data: any) =>
    dispatch({
      type: types.UPDATE_RECIPE,
      data,
    });

  return (
    <View style={styles.container}>
      <Title>Enter Recipe Details</Title>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          onUpdateRecipe(values);
          NavigationService.navigate('RecipePortions');
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
              <StyledCard>
                <TextInput
                  onChangeText={handleChange('recipeName')}
                  onBlur={handleBlur('recipeName')}
                  mode={'outlined'}
                  error={Boolean(errors?.recipeName)}
                  value={values.recipeName}
                  placeholder={'Name'}
                />
                <ErrorText>{errors?.recipeName}</ErrorText>
              </StyledCard>

              <CheckBoxForm
                formikValues={values.dishType}
                values={dummyValuesType}
                title={'Dish Type'}
                onChange={(values: any) => {
                  setFieldValue('dishType', values);
                  rest.setFieldTouched('dishType', true);
                }}
              />
              <ErrorText>{errors?.dishType}</ErrorText>

              <CheckBoxForm
                formikValues={values.occasionType}
                values={dummyValuesTypeOccasion}
                title={'Occasion'}
                onChange={(values: any) => {
                  setFieldValue('occasionType', values);
                  rest.setFieldTouched('occasionType', true);
                }}
              />
              <ErrorText>{errors?.occasionType}</ErrorText>

              <CheckBoxForm
                formikValues={values.cuisineType}
                values={dummyValuesCuisine}
                title={'Cuisine'}
                onChange={(values: any) => {
                  setFieldValue('cuisineType', values);
                  rest.setFieldTouched('cuisineType', true);
                }}
              />
              <ErrorText>{errors?.cuisineType}</ErrorText>

              <StyledCard>
                <TextInput
                  onChangeText={handleChange('recipeType')}
                  onBlur={handleBlur('recipeType')}
                  mode={'outlined'}
                  error={Boolean(errors?.recipeType)}
                  value={values.recipeType}
                  placeholder={'Type'}
                />
                <ErrorText>{errors?.recipeType}</ErrorText>
              </StyledCard>
            </ScrollView>
              <Button mode="contained" onPress={handleSubmit}>
                Next
              </Button>
          </>
        )}
      </Formik>
    </View>
  );
};

export default Home;

const CheckBoxForm = ({ values, formikValues, onChange, title }) => {
  const onPressCheckbox = (value: any) => {
    if (!formikValues.includes(value)) {
      onChange([...formikValues, value]);
    } else {
      onChange([...formikValues].filter((v) => v !== value));
    }
  };

  return (
    <StyledCard>
      <Title>{title}</Title>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {values.map((v, i) => (
          <Checkbox.Item
            onPress={() => {
              onPressCheckbox(v);
            }}
            key={'form' + v}
            label={v}
            status={formikValues.includes(v) ? 'checked' : 'unchecked'}
          />
        ))}
      </View>
    </StyledCard>
  );
};
