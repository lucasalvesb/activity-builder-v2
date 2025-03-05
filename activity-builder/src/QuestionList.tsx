import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Question } from './question'; // Adjust the path based on your file structure

// Styled components for the QuestionList
const ListContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const QuestionTitle = styled.h2`
  color: #333;
  margin-bottom: 15px;
`;

const QuestionItem = styled.div`
  background-color: #fff;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const AnswerList = styled.ul`
  list-style: none;
  padding: 0;
`;

const AnswerItem = styled.li<{ isCorrect: boolean }>`
  padding: 8px;
  margin: 5px 0;
  background-color: ${props => (props.isCorrect ? '#d4edda' : '#f8f9fa')};
  border-radius: 4px;
  color: ${props => (props.isCorrect ? '#155724' : '#212529')};
`;

const Loading = styled.p`
  text-align: center;
  color: #666;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: #dc3545;
`;

const QuestionList: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:5217/api/questions');
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        setQuestions(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return <Loading>Loading questions...</Loading>;
  }

  if (error) {
    return <ErrorMessage>Error: {error}</ErrorMessage>;
  }

  return (
    <ListContainer>
      <QuestionTitle>Submitted Questions</QuestionTitle>
      {questions.length === 0 ? (
        <p>No questions submitted yet.</p>
      ) : (
        questions.map((question) => (
          <QuestionItem key={question.id}>
            <h3>{question.text}</h3>
            <AnswerList>
              {question.answers.map((answer, index) => (
                <AnswerItem key={index} isCorrect={answer.isCorrect}>
                  {answer.text} {answer.isCorrect && '(Correct)'}
                </AnswerItem>
              ))}
            </AnswerList>
          </QuestionItem>
        ))
      )}
    </ListContainer>
  );
};

export default QuestionList;