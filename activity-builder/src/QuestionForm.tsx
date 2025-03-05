import React, { useState } from 'react';
import {
  Container,
  Title,
  Form,
  InputGroup,
  Label,
  Input,
  AnswersSection,
  AnswerGroup,
  CheckboxContainer,
  Checkbox,
  AddButton,
  RemoveButton,
  SaveButton,
} from './QuestionForm.styles'

import axios from 'axios';


interface Answer {
  text: string;
  isCorrect: boolean;
}


const QuestionForm: React.FC = () => {
  const [question, setQuestion] = useState<string>('');
  const [answers, setAnswers] = useState<Answer[]>([{ text: '', isCorrect: false }]);

  // Handle input changes for question and answers
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value);

  const handleAnswerChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers = [...answers];
    newAnswers[index].text = e.target.value;
    setAnswers(newAnswers);
  };

  const handleCheckboxChange = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[index].isCorrect = !newAnswers[index].isCorrect;
    setAnswers(newAnswers);
  };

  const addAnswerField = () => {
    setAnswers([...answers, { text: '', isCorrect: false }]);
  };

  const removeAnswerField = (index: number) => {
    const newAnswers = answers.filter((_, i) => i !== index);
    setAnswers(newAnswers);
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!question || answers.length < 2 || !answers.some(a => a.isCorrect)) {
      alert('Please complete the question and mark at least one answer as correct.');
      return;
    }

    // Send data to backend API
    try {
      const response = await axios.post('http://localhost:5217/api/questions', {
        text: question,
        answers: answers.map(a => ({
          text: a.text,
          isCorrect: a.isCorrect,
        })),
      });
      console.log('Question saved:', response.data);
      // Clear the form
      setQuestion('');
      setAnswers([{ text: '', isCorrect: false }]);
    } catch (error) {
      console.error('Error saving question:', error);
    }
  };

  return (
    <Container>
      <Title>Create a Question</Title>
      
      <Form onSubmit={submitForm}>
        <InputGroup>
          <Label htmlFor="question">Question</Label>
          <Input
            id="question"
            type="text"
            value={question}
            onChange={handleQuestionChange}
            required
            placeholder="Enter your question here"
          />
        </InputGroup>

        <AnswersSection>
          <h4>Answers</h4>
          {answers.map((answer, index) => (
            <AnswerGroup key={index}>
              <Input
                type="text"
                value={answer.text}
                onChange={(e) => handleAnswerChange(index, e)}
                required
                placeholder={`Answer ${index + 1}`}
              />
              
              <CheckboxContainer>
                <Checkbox
                  type="checkbox"
                  checked={answer.isCorrect}
                  onChange={() => handleCheckboxChange(index)}
                />
                <span>{answer.isCorrect ? 'Correct' : 'Not Correct'}</span>
              </CheckboxContainer>
              
              {answers.length > 1 && (
                <RemoveButton
                  type="button"
                  onClick={() => removeAnswerField(index)}
                >
                  Remove Answer
                </RemoveButton>
              )}
            </AnswerGroup>
          ))}
          
          <AddButton
            type="button"
            onClick={addAnswerField}
          >
            Add Answer
          </AddButton>
        </AnswersSection>

        <SaveButton
          type="submit"
        >
          Save Question
        </SaveButton>
      </Form>
    </Container>
  );
};

export default QuestionForm;