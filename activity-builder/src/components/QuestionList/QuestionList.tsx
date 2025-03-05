import React, { useState, useEffect } from 'react';
import {
  ListContainer,
  QuestionTitle,
  QuestionItem,
  AnswerList,
  AnswerItem,
  Loading,
  ErrorMessage,
} from './QuestionList.styles';
import { Question } from '../../types/question';

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