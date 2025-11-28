import { envs } from "./config/envs.js";
import { Server } from "./presentation/server.js";
import { AppRoutes } from "./presentation/routes.js";
import { initRepositories } from "./config/init/repositories.js";
import { initUseCases } from "./config/init/use-cases.js";
import { initControllers } from "./config/init/controllers.js";
import type { Repositories } from "./config/interfaces/repositories.js";
import type { UseCases } from "./config/interfaces/use-cases.js";
import type { Controllers } from "./config/interfaces/controllers.js";

const repositories: Repositories = initRepositories();
const useCases: UseCases = initUseCases(repositories);
const controllers: Controllers = initControllers(useCases);
const routes = AppRoutes.routes(controllers);
const server = new Server({ port: envs.PORT, routes });

async function main() {
    server.start();
}   

main().catch((error) => {
    console.error('Error al iniciar la app:', error);
    process.exit(1);
});