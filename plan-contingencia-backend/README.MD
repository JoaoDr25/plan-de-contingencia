# Modo demostracion (despliegues sin servicio de correo)

Render gratuito bloquea los puertos SMTP. Para demostraciones, el backend puede
usar un codigo fijo solo para cuentas ficticias autorizadas, sin enviar correo:

```env
AUTH_DEMO_MODE=true
AUTH_DEMO_CODE=123456
AUTH_DEMO_ALLOWED_EMAILS=cuenta1@dominio.com,cuenta2@dominio.com
```

- Solo aplica a los correos institucionales de `AUTH_DEMO_ALLOWED_EMAILS`;
  las demas cuentas siguen usando el envio por SMTP.
- El codigo conserva expiracion, limite de intentos y uso unico.
- Si falta el codigo de 6 digitos o la lista, se usa el envio normal.
- Configura estas variables en Render (Environment) y vuelve a desplegar.
- No uses cuentas reales en la lista ni compartas el codigo publicamente.

En produccion real, conectada al sistema externo, establece
`AUTH_DEMO_MODE=false`. El envio original queda comentado en
`src/services/authService.js` como referencia.

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
