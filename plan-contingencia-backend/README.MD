# Modo demostracion (despliegues sin servicio de correo)

Render gratuito bloquea los puertos SMTP. Para demostraciones, el backend puede
usar un codigo fijo solo para cuentas ficticias autorizadas, sin enviar correo:

```env
AUTH_DEMO_MODE=true
AUTH_DEMO_CODE=000000
AUTH_DEMO_ALLOWED_EMAILS=administrador@soy.sena.edu.co, consultor@soy.sena.edu.co, pedagogia@soy.sena.edu.co, sst@soy.sena.edu.co, coordinacion@soy.sena.edu.co
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

# PDF del plan aprobado para Subdireccion

La notificacion del plan aprobado adjunta el PDF y lo envia por SMTP al correo
institucional del usuario activo de Subdireccion y a su correo personal, si esta
registrado. Si ambas direcciones coinciden, se incluye un solo destinatario.
Si no tiene correo personal, se mantiene el envio al institucional.

# Renumeracion manual de modulos

`src/utils/renumerarNumero.js` es una herramienta de mantenimiento manual.
No se ejecuta al iniciar el servidor y no tiene endpoint. Renumera los registros
existentes desde 1 en orden de numero anterior, conservando `_id`, relaciones,
datos y fechas de actualizacion. Ajusta el contador de cada modulo a su cantidad
de registros; si esta vacio, lo deja en cero para que el siguiente registro sea 1.
No cambia el funcionamiento habitual del generador ni reutiliza huecos al crear.

Modulos admitidos: `Actividad`, `Aprendiz`, `ContactosEmergencia`,
`ElementosProteccionPersonal`, `Peligro`, `ProgramaFormacion`, `Protocolo`,
`Riesgo`, `Usuario` y `PlanContingencia`. `todos` incluye tambien los planes.
Los codigos de verificacion no tienen numeracion de modulo y no se modifican.

Desde la carpeta del backend, usando `MONGO_URI` del entorno:

```powershell
npm run numeros:renumerar -- --ayuda
npm run numeros:renumerar -- --modulo=ContactosEmergencia
npm run numeros:renumerar -- --modulo=PlanContingencia
npm run numeros:renumerar -- --modulo=todos
```

Estas ordenes no modifican datos. Para aplicar en el futuro, primero respalda
la base y detiene TODAS sus escrituras, incluidas otras instancias o Render.
Confirma el nombre de la base mostrado en la vista previa:

```powershell
npm run numeros:renumerar -- --modulo=ProgramaFormacion --aplicar --base=plan-contingencia --sin-escrituras
```

Usa `--modulo=todos` para aplicar a todos los modulos admitidos en una sola
transaccion. `--sin-escrituras` es tu confirmacion; no detiene servidores.
Requiere MongoDB con transacciones (replica set, como Atlas). Si falla antes
del commit, se revierte toda la operacion; no hay fallback sin transacciones.
Numeros ausentes, invalidos o duplicados bloquean el proceso.
Se verifican los identificadores, los numeros y los contadores antes del commit.

Despues, vuelve a consultar la vista previa y reinicia el backend. No borres
indices unicos ni ejecutes esta herramienta automaticamente en produccion.
Los numeros visibles cambian: revisa documentos exportados o referencias
externas que dependan de ellos; las relaciones internas usan `_id` y se conservan.
