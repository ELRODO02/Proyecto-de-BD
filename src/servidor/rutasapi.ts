import { Router } from "express";
import { ClientController, EmpleadoController,
        ProductoController, ProveedorController, InventarioController } from "./controladores";

export class ClientRoutes {
    public static routes(): Router {
        
        const router = Router();
        const clientController = new ClientController();

        router.get('/:id', clientController.getClientById);
        router.post('/', clientController.createClient);
        router.put('/:id', clientController.updateClientById);
        router.delete('/:id', clientController.deleteClientById);

        return router;
    }  
}

export class EmpleadoRoutes{
    public static routes(): Router {
        
        const router = Router();
        const empleadoController = new EmpleadoController();

        router.get('/:id', empleadoController.getEmpleadoById);
        router.post('/', empleadoController.createEmpleado);
        router.put('/:id', empleadoController.updateEmpleadoById);
        router.delete('/:id', empleadoController.deleteEmpleadoById);

        return router;
    }
}

export class ProductoRoutes{
    public static routes(): Router {
        
        const router = Router();
        const productoController = new ProductoController();

        router.get('/:id', productoController.getProductoById);
        router.post('/', productoController.createProducto);
        router.put('/:id', productoController.updateProductoById);
        router.delete('/:id', productoController.deleteProductoById);

        return router;
    }
}

export class ProveedorRoutes{
    public static routes(): Router {
        
        const router = Router();
        const proveedorController = new ProveedorController();

        router.get('/:id', proveedorController.getProveedorById);
        router.post('/', proveedorController.createProveedor);
        router.put('/:id', proveedorController.updateProveedorById);
        router.delete('/:id', proveedorController.deleteProveedorById);

        return router;
    }
}

export class InventarioRoutes{
    public static routes(): Router {
        
        const router = Router();
        const inventarioController = new InventarioController();

        router.get('/:id', inventarioController.getInventarioById);
        router.post('/', inventarioController.createInventario);
        router.put('/:id', inventarioController.updateInventarioById);
        router.delete('/:id', inventarioController.deleteInventarioById);

        return router;
    }
}