import styled from 'styled-components';

export const ListContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const QuestionTitle = styled.h2`
  color: #333;
  margin-bottom: 15px;
`;

export const QuestionItem = styled.div`
  background-color: #fff;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

export const AnswerList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const AnswerItem = styled.li<{ isCorrect: boolean }>`
  padding: 8px;
  margin: 5px 0;
  background-color: ${props => (props.isCorrect ? '#d4edda' : '#f8f9fa')};
  border-radius: 4px;
  color: ${props => (props.isCorrect ? '#155724' : '#212529')};
`;

export const Loading = styled.p`
  text-align: center;
  color: #666;
`;

export const ErrorMessage = styled.p`
  text-align: center;
  color: #dc3545;
`;