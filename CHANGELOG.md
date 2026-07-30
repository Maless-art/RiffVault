# RiffVault v0.3.0

## Reproducción

- Al reabrir la aplicación, la canción guardada se vuelve a cargar correctamente en el reproductor.
- Se conserva el segundo aproximado de reproducción y se prepara la canción sin iniciar automáticamente.
- Se añadió pantalla completa mediante botón y doble toque/clic sobre el video.
- Se mantiene el recorrido continuo entre carpetas de la versión 0.2.0.

## Biblioteca

- Ahora es posible editar el enlace, título, artista y carpeta de una canción existente.
- La canción activa muestra un ecualizador discreto en la lista.

## Estadísticas

- Se cuenta una reproducción cuando se escucha al menos el 90 % de una canción de más de 15 segundos.
- Se añadió un Top 5 rotativo con posición, título y cantidad de reproducciones.
- Las estadísticas se guardan en `riffvault_stats_v1`, separadas de la biblioteca.

## Acerca de RiffVault

- Versión visible: 0.3.0.
- Fecha de creación: 24 de julio de 2026.
- Historial minimalista de versiones.
- Crédito: Idea y desarrollo, Franklin Black; con apoyo de ChatGPT.

## Compatibilidad y datos

- La clave principal continúa siendo `tma_db`.
- No se renombra, reinicia ni migra automáticamente la biblioteca existente.
- El progreso se guarda por separado en `riffvault_playback_v1`.
- Las estadísticas se guardan por separado en `riffvault_stats_v1`.

### Ajuste móvil (30 de julio de 2026)
- Los controles de cada canción permanecen visibles en pantallas estrechas.
- Los títulos largos se desplazan lateralmente sin aumentar la altura de la fila.
- Se amplió el área táctil de Favorito, Editar, Mover y Eliminar.
- El control de arrastre ya no activa la selección azul de texto en iPhone.
- El Top 5 permanece visible y explica cuando aún no existen reproducciones completas registradas.
- Se simplificó la ruta de navegación dentro de las carpetas.
