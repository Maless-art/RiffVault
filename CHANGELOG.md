# RiffVault v0.2

## Reproducción

- Corregido el recorrido al terminar una carpeta.
- El orden continuo ahora respeta la jerarquía visible de la biblioteca:
  1. canciones directas de la carpeta;
  2. subcarpetas en orden;
  3. siguiente carpeta principal;
  4. al terminar la última carpeta, vuelve a la primera carpeta reproducible.
- Las carpetas vacías se omiten automáticamente sin saltar sus subcarpetas.
- El modo **Repetir carpeta actual** conserva su comportamiento.

## Datos

- Se mantiene sin cambios la clave de almacenamiento `tma_db`.
- No se cambió la estructura de carpetas, canciones, favoritos ni configuración.
- No se agregó ninguna limpieza, reinicio ni migración automática de `localStorage`.

## PWA

- Caché actualizado a `riffvault-v0.2.0` para distribuir correctamente la nueva lógica.
