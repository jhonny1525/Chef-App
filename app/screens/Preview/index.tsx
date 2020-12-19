import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Button, Title, Card } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

import * as loginActions from 'app/store/actions/loginActions';
import styles from './styles';
import NavigationService from 'app/navigation/NavigationService';

const StyledCard = styled(Card)`
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-top: 10px;
`;

const Preview: React.FC = () => {
  const recipe = useSelector((state: any) => state.recipeReducer);

  const dispatch = useDispatch();
  const onLogin = () => dispatch(loginActions.requestLogin('test', '1234'));
  const onForgot = () => NavigationService.navigate('ForgotPassword');
  return (
    <View style={styles.container}>
      <ScrollView>
        <StyledCard>
          <Title style={styles.login}>Name</Title>
          <Text>{recipe.recipeName}</Text>
        </StyledCard>
        <StyledCard>
          <Title style={styles.login}>Dish Type</Title>
          {recipe.dishType.map((v) => (
            <Text>{v}</Text>
          ))}
        </StyledCard>
        <StyledCard>
          <Title style={styles.login}>Occasion</Title>
          {recipe.occasionType.map((v) => (
            <Text>{v}</Text>
          ))}
        </StyledCard>
        <StyledCard>
          <Title style={styles.login}>Cuisine Type</Title>
          {recipe.cuisineType.map((v) => (
            <Text>{v}</Text>
          ))}
        </StyledCard>
        <StyledCard>
          <Title style={styles.login}>Recipe Type</Title>
          <Text>{recipe.recipeType}</Text>
        </StyledCard>
        <StyledCard>
          <Title style={styles.login}>Portion Type</Title>
          <Text>{recipe.portionType}</Text>
        </StyledCard>
        <StyledCard>
          <Title style={styles.login}>Portion Size</Title>
          <Text>{recipe.portionSize}</Text>
        </StyledCard>
      </ScrollView>
    </View>
  );
};

export default Preview;
