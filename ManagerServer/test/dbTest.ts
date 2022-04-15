import { UserCredentialsDBA } from "../src/Authorization/UserCredentialesDBA";

class DbTest{
    public dbAccess: UserCredentialsDBA = new UserCredentialsDBA();
}

new DbTest().dbAccess.putUserCredential({
    username: "flavio",
    password: "123456",
    accessRight: [1,2,3]
})