const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

// module.exports = {
//   server: {
//     enhanceMiddleware: middleware => {
//       return (req, res, next) => {
//         if (req.url.includes('/inspector/device')) {
//           res.writeHead(200);
//           res.end();
//         } else {
//           return middleware(req, res, next);
//         }
//       };
//     },
//   },
// };
