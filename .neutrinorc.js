module.exports = {
  use: [
    ['neutrino-preset-airbnb-base'],
    ['neutrino-middleware-styles-loader'],
    [
      'neutrino-preset-web',
      {
        html: {
          title: 'Neutrino-shop'
        }
      }
    ],
  ]
};