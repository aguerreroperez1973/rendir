const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
   
    it("Obteniendo un 200, un arreglo < a 0", async () => {
        const response = await request(server)
        .get("/cafes")
        .send();
        const status = response.statusCode;
        const body = response.body
        console.log('mensaje 200')
            expect(status).toBe(200)
        console.log('verificar arreglo')
            expect(body).toBeInstanceOf(Array);
        console.log('verificar arreglo mayor q cero')
            expect(body.length).toBeGreaterThan(0)
        });

    it("Eliminando un producto", async () => {
        const jwt = "token";
        const productoAEliminar = 5
        const producto = await request(server)
            .delete(`/cafes/${productoAEliminar}`)
            .set("Authorization", jwt)
            .send();
        console.log('Verificar codigo 404')
            expect(producto.statusCode).toBe(404)
        });

    it("Ingresar un nuevo producto", async () => {
        const id = Math.floor(Math.random() * 999);
        const producto = { id, nombre: "Nuevo tipo café" };
        const { body: productos } = await request(server)
            .post("/cafes")
            .send(producto);
        console.log('Verificar ingresar nuevo producto')
            expect(productos).toContainEqual(producto);
        });  
            
    it("Verificar un producto a modificar", async () => {
        const id = 3;
        const nombreModificado = "actualizar el tipo de café" 
        const producto = { id, nombre: nombreModificado  };
        const idparam = 3;
        const productos = await request(server)
            .put(`/cafes/${idparam}`)
            .send(producto);
        console.log('Verificar id ingresado con id payload codigo 400')
           expect(productos.statusCode).toBe(400)
        });
    
});