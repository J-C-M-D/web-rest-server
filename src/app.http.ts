/*  
    En general este codigo levanta un servidor local en nuestros host, compotadora
    código sin framework, solo node, con el cual llegamos a los archivos que requieren
    nuestras peticiones, toda esta configuración es manual y es la base de como construir un webserver con node
*/
import fs from 'fs';
import http from 'http';

const server = http.createServer( (request, response) => {

    console.log(request.url);

    //cualquier solicitud con status 200 recibirá este head
    // response.writeHead(200, { 'content-type': 'text/html' });

    //Obtendrá como respuesta este código generado del lado del servidor
    // response.write(`<h1>URL${request.url}</h1>`);

    // finaliza la conexion despues de la respuesta
    // response.end();



    // const data = { name: 'John Doe', age: 30, city: 'New York' };

    // response.writeHead( 200, { 'content-type': 'application/json' } );

    //forma corta de escribir write() y end() en una sola linea
    // response.end( JSON.stringify(data) );

    

    if(request.url === '/'){

        const htmlFile = fs.readFileSync('./public/index.html');
        response.writeHead(200, { 'content-type': 'text/html' });
        response.end( htmlFile );
        return;
    }

    if( request.url?.endsWith('.js') ){
        
        response.writeHead( 200, { 'content-type': 'application/javascript' });

    }else if( request.url?.endsWith('.css') ) {
        response.writeHead( 200, { 'content-type': 'text/css' } );
    }

    const responseContent = fs.readFileSync( `./public${ request.url }`, 'utf-8' );
    response.end(responseContent);
});



server.listen( 8080, () => {

    console.log('Server running on port 8080');

});