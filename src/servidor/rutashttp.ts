import { Router } from "express";
import { ClientRoutes, EmpleadoRoutes,
            ProductoRoutes, ProveedorRoutes,
            InventarioRoutes} from "./rutasapi";

export class AppRoutes{
    static  routes(): Router{
    
        const router = Router();

        router.use('/cliente', ClientRoutes.routes());
        router.use('/empleado', EmpleadoRoutes.routes());
        router.use('/producto', ProductoRoutes.routes());
        router.use('/proveedor', ProveedorRoutes.routes());
        router.use('/inventario', InventarioRoutes.routes());

        return router;
    }
}