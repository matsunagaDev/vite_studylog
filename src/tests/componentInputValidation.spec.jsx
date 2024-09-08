import React from 'react';
import '@testing-library/jest-dom';
import { screen, render, waitFor } from '@testing-library/react';

import { StudyRecordsApp } from '../StudyRecordsApp';
import userEvent from '@testing-library/user-event';

describe('input validation', () => {
  /**
   * 学習内容の未入力チェック
   */
  it('show an error message when learn context is empty', async () => {
    render(<StudyRecordsApp />);

    // 学習内容を空に設定
    const learningContext = screen.getByTestId('inputLearningContext');
    await userEvent.clear(learningContext);

    // 学習時間に値を設定
    const learningTime = screen.getByTestId('inputLearningTime');
    await userEvent.type(learningTime, '5');

    // 登録ボタンをクリック
    const addButton = screen.getByTestId('addButton');
    await userEvent.click(addButton);

    // 学習内容が未入力時のエラーメッセージが出力される
    await waitFor(() => {
      expect(
        screen.getByText('学習内容を入力してください')
      ).toBeInTheDocument();
    });
  });

  /**
   * 学習時間の未入力チェック
   */
  it('show an error message when learn time is empty', async () => {
    render(<StudyRecordsApp />);

    // 学習内容を空に設定
    const learningContext = screen.getByTestId('inputLearningContext');
    await userEvent.type(learningContext, 'learning context check');

    // 学習時間に値を設定
    const learningTime = screen.getByTestId('inputLearningTime');
    await userEvent.clear(learningTime);

    // 登録ボタンをクリック
    const addButton = screen.getByTestId('addButton');
    await userEvent.click(addButton);

    // 学習時間が未入力時のエラーメッセージが出力される
    await waitFor(() => {
      expect(
        screen.getByText('学習時間を入力してください')
      ).toBeInTheDocument();
    });
  });

  /**
   * 学習内容と学習時間の未入力チェック
   */
  it('show an error message when both learn context and learn time are empty', async () => {
    render(<StudyRecordsApp />);

    // 学習内容を空に設定
    const learningContext = screen.getByTestId('inputLearningContext');
    await userEvent.clear(learningContext);

    // 学習時間に値を設定
    const learningTime = screen.getByTestId('inputLearningTime');
    await userEvent.clear(learningTime);

    // 登録ボタンをクリック
    const addButton = screen.getByTestId('addButton');
    await userEvent.click(addButton);

    // 学習時間と学習内容が未入力時のエラーメッセージが出力される
    await waitFor(() => {
      expect(
        screen.getByText('入力されていない項目があります')
      ).toBeInTheDocument();
    });
  });
});
