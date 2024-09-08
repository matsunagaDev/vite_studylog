export const ListStudyRecords = (props) => {
  const { records, onClickDelete, sumTime } = props;
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>学習内容</th>
            <th>学習時間</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => {
            return (
              <tr key={record.id || index}>
                <td>{record.learn_title}</td>
                <td>{record.learn_time}時間</td>
                <td>
                  <button
                    onClick={() => onClickDelete(record.id)}
                    data-testid="deleteButton"
                  >
                    削除
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>合計時間：{sumTime}/1000(h)</p>
    </>
  );
};
