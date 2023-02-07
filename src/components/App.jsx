import React from 'react';
import { useState } from 'react';
import FeedbackOptions from './feedbackOptions/FeedbackOptions';
import Notification from './notification/Notification';
import Section from './section/Section';
import Statistics from './statistics/Statistics';

export const App = () => {
  const [votes, setVotes] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const stateNames = Object.keys(votes);

  const total = votes.good + votes.neutral + votes.bad;

  const onLeaveFeedback = option => {
    setVotes(prevState => {
      const value = prevState[option];

      return { ...prevState, [option]: value + 1 };
    });
  };

  const countPositiveFeedbackPercentage = () => {
    if (!total) {
      return 0;
    }
    const result = ((votes.good * 100) / total).toFixed();
    return Number(result);
  };

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={stateNames}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>
      {total === 0 ? (
        <Notification title="There is no feedback" />
      ) : (
        <Section title="Statistics:">
          <Statistics
            good={votes.good}
            neutral={votes.neutral}
            bad={votes.bad}
            total={total}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        </Section>
      )}
    </>
  );
};
