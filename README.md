# GeneratorAPI extendPackage duplicate vue.config.js configuration bug

This repository reproduces a bug when using the `GeneratorAPI` `extendPackage` to add some configuration options.

## Explanations

When `extendPackage` is used to add configuration options into `pluginOptions`, if the `pluginOptions` key is written as JSON string (like this: `"pluginOptions"`), the configuration is duplicated.

Although the duplicated conf is merged correctly, the old configuration still remains and an error is generated.

The workaround is very simple as it only require to write `pluginOptions` as a JS object (= not as string) to work perfectly, but I think this is still something worth mentionning.

## To reproduce

1) Clone the repo on your computer

2) cd into plugin-test/test-plugin

3) Run `npm install --save-dev ./../some-plugin`

4) Run `vue invoke vue-cli-plugin-test`

5) Watch the result :)

6) You can remove the plugin afterward

## Results

### Init

#### plugin

```
module.exports = (api, options, rootOptions) => {
    api.extendPackage(
        {
            vue: {
              "pluginOptions": {
                someOptions: {
                  option1: "option1",
                  option2: "option2",
                },
              },
            },
          },
          { merge: true },
    )
}
```

#### config
```
module.exports = {
  "pluginOptions": {
    i18n: {
      locale: 'fr',
      fallbackLocale: 'fr',
      localeDir: 'locales',
      enableInSFC: true
    },
    "testOptions": {
      "test1": 'test',
      "test2": 'test2'
    },
    someOptions: {
        option1: 'option2',
        option2: 'option3'
      }
  }
}
```

### Expected
#### vue.config.js
```
module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'fr',
      fallbackLocale: 'fr',
      localeDir: 'locales',
      enableInSFC: true
    },
    testOptions: {
      test1: 'test',
      test2: 'test2'
    },
    someOptions: {
        option1: 'option1',
        option2: 'option2'
      }
  }
}
```

### Actual
#### vue.config.js

```
module.exports = {
  "pluginOptions": {
    i18n: {
      locale: 'fr',
      fallbackLocale: 'fr',
      localeDir: 'locales',
      enableInSFC: true
    },
    "testOptions": {
      "test1": 'test',
      "test2": 'test2'
    },
    someOptions: {
        option1: 'option2',
        option2: 'option3'
      }
  },

  pluginOptions: {
    i18n: {
      locale: 'fr',
      fallbackLocale: 'fr',
      localeDir: 'locales',
      enableInSFC: true
    },
    testOptions: {
      test1: 'test',
      test2: 'test2'
    },
    someOptions: {
      option1: 'option1',
      option2: 'option2'
    }
  }
}
```

#### Error
```error: Duplicate key 'pluginOptions' (no-dupe-keys)```
