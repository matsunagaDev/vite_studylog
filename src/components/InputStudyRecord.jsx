export const InputStudyRecord = (props) => {
  const { LearnContext, LearnTime, onChangeContext, onChangeTime, onClick } =
    props;
  return (
    <>
      <div>
        学習内容
        <input
          type="text"
          data-testid="inputLearningContext"
          value={LearnContext}
          onChange={onChangeContext}
        />
      </div>
      <div>
        学習時間
        <input
          type="number"
          data-testid="inputLearningTime"
          min={0}
          value={LearnTime}
          onChange={onChangeTime}
        />
        時間
      </div>
      <div>
        <p>入力されている学習内容：{LearnContext}</p>
        <p>入力されている時間：{LearnTime}時間</p>
      </div>
      <div>
        <button data-testid="addButton" onClick={onClick}>
          登録
        </button>
      </div>
    </>
  );
};
