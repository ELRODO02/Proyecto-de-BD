import { Prisma } from '@prisma/client';
import {prisma} from '../configuracion/prisma';
import { Request, Response } from 'express';

export class ClientController{
    public getClientById(req: Request, res: Response) {
        try{
            const {id} = req.params;
            prisma.cliente.findUnique({
                where: {
                    id_cliente: parseInt(id)
                }
            }
        ).then((client) => {
                if(client){
                    res.json(client);
                }else{
                    res.status(404).json({ message: 'Client not found' });
                }
            }).catch((error) => {
                res.status(500).json({ message: 'Internal Server Error' });
            });
        }catch(error){
            res.status(500).json({ message: 'Internal Server Error' });
        }
        
    }   

    public createClient(req: Request, res: Response) {
        try{

        const {client} = req.body;
        const {nombres, apellidos, telefono, email, direccion, fecha_registro} = client;
        const {calle, numero, colonia, cp} = direccion;
        
        const clientInput: Prisma.ClienteCreateInput = {
            informacionPersonal: {
                create: {
                    nombres,
                    apellidos,
                    telefono,
                    email,
                direccion: {
                    create: {
                        calle,
                        numero,
                        colonia,
                        codigoPostal: cp
                    }
                }
                }
            },
            fechaRegistro: new Date(fecha_registro),
            observaciones: ""
        } 
        
        prisma.cliente.create({
            data: clientInput
        }).then((client) => {
            res.json(client);
        }).catch((error) => {
            res.status(500).json({ message: 'Internal Server Error' });
        });
        //resporder estatus si es correcto 



    }catch(error){
        res.status(500).json({ message: 'Internal Server Error' });
        
    }
    }

    public updateClientById(req: Request, res: Response) {
        try{
            const {id} = req.params;
            const {client} = req.body;
            const {nombres, apellidos, telefono, email, direccion, fecha_registro} = client;
            const {calle, numero, colonia, cp} = direccion;
            
            const clientInput: Prisma.ClienteUpdateInput = {
                informacionPersonal: {
                    update: {
                        nombres,
                        apellidos,
                        telefono,
                        email,
                    direccion: {
                        update: {
                            calle,
                            numero,
                            colonia,
                            codigoPostal: cp
                        }
                    }
                    }
                },
                fechaRegistro: new Date(fecha_registro),
                observaciones: ""
            } 
            
            prisma.cliente.update({
                where: {
                    id_cliente: parseInt(id)
                },
                data: clientInput
            }).then((client) => {
                res.json(client);
            }).catch((error) => {
                res.status(500).json({ message: 'Internal Server Error' });
            });
        }catch(error){
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public deleteClientById(req: Request, res: Response) {
        try{
            const {id} = req.params;
            prisma.cliente.delete({
                where: {
                    id_cliente: parseInt(id)
                }
            }).then(() => {
                res.json({ message: 'Client deleted successfully' });
            }).catch((error) => {
                res.status(500).json({ message: 'Internal Server Error' });
            });
        }catch(error){
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

}  

export class EmpleadoController{
    public getEmpleadoById(req: Request, res: Response) {        

        const {id} = req.params;
        prisma.empleado.findUnique({
            where: {
                id_empleado: parseInt(id)
            }
        }).then((empleado) => {
            if(empleado){
                res.json(empleado);
            }else{
                res.status(404).json({ message: 'Empleado not found' });
            }
        }).catch((error) => {
            res.status(500).json({ message: 'Internal Server Error' });
        });

    }   

    public createEmpleado(req: Request, res: Response) {
        const {empleado} = req.body;
        const {nombres, apellidos, telefono, email, direccion, fecha_registro} = empleado;
        const {calle, numero, colonia, cp} = direccion;

        const empleadoInput: Prisma.EmpleadoCreateInput = {
            infoPersonal: {
                create: {
                    nombres,
                    apellidos,
                    telefono,
                    email,
                direccion: {
                    create: {
                        calle,
                        numero,
                        colonia,
                        codigoPostal: cp
                    }
                }
                }
            },
            fechaRegistro: new Date(fecha_registro),
            observaciones: ""
        }

        prisma.empleado.create({
            data: empleadoInput
        }).then((empleado) => {
            res.json(empleado);
        }).catch((error) => {
            res.status(500).json({ message: 'Internal Server Error' });
        });

    }

    public updateEmpleadoById(req: Request, res: Response) {
        const {id} = req.params;
        const {empleado} = req.body;
        const {nombres, apellidos, telefono, email, direccion, fecha_registro} = empleado;
        const {calle, numero, colonia, cp} = direccion;

        const empleadoInput: Prisma.EmpleadoUpdateInput = {
            infoPersonal: {
                update: {
                    nombres,
                    apellidos,
                    telefono,
                    email,
                direccion: {
                    update: {
                        calle,
                        numero,
                        colonia,
                        codigoPostal: cp
                    }
                }
                }
            },
            fechaRegistro: new Date(fecha_registro),
            observaciones: ""
        }

        prisma.empleado.update({
            where: {
                id_empleado: parseInt(id)
            },
            data: empleadoInput
        }).then((empleado) => {
            res.json(empleado);
        }).catch((error) => {
            res.status(500).json({ message: 'Internal Server Error' });
        });

    }

    public deleteEmpleadoById(req: Request, res: Response) {
        const {id} = req.params;
        prisma.empleado.delete({
            where: {
                id_empleado: parseInt(id)
            }
        }).then(() => {
            res.json({ message: 'Empleado deleted successfully' });
        }).catch((error) => {
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }
}

export class ProductoController{
    public getProductoById(req: Request, res: Response) {   
        const {id} = req.params;
        
        prisma.producto.findUnique({
            where: {
                id_producto: parseInt(id)
            }
        }).then((producto) => {
            if(producto){
                res.json(producto);
            }else{
                res.status(404).json({ message: 'Producto not found' });
            }
        }).catch((error) => {
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }   

    public createProducto(req: Request, res: Response) {
        
        const {nombre, descripcion, precio,} = req.body;
        
        const productoInput: Prisma.ProductoCreateInput = {
            nombre,
            descripcion,
            precio,
        }

        prisma.producto.create({
            data: productoInput
        }).then((producto) => {
            res.json(producto);
        }).catch((error) => {
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }

    public updateProductoById(req: Request, res: Response) {
        const {id} = req.params;
        const {producto} = req.body;
        const {nombre, descripcion, precio,} = producto;

        const productoInput: Prisma.ProductoUpdateInput = {
            nombre,
            descripcion,
            precio,
        }

        prisma.producto.update({
            where: {
                id_producto: parseInt(id)
            },
            data: productoInput
        }).then((producto) => {
            res.json(producto);
        }).catch((error) => {
            res.status(500).json({ message: 'Internal Server Error' });
        });
    
    }

    public deleteProductoById(req: Request, res: Response) {
        const {id} = req.params;
        prisma.producto.delete({
            where: {
                id_producto: parseInt(id)
            }
        }).then(() => {
            res.json({ message: 'Producto deleted successfully' });
        }).catch((error) => {
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }
}

export class ProveedorController{
    public getProveedorById(req: Request, res: Response) {        
        const {id} = req.params;
        prisma.proveedor.findUnique({
            where: {
                id_provedor: parseInt(id)
            }
        }).then((proveedor) => {
            if(proveedor){
                res.json(proveedor);
            }else{
                res.status(404).json({ message: 'Proveedor not found' });
            }
        }).catch((error) => {
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }   

    public createProveedor(req: Request, res: Response) {
        const { proveedor } = req.body;

        if (!proveedor) { 
            res.status(400).json({ message: 'Proveedor data is required.' });
        }


        const { nombres, apellidos, telefono, email, direccion, fecha_registro, productos } = proveedor;

    // Validación básica de los datos necesarios
        if (!direccion || !productos || !nombres || !apellidos || !telefono || !email || !fecha_registro) {
            res.status(400).json({ message: 'Missing required fields.' });
        }

        const { calle, numero, colonia, cp } = direccion;

        if (!calle || !numero || !colonia || !cp) {
           res.status(400).json({ message: 'Direccion fields are incomplete.' });
        }

    const proveedorInput: Prisma.ProveedorCreateInput = {
        infoPersonal: {
            create: {
                nombres,
                apellidos,
                telefono,
                email,
                direccion: {
                    create: {
                        calle,
                        numero,
                        colonia,
                        codigoPostal: cp,
                    },
                },
            },
        },
        Producto: {
            create: productos.map((producto: any) => ({
                nombre: producto.nombre,
                precio: producto.precio,
                descripcion: producto.descripcion,
            })),
        },
        fechaRegistro: new Date(fecha_registro),
        observaciones: proveedor.observaciones || "", // Asegura un valor por defecto
    };

    prisma.proveedor
        .create({
            data: proveedorInput,
        })
        .then((proveedor) => {
            res.status(201).json(proveedor); // Devuelve el proveedor creado
        })
        .catch((error) => {
            console.error('Error creating proveedor:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }); 

    }

    public updateProveedorById(req: Request, res: Response) {
        const {id} = req.params;
        const {proveedor} = req.body;
        const {nombres, apellidos, telefono, email, direccion, fecha_registro, productos} = proveedor;
        const {calle, numero, colonia, cp} = direccion;

        const proveedorInput: Prisma.ProveedorUpdateInput = {
            infoPersonal: {
                update: {
                    nombres,
                    apellidos,
                    telefono,
                    email,
                    direccion: {
                        update: {
                            calle,
                            numero,
                            colonia,
                            codigoPostal: cp
                        }
                    }
                }
            },
            Producto: {
                update: productos.map((producto: any) => ({
                    nombre: producto.nombre,
                    precio: producto.precio,
                    descripcion: producto.descripcion,
                })),
            },
            fechaRegistro: new Date(fecha_registro),
            observaciones: proveedor.observaciones || "", // Asegura un valor por defecto
        };

    }

    public deleteProveedorById(req: Request, res: Response) {
        const {id} = req.params;
        prisma.proveedor.delete({
            where: {
                id_provedor: parseInt(id)
            }
        }).then(() => {
            res.json({ message: 'Proveedor deleted successfully' });
        }).catch((error) => {
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }

}

export class InventarioController{

    public getInventarioById(req: Request, res: Response) {   
        const {id} = req.params;
        
        prisma.inventario.findUnique({
            where: {
                id_inventario: parseInt(id)
            }
        }).then((inventario) => {
            if(inventario){
                res.json(inventario);
            }else{
                res.status(404).json({ message: 'Inventario not found' });
            }
        }).catch((error) => {
            res.status(500).json({ message: 'Internal Server Error' });
        });     
    }   

    public createInventario(req: Request, res: Response) {
        const {producto_id, cantidad} = req.body;
        
        const inventarioInput: Prisma.InventarioCreateInput = {
            producto: {
                connect: {
                    id_producto: producto_id
                }
            },
            cantidad,
            fecha: new Date()
        }

        prisma.inventario.create({
            data: inventarioInput
        }).then((inventario) => {
            res.json(inventario);
        }).catch((error) => {
            res.status(500).json({ message: 'Internal Server Error' });
        });

    }

    public updateInventarioById(req: Request, res: Response) {
        const {id} = req.params;
        const {producto_id, cantidad} = req.body;

        const inventarioInput: Prisma.InventarioUpdateInput = {
            producto: {
                connect: {
                    id_producto: producto_id
                }
            },
            cantidad,
            fecha: new Date()
        }

        prisma.inventario.update({
            where: {
                id_inventario: parseInt(id)
            },
            data: inventarioInput
        }).then((inventario) => {
            res.json(inventario);
        }).catch((error) => {
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }

    public deleteInventarioById(req: Request, res: Response) {
        const {id} = req.params;
        prisma.inventario.delete({
            where: {
                id_inventario: parseInt(id)
            }
        }).then(() => {
            res.json({ message: 'Inventario deleted successfully' });
        }).catch((error) => {
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }

}