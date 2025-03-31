import * as jose from "jose"
import { TPublicPrivateKey } from "../Constants/initialSettings";

async function generateAsymmetricKey() : Promise<TPublicPrivateKey>
{
  const { publicKey, privateKey } = await jose.generateKeyPair('ES512', {extractable: true})

  const exportedPrivateKey = await jose.exportPKCS8(privateKey);
  const exportedPublicKey = await jose.exportSPKI(publicKey);
  
  return {
    privateKey: exportedPrivateKey,
    publicKey: exportedPublicKey
  }
}