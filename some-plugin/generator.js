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