import app from '../../app.js';
import { authenticate, syncUp } from '../database/database.js';
import { envs } from '../enviroment/enviroment.js';

export async function main() {
    try {

        await authenticate();
        await syncUp();

    } catch (error) {

        console.log(error);

    }
}

main();

app.listen(envs.PORT, () => {
    console.log(`Server is up on port ${envs.PORT} 🥳.`);
});