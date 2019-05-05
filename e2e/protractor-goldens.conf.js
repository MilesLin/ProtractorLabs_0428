let config = require('./protractor.conf.js').config;
// 如果 UPDATE_GOLDENS 為 "1" 或 "true" 則會自動更新 Golden 圖片
process.env['UPDATE_GOLDENS'] = "false";
// 設定只有以下這些 e2e-spec.ts 才會執行畫面截圖比對
config.specs = ['./src/labs/golden.e2e-spec.ts', './src/labs/golden-gif.e2e-spec.ts'];
exports.config = config;
