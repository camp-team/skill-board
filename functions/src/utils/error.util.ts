/**
 * Errorをjson出力可能なオブジェクトで返す.
 * @param e
 */
export const forJson = function (e: any): any {
  if (e instanceof Error) {
    return {
      name: e.name,
      message: e.message,
      stack: e.stack,
    };
  } else {
    return e; // Errorでない場合はそのまま返す
  }
};

/**
 * ErrorをLog用文字列で返す.
 * @param e
 */
export const forLog = function (e: any): string {
  if (e instanceof Error) {
    return e.stack ? e.stack : e.name + '/' + e.message;
  } else {
    return JSON.stringify(e); // Errorでない場合はそのままJSON化
  }
};
