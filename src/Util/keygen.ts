import * as jose from "jose"
import { TPublicPrivateKey } from "../Constants/initialSettings";

export async function generateAsymmetricKey(algorithm: string) : Promise<TPublicPrivateKey>
{
  const { publicKey, privateKey } = await jose.generateKeyPair(algorithm, {extractable: true})

  const exportedPrivateKey = await jose.exportPKCS8(privateKey);
  const exportedPublicKey = await jose.exportSPKI(publicKey);
  
  return {
    privateKey: exportedPrivateKey,
    publicKey: exportedPublicKey
  }
}