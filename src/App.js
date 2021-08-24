import produce from 'immer';
import { useCallback, useRef, useState } from 'react';

function App() {
  const id = useRef(1);
  const [form, setForm] = useState({ username: '', name: '' });
  const [data, setData] = useState({ array: [], uselessValue: null });

  // input 수정을 위한 함수
  const onChange = useCallback((e) => {
    setForm(
      produce((draft) => {
        draft[e.target.name] = e.target.value;
      }),
    );
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (form.username === '' || form.name === '') return;

      const info = {
        id: id.current,
        username: form.username,
        name: form.name,
      };

      setData(
        produce((draft) => {
          draft.array.push(info);
        }),
      );

      setForm({ username: '', name: '' });

      id.current++;
    },
    [form],
  );

  const onRemove = useCallback((id) => {
    // ❗️ immer가 항상 유리한 것은 아니다. 이 경우에는 filter가 더 가독성이 좋다.
    // setData({ ...data, array: data.array.filter((v) => v.id !== id) });
    setData(
      produce((draft) => {
        draft.array.splice(
          draft.array.findIndex((v) => v.id === id),
          1,
        );
      }),
    );
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          placeholder="아이디"
          value={form.username}
          onChange={onChange}
        />
        <input
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>
      <div>
        <ul>
          {data.array.map((v) => (
            <li key={v.id} onClick={() => onRemove(v.id)}>
              {v.username} ({v.name})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
