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

# Envio de codigos con Resend

El endpoint `POST /api/auth/validar-credenciales` solo valida el documento,
el correo registrado y el estado activo del usuario. No envia correos.
Al pulsar ENVIAR CODIGO, `POST /api/auth/login` genera el codigo y lo envia
mediante Resend, salvo que el modo de pruebas locales este activo.

Configura las variables del backend:

```env
RESEND_API_KEY=re_CLAVE_DEL_PROYECTO
RESEND_FROM=Sistema de Contingencia <acceso@tu-dominio-verificado.com>
AUTH_EMAIL_TEST_MODE=false
```

La variable de la clave se llama `RESEND_API_KEY`, no `RESEND_API`.
Usa un remitente permitido por Resend y un dominio verificado para enviar a
los usuarios del sistema. El remitente de pruebas de Resend tiene restricciones
de destinatarios. Las variables SMTP no se usan en esta integracion.

Reinicia el backend tras cambiar las variables. La clave y el remitente se
validan al enviar, de modo que su ausencia no bloquea la validacion de
credenciales ni las pruebas locales sin correo. Los errores del proveedor
se registran en el backend y la API responde con un error, no con exito.

Para ejecutar las pruebas de autenticacion y envio con respuestas simuladas,
sin conectar a la base de datos ni enviar correos reales:

```powershell
node --test .\tests\authResend.test.js
```