-- CreateTable
CREATE TABLE "Direccion" (
    "id_dir" SERIAL NOT NULL,
    "calle" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "colonia" TEXT NOT NULL,
    "codigoPostal" INTEGER NOT NULL,

    CONSTRAINT "Direccion_pkey" PRIMARY KEY ("id_dir")
);

-- CreateTable
CREATE TABLE "InformacionPersonal" (
    "id_info_per" SERIAL NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "direccionId" INTEGER NOT NULL,

    CONSTRAINT "InformacionPersonal_pkey" PRIMARY KEY ("id_info_per")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id_cliente" SERIAL NOT NULL,
    "infoPersonalId" INTEGER NOT NULL,
    "fechaRegistro" TIMESTAMP(3) NOT NULL,
    "observaciones" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id_cliente")
);

-- CreateTable
CREATE TABLE "Empleado" (
    "id_empleado" SERIAL NOT NULL,
    "infoPersonalId" INTEGER NOT NULL,
    "fechaRegistro" TIMESTAMP(3) NOT NULL,
    "observaciones" TEXT NOT NULL,

    CONSTRAINT "Empleado_pkey" PRIMARY KEY ("id_empleado")
);

-- CreateTable
CREATE TABLE "Producto" (
    "id_producto" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id_producto")
);

-- CreateTable
CREATE TABLE "Proveedor" (
    "id_provedor" SERIAL NOT NULL,
    "infoPersonalId" INTEGER NOT NULL,
    "fechaRegistro" TIMESTAMP(3) NOT NULL,
    "observaciones" TEXT NOT NULL,

    CONSTRAINT "Proveedor_pkey" PRIMARY KEY ("id_provedor")
);

-- CreateTable
CREATE TABLE "Inventario" (
    "id_inventario" SERIAL NOT NULL,
    "productoId" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventario_pkey" PRIMARY KEY ("id_inventario")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id_pedido" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id_pedido")
);

-- CreateTable
CREATE TABLE "Devolucion" (
    "id_devolucion" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "observaciones" TEXT NOT NULL,
    "pedidoId" INTEGER NOT NULL,

    CONSTRAINT "Devolucion_pkey" PRIMARY KEY ("id_devolucion")
);

-- CreateTable
CREATE TABLE "_ProductoToProveedor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PedidoToProducto" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "InformacionPersonal_direccionId_key" ON "InformacionPersonal"("direccionId");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_infoPersonalId_key" ON "Cliente"("infoPersonalId");

-- CreateIndex
CREATE UNIQUE INDEX "Empleado_infoPersonalId_key" ON "Empleado"("infoPersonalId");

-- CreateIndex
CREATE UNIQUE INDEX "Proveedor_infoPersonalId_key" ON "Proveedor"("infoPersonalId");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductoToProveedor_AB_unique" ON "_ProductoToProveedor"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductoToProveedor_B_index" ON "_ProductoToProveedor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PedidoToProducto_AB_unique" ON "_PedidoToProducto"("A", "B");

-- CreateIndex
CREATE INDEX "_PedidoToProducto_B_index" ON "_PedidoToProducto"("B");

-- AddForeignKey
ALTER TABLE "InformacionPersonal" ADD CONSTRAINT "InformacionPersonal_direccionId_fkey" FOREIGN KEY ("direccionId") REFERENCES "Direccion"("id_dir") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_infoPersonalId_fkey" FOREIGN KEY ("infoPersonalId") REFERENCES "InformacionPersonal"("id_info_per") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Empleado" ADD CONSTRAINT "Empleado_infoPersonalId_fkey" FOREIGN KEY ("infoPersonalId") REFERENCES "InformacionPersonal"("id_info_per") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proveedor" ADD CONSTRAINT "Proveedor_infoPersonalId_fkey" FOREIGN KEY ("infoPersonalId") REFERENCES "InformacionPersonal"("id_info_per") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventario" ADD CONSTRAINT "Inventario_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id_producto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id_cliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Devolucion" ADD CONSTRAINT "Devolucion_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id_pedido") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductoToProveedor" ADD CONSTRAINT "_ProductoToProveedor_A_fkey" FOREIGN KEY ("A") REFERENCES "Producto"("id_producto") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductoToProveedor" ADD CONSTRAINT "_ProductoToProveedor_B_fkey" FOREIGN KEY ("B") REFERENCES "Proveedor"("id_provedor") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PedidoToProducto" ADD CONSTRAINT "_PedidoToProducto_A_fkey" FOREIGN KEY ("A") REFERENCES "Pedido"("id_pedido") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PedidoToProducto" ADD CONSTRAINT "_PedidoToProducto_B_fkey" FOREIGN KEY ("B") REFERENCES "Producto"("id_producto") ON DELETE CASCADE ON UPDATE CASCADE;
