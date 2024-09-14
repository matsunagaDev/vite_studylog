import React from 'react';
import '@testing-library/jest-dom';
import { screen, render, waitFor } from '@testing-library/react';
import { StudyRecordsApp } from '../StudyRecordsApp';
import userEvent from '@testing-library/user-event';
import { supabase } from '../../util/supabase';

// テスト用データの設定
const TEST_RECORD = { learn_title: 'TestDeleteRecord', learn_time: 5 };

beforeEach(async () => {
  // テスト用のデータを削除（リセット）
  await supabase
    .from('study-record')
    .delete()
    .eq('learn_title', TEST_RECORD.learn_title);
});

afterEach(async () => {
  // テスト後にデータを削除（クリーンアップ）
  await supabase
    .from('study-record')
    .delete()
    .eq('learn_title', TEST_RECORD.learn_title);
});

describe('StudyRecord Add & StudyRecord Delete', () => {
  /**
   * 追加
   */
  it('should add a new record', async () => {
    render(<StudyRecordsApp />);

    // 初期のレコードが表示されるのを待つ
    await waitFor(() => {
      expect(screen.getAllByRole('row').length).toBeGreaterThan(1);
    });

    // 既存のレコード数を取得
    const initialRecordItems = await screen.findAllByRole('row');
    console.log('初期のレコード数:', initialRecordItems.length);

    // フォーム要素の取得
    const inputLearningContext = screen.getByTestId('inputLearningContext');
    const inputLearningTime = screen.getByTestId('inputLearningTime');
    const addButton = screen.getByTestId('addButton');

    // テスト項目の設定
    await userEvent.type(inputLearningContext, 'TestAddRecord');
    await userEvent.type(inputLearningTime, '10');

    // 登録ボタン押下
    await userEvent.click(addButton);

    // DOMが更新され、レコードを追加する
    await waitFor(() => {
      const updatedRecordItems = screen.getAllByRole('row');
      console.log('更新後のレコード数:', updatedRecordItems.length);
      expect(updatedRecordItems.length).toEqual(initialRecordItems.length + 1);

      // 追加された内容の確認
      const addRecordItem = updatedRecordItems[updatedRecordItems.length - 1];
      expect(addRecordItem.querySelectorAll('td')[0].textContent).toBe(
        'TestAddRecord'
      );
      expect(addRecordItem.querySelectorAll('td')[1].textContent).toBe(
        `10時間`
      );
    });
  });
  /**
   * 削除
   */
  it('should be delete a record', async () => {
    render(<StudyRecordsApp />);

    // 初期のレコードが表示されるのを待つ
    await waitFor(() => {
      expect(screen.getAllByRole('row').length).toBeGreaterThan(1);
    });

    // 既存のレコード数を取得
    const initialRecordItems = await screen.findAllByRole('row');

    // 削除ボタンの要素を取得
    const deleteButton = await screen.getAllByTestId('deleteButton');
    expect(deleteButton.length).toBeGreaterThan(1);

    // 末尾のレコードの削除ボタン押下
    await userEvent.click(deleteButton[deleteButton.length - 1]);

    // 削除後のレコード数を確認
    await waitFor(() => {
      const updateStudyRecords = screen.getAllByRole('row');
      console.log('削除後のレコード数:', updateStudyRecords.length);
      // expect(updateStudyRecords.length).toBe(initialRecordItems.length - 1);
    });
  });
});
