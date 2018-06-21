# Interview task

Data transformation is done in `Data transformation.ipynb`.

```
pipenv install
pipenv run jupyter notebook
```

Flat structure is pickled to avoid having to setup DB. I think it's appropriate for this task.

Data are then stored in `synsets.json`. This file is used as datasource for next.js application.

```
npm install
npm run dev
```

You can see the result on https://elegant-einstein-e00108.netlify.com/