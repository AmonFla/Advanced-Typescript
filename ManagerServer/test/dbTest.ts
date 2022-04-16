import { UserCredentialsDBA } from "../src/Authorization/UserCredentialesDBA";
import { WorkingPosition } from "../src/Sahred/Model";
import { UserDBA } from "../src/User/UsersDBA";

class DbTest{
    public dbAccess: UserCredentialsDBA = new UserCredentialsDBA();
    public dbUser: UserDBA = new UserDBA();
}

new DbTest().dbAccess.putUserCredential({
    username: "flavio",
    password: "123456",
    accessRight: [0,1,2,3]
})

/*new DbTest().dbUser.putUser({
    age: 12,
    email: 'algo@algo.com',
    id: '', 
    name: 'alguien',
    workerPosition: WorkingPosition.JUNIOR
})*/