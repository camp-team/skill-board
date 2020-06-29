import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

interface skill {
  skillId: string;
  skillCaption: string;
}

const runtimeOpts: functions.RuntimeOptions = {
  timeoutSeconds: 300,
  memory: '1GB',
};

export const scrapingFirestore = functions
  .region('asia-northeast1')
  .runWith(runtimeOpts)
  .https.onRequest(async (req, res) => {
    const result = await new ScrapingFirestore().docSet();
    return res
      .status(500)
      .json({ status: 'success', writeTime: result.writeTime });
  });

export class ScrapingFirestore {
  public docSet(): Promise<admin.firestore.WriteResult> {
    admin.initializeApp();

    const fs: admin.firestore.Firestore = admin.firestore();

    const s: skill = {
      skillId: 'admintest',
      skillCaption: 'テスト',
    };

    return fs.doc('skills/admintest').set(s);
  }
}
