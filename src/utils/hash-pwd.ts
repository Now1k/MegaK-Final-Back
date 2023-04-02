import * as crypto from "crypto";

export const hashPwd = (p: string): string => {
  const hmac = crypto.createHmac(
    "512",
    "ncbnabdfhjqkjd#$%TR@#%Grf42^%&rgbewR#%^&Gasfdf@!##TGFBARTJqT$@#GRFggfhwfGJwrhKjefwgsjasgWT%ERGEWR$GRETR#UI(UHFGDFV@#$%^YUJHGFDFSDAWERTE%Y^UY&JUHFNGFEWR",
  );
  hmac.update(p);
  return hmac.digest("hex");
};