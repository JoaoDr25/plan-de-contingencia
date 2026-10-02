# Pruebas locales de autenticacion sin envio de correo

Para probar usuarios con correos ficticios, configura estas variables en el
archivo `.env` del backend y reinicia el servidor:

```env
NODE_ENV=development
AUTH_EMAIL_TEST_MODE=true
```

Con ambas condiciones activas, al solicitar un codigo de verificacion se muestra
en la consola del backend y no se envia por correo. Ingresa ese codigo en la
pantalla de verificacion; la validacion de credenciales, el estado activo del
usuario, la expiracion del codigo y la autenticacion por roles siguen vigentes.
La interfaz conserva el mensaje habitual de codigo enviado.

Para restaurar el envio, establece `AUTH_EMAIL_TEST_MODE=false` y reinicia el
servidor. Fuera de `NODE_ENV=development` el envio permanece activo, incluso si
la bandera esta habilitada. No habilites este modo en entornos compartidos ni
de produccion: el codigo registrado en consola permite autenticar al usuario.