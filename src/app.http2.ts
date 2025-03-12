
import fs from 'fs';
import http2 from 'http2';


// creando un servidor seguro con el objeto http2
// que se basa en el protocolo ssl
// script para generar el certificado:
//openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt
const server = http2.createSecureServer({

    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt'),
    
},(request, response) => {

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


    try{

        const responseContent = fs.readFileSync( `./public${ request.url }`, 'utf-8' );
        response.end(responseContent);

    } catch(error) {
        
        response.writeHead( 404, { 'content-type': 'text/css' } );

        response.end();

    }




});


server.listen( 8080, () => {

    console.log('Server running on port 8080');

});