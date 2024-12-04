import { Server } from './servidor/servidor';
import { envs} from './configuracion/envs';
import { AppRoutes } from './servidor/rutashttp';


(async () => {
    main();
}
)();

function main() {
    console.log('Hello World');
    const server = new Server({
        PORT: envs.PORT,
        routes: AppRoutes.routes(),
        PUBLIC_PATH: envs.PUBLIC_PATH
    });
    server.start();
}


