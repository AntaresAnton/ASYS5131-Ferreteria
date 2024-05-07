import { Connection, getConnection } from "./../database/database"

const getPedido = async (req, res) => {

    try {
        // console.log(req.params)
        // const { id } = req.params;
        const connection = await getConnection();
        const [result] = await connection.query(`
        SELECT 
    p.id AS id_pedido,
    u.nombre AS nombre_usuario,
    p.fecha_pedido,
    p.estado,
    dp.id_producto,
    dp.cantidad,
    pr.nombre AS nombre_producto,
    pr.precio AS precio_unitario
FROM 
    Pedidos p
INNER JOIN 
    DetallesPedido dp ON p.id = dp.id_pedido
INNER JOIN 
    Productos pr ON dp.id_producto = pr.id
INNER JOIN 
    Usuarios u ON p.id_usuario = u.id;
`);
        // console.log(result);
        // Verificar si hay resultados
        if (result.length === 0) {
            return res.status(404).json({ message: "Pedido no disponible" });
        }
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const pedidos = {
    // GET 
    getPedido,
};