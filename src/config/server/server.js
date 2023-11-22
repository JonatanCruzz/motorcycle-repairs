const app = require('../../app');
const { authenticate, syncUp } = require('../database/database');
const { envs } = require('../enviroment/enviroment');

async function main() {
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