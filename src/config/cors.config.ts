export function corsConfig() {
    const port = Number(process.env.APP_PORT)
    return {
      origin: [
        'https://my-site.com', 
        'https://another-site.com',
        `http://localhost:${port}`,
        ],
      methods: 'GET,POST,PUT,PATCH,DELETE', // Métodos HTTP permitidos
      allowedHeaders: 'Content-Type, Authorization', // Headers permitidos
      credentials: true, // Permitir envío de cookies
    };
}