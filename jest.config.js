/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const { defaults: tsjPreset } = require('ts-jest/presets')

module.exports = {

  // https://github.com/wallabyjs/public/issues/2291
  globalSetup: '<rootDir>/globalSetup.js',

  // for ts-jest , since jest is not supporting multiple preset we do it manually 
  transform: tsjPreset.transform,
  // rootDir: './lib',
  // roots: ['<rootDir>'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],

  // 
  preset: "@shelf/jest-mongodb"
};
