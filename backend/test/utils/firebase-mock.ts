import sinon from 'sinon';
import { firebaseAuth } from '../../src/firebase';

class FirebaseMock {
  private verifyIdTokenStub: sinon.SinonStub = sinon.stub();

  private getUserByEmailStub: sinon.SinonStub = sinon.stub();

  before(): void {
    this.verifyIdTokenStub = sinon.stub(firebaseAuth, 'verifyIdToken');
    this.getUserByEmailStub = sinon.stub(firebaseAuth, 'getUserByEmail');
  }

  // eslint-disable-next-line class-methods-use-this
  after(): void {
    sinon.restore();
  }

  mock(token: string, email: string, firebaseId: string): void {
    const mockDecodedToken = { email };
    const firebaseUser = {
      uid: firebaseId,
      email,
    };

    this.verifyIdTokenStub.withArgs(token).resolves(mockDecodedToken);
    this.getUserByEmailStub
      .withArgs(mockDecodedToken.email)
      .resolves(firebaseUser);
  }
}

export { FirebaseMock };
