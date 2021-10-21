/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const { defaults: tsjPreset } = require('ts-jest/presets')

module.exports = {
  // (ts-jest) since jest is not supporting multiple preset we do it manually 
  transform: tsjPreset.transform,
  // roots: ['<rootDir>'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],

  // (wallaby) https://github.com/wallabyjs/public/issues/2291
  watchPathIgnorePatterns: [
    '<rootDir>/globalConfig.json',
  ],

  // (@shelf/jest-mongodb) https://github.com/shelfio/jest-mongodb#6-jest-watch-mode-gotcha
  globalSetup: '<rootDir>/globalSetup.js',
  preset: "@shelf/jest-mongodb"
};
