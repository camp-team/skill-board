import * as functions from 'firebase-functions';

/**
 * firebase.tokenによる簡易認証.
 * @param req
 */
export const auth = function (req: functions.https.Request): boolean {
  const token = req.query.token;
  if (!!token && token === functions.config().fb.token) {
    return true;
  } else {
    console.error(
      'ScrapingFunction.httpAuth.error request:' + JSON.stringify(forJson(req))
    );
    return false;
  }
};

/**
 * Requestをjson出力可能なオブジェクトで返す.
 * @param req
 */
export const forJson = function (req: functions.https.Request) {
  return {
    headers: req.headers,
    query: req.query,
    body: req.body,
  };
};

/**
 * RequestをLog用文字列で返す.
 * @param req
 */
export const forLog = function (req: functions.https.Request): string {
  return JSON.stringify(forJson(req));
};
