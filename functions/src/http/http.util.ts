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
    console.log(
      'ScrapingFunction.httpAuth.error request:' +
        JSON.stringify(reqLogInfo(req))
    );
    return false;
  }
};

/**
 * ログ出力用のrequest情報を返す.
 * @param req
 */
export const reqLogInfo = function (req: functions.https.Request) {
  return {
    headers: req.headers,
    query: req.query,
    body: req.body,
  };
};
