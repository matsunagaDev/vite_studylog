import { render, screen } from '@testing-library/react';
import React from 'react';
import { StudyRecordsApp } from '../StudyRecordsApp';
import '@testing-library/jest-dom';

describe('Title Test', () => {
  it('タイトルが学習記録一覧であること', () => {
    // testId(title)を指定して取得
    render(<StudyRecordsApp />);
    const title = screen.getByTestId('title');
    expect(title).toHaveTextContent('学習記録一覧');
  });
});
