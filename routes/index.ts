/**
 * @fileOverview index file packaging all routers
 * @author Patrick Vanegas
 * @version 1.0.0
 */
 import { postsRouting } from './posts';
 
 interface Router {
   [router: string]: Function,
 }
 
 export function routing(db: string, secret: number) : Router {
   const routing: Router = {
     postsRouting: postsRouting(db, secret),
   }
   return routing;
 };
