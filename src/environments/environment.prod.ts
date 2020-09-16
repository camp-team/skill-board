export const environment = {
  production: true,
  // 現状は、開発環境と同一。
  // サービス公開のタイミングで環境作成 #131
  firebase: {
    apiKey: 'AIzaSyCYWU4ccRrMwo0pgL-VrisEAFqLPOAdbLk',
    authDomain: 'skill-board-bbe02.firebaseapp.com',
    databaseURL: 'https://skill-board-bbe02.firebaseio.com',
    projectId: 'skill-board-bbe02',
    storageBucket: 'skill-board-bbe02.appspot.com',
    messagingSenderId: '323121777520',
    appId: '1:323121777520:web:4fa8afb8c60d9badef9db5',
    measurementId: 'G-10ZZH9657X',
  },
  algolia: {
    appId: 'PU529L6FSF',
    searchKey: '371420ca707829c272e2a7eccd88a85b',
  },
};
