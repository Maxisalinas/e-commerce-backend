import express, { Router } from "express";
import { errorsHandler } from "./middlewares/errorsHandler.js";
import cookieParser from "cookie-parser";

interface Options {
    port: number,
    routes: Router,
}

export class Server {

    public readonly app = express();
    private readonly port: number;
    private serverListener?: any;
    private readonly routes: Router;

    constructor( options: Options ) {
        const { port, routes } = options;
        this.port = port;
        this.routes = routes;
    }

    public start() {
        this.app.use( express.json() );
        this.app.use( express.urlencoded({ extended: true }) ); 
        this.app.use( cookieParser() ); 
        this.app.use( this.routes );
        this.app.use( errorsHandler );
        
        this.serverListener = this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en puerto: ${ this.port }`);
        }) 

    }

    public close() {
      this.serverListener?.close();
    }

}