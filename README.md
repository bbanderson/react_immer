# react_immer
## Studying immer
<img src="https://github.com/immerjs/immer/raw/master/images/immer-logo.svg"  />

### What is immer?
```shell
yarn add immer
```

immer는 자바스크립트 객체의 불변성을 쉽게 지켜주는 라이브러리다.  
immer를 사용하지 않는다면 새로운 객체를 반환하기 위해  
Array.prototype.concat/filter 또는 ...(Spread Operator)를 사용하는데,  
이는 코드가 매우 복잡해지고 가독성이 저하된다.  
이때 immer는 불변성 유지 로직을 내부에서  대신 처리함으로써 개발자의 생산성을 돕는다.

**⭐️겉보기에는 원본을 직접 수정하는 것처럼 보이지만, immer 라이브러리가 대신 해결해 줄 뿐이다!⭐️**

---
### Usage

```js
import produce from 'immer';

const prevState = {
  foo: {
    bar: {
      baz: '',
    },
  },
};

const nextState = produce(prevState, draft => {
  draft.foo.bar.baz = 'qux';
});
```
- prevState : 변경하고자 하는 상태(원본 데이터)
- callback : 어떻게 변경할 것인지

##### **❗️callback 함수는 코드 블록 {} 처리할 것!(직접 return 되는 상황 피하기 위함)**
---
아래와 같이 produce의 첫번째 인수로 callback 함수를 전달하면 로직을 분할하여 더 깔끔하게 사용할 수 있다.
```js
import produce from 'immer';

const prevState = {
  foo: {
    bar: {
      baz: '',
    },
  },
};

const update = produce(draft => {
  draft.foo.bar.baz = 'qux';
});

const nextState = update(prevState);
```

이 방식은 useState hooks를 사용할 때 setter에 바로 적용 가능하므로 매우 편하다.
```js
import produce from 'immer';

const [state, setState] = useState({
  foo: {
    bar: {
      baz: '',
    },
  },
});

setState(produce(draft => {
  draft.foo.bar.baz = 'qux';
}));
```