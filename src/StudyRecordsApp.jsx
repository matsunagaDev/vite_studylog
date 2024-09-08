import { useEffect, useState } from 'react';
import './App.css';
import {
  addRecord,
  deleteRecord,
  getAllRecords,
} from '../util/supabaseFunction';
import { InputStudyRecord } from './components/InputStudyRecord';
import { ListStudyRecords } from './components/ListStudyRecords';

export const StudyRecordsApp = () => {
  /**
   * @Hooks
   */
  // 学習内容
  const [inputLearnContext, setInputLearnContext] = useState('');
  // 学習時間
  const [inputLearnTime, setInputLearnTime] = useState(0);
  // 一覧表示
  const [records, setRecords] = useState([]);
  // 学習内容のテキストボックス
  const onChangeLearningContext = (e) => setInputLearnContext(e.target.value);
  // 学習時間のテキストボックス
  const onChangeTime = (e) => setInputLearnTime(e.target.value);

  const [error, setError] = useState(false);
  const [learnContextError, setLearnContextError] = useState(false);
  const [learnTimeError, setLearnTimeError] = useState(false);
  const [sumTime, setSumTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * @function
   */
  // 追加
  const onClickAdd = async () => {
    // エラーメッセージを非表示
    setError(false);
    setLearnContextError(false);
    setLearnTimeError(false);

    // 入力項目が空の場合エラーメッセージを表示
    if (!inputLearnContext && (!inputLearnTime || inputLearnTime == 0)) {
      setError(true);
      return;
    } else if (!inputLearnContext) {
      setLearnContextError(true);
      return;
    } else if (!inputLearnTime || inputLearnTime == 0) {
      setLearnTimeError(true);
      return;
    }

    // データベースに追加
    await addRecord(inputLearnContext, inputLearnTime);

    // 最新のレコードを取得
    const updateRecords = await getAllRecords();
    setRecords(updateRecords);

    // 合計時間を計算
    let total = updateRecords.reduce(
      (sum, current) => parseInt(sum) + current.learn_time,
      0
    );
    setSumTime(total);

    // 入力項目をリセット
    setInputLearnContext('');
    setInputLearnTime(0);
  };

  // 削除
  const onClickDelete = async (id) => {
    await deleteRecord(id);

    // 最新のレコードを取得
    const updateRecords = await getAllRecords();
    setRecords(updateRecords);

    // 合計時間を計算
    let total = updateRecords.reduce(
      (sum, current) => parseInt(sum) + current.learn_time,
      0
    );
    setSumTime(total);
  };

  // 最初のロード時のみ実行
  useEffect(() => {
    try {
      // データベースから学習記録一覧を取得
      const getAll = async () => {
        const AllRecords = await getAllRecords();
        setRecords(AllRecords);

        // 合計時間を計算
        let total = AllRecords.reduce(
          (sum, current) => parseInt(sum) + current.learn_time,
          0
        );
        setSumTime(total);
      };

      getAll();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * @jsx
   */
  if (isLoading) {
    // ロード中の場合はローディング画面
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  } else {
    return (
      <>
        <h1 data-testid="title">学習記録一覧</h1>

        <InputStudyRecord
          LearnContext={inputLearnContext}
          LearnTime={inputLearnTime}
          onChangeContext={onChangeLearningContext}
          onChangeTime={onChangeTime}
          onClick={onClickAdd}
        />

        {error && (
          <p style={{ color: 'red' }}>入力されていない項目があります</p>
        )}
        {learnContextError && (
          <p data-testid="learnContextError" style={{ color: 'red' }}>
            学習内容を入力してください
          </p>
        )}
        {learnTimeError && (
          <p style={{ color: 'red' }}>学習時間を入力してください</p>
        )}

        <ListStudyRecords
          records={records}
          onClickDelete={onClickDelete}
          sumTime={sumTime}
        />
      </>
    );
  }
};
