# validator

数据验证

## 安装

CDN

```html
<script src="https://unpkg.com/@yorkjs/validator"></script>
<script>

</script>
```

NPM

```shell
npm install @yorkjs/validator
```

```js
import { Validator } from '@yorkjs/validator'
```

YARN

```shell
yarn add @yorkjs/validator
```

```js
import { Validator } from '@yorkjs/validator'
```

## API

## 兼容性

全平台适用，但需要确认以下函数是否存在：

```
Object.assign
Array.isArray
```

如不存在，请自行打补丁。