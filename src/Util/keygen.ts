import * as jose from "jose"

async function gen_key()
{
  const { publicKey, privateKey } = await jose.generateKeyPair('ES512', {extractable: true})

  const exportedPrivateKey = await jose.exportPKCS8(privateKey);
  const exportedPublicKey = await jose.exportSPKI(publicKey);
  console.log( exportedPrivateKey)
  console.log(exportedPublicKey)
}